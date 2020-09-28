import { CHANELS } from './chanels.js'
import pubsub from './pubsub.js';
import { } from './mixins.js';
const NEXT = 1;
const PREVIOUS = -1;
const DEFAULTATTRIBUTE = 'previous';

class CalendarButton extends HTMLButtonElement {
    #action
    constructor() {
        super();
        this.addEventListener('click', this.emit.bind(this));
    }
    connectedCallback() {
        this.#action = this.hasAttribute(DEFAULTATTRIBUTE) ? PREVIOUS : NEXT;
    }
    emit(ev) {
        ev.stopPropagation();
        pubsub.pub(CHANELS.CHANGEMANUALMONTH, this.#action);
    }
}

customElements.define('bcn-calendarbutton', CalendarButton, { extends: 'button' });