import {} from './calendarbody.js'
import {} from './calendarheader.js'
import {} from './events/events.js'
import {flexcolumn} from'./css/flexcolumn.js'
const css = new CSSStyleSheet();
css.replaceSync(`
    :host{
        color:white;
        background-color: black;
        cursor: default;
        user-select: none;
        width:20rem;
    }
`);

class  Calendar extends HTMLElement{
   
    constructor() {
        super();
        let shadow = this.attachShadow({ mode: 'open' });
        shadow.adoptedStyleSheets=[css,flexcolumn];
        shadow.appendChild(this.createCalendarHeader());
        shadow.appendChild(this.createCalendarBody());
        shadow.appendChild(this.createEvent())
        
    }
    createCalendarHeader() {
        return document.createElement('bcn-calendar-header');
    }

    createCalendarBody() {
        return document.createElement('bcn-calendar-body');
    }
    createEvent(){
        return document.createElement('bcn-events');
    }
}
customElements.define('bcn-calendar', Calendar);



