import { EventItem } from './eventitem.js'
import { EventDate } from './eventdate.js';
import pubsub from '../pubsub.js'
import { CHANELS } from '../chanels.js'
import { EventService } from './eventservice.js';
import { CULTURE } from '../culture.js'
import { CONFIG } from '../config.js'
import { flexcolumn } from '../css/flexcolumn.js'
import { padding } from '../css/padding.js';
const css = new CSSStyleSheet();
css.replaceSync(`
    :host{
        display:grid;
        grid-template-rows:35px auto;
        align-items: center;
    }
`);

class Events extends HTMLElement {
    #shadow;
    constructor() {
        super();
        this.#shadow = this.attachShadow({ mode: 'open' });
        this.#shadow.adoptedStyleSheets = [css,padding];
        this.selectedDay({ date: new Date() });
        pubsub.sub(CHANELS.SELECTEDDAY, this.selectedDay.bind(this));
    }
    createNotEvent() {
        return document.createTextNode(CULTURE[CONFIG.culture].noEvents);
    }
    async selectedDay(date) {
        this.#shadow.textContent = '';
        let eventDay = new EventDate();
        this.#shadow.appendChild(eventDay);
        let dayEvents = await EventService(date.date);
        if (dayEvents) {
            dayEvents.events.forEach(event => {
                let eventItem = new EventItem();
                eventItem.create(event);
                this.#shadow.appendChild(eventItem);
            })
        } else {
            this.#shadow.appendChild(this.createNotEvent());
        }
    }

}
customElements.define('bcn-events', Events)