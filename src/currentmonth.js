import { CHANELS } from './chanels.js';
import { FormatDate } from './formatdate.js';
import { CurrentTextElement } from './currenttextelement.js'
import { DateService } from './dateservice.js'
import pubsub from './pubsub.js'


class CurrentMonth extends CurrentTextElement {
    #unsuscribe;
    constructor() {
        super(CHANELS.CHANGEMONTH, FormatDate.getCurrentMonth);
        this.#unsuscribe = pubsub.sub(CHANELS.CHANGEMANUALMONTH, this.changeManualMonth.bind(this));
    }
    changeManualMonth(dif) {
        this.date = DateService.getNextOrPreviosMonth(this.date, dif)
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.#unsuscribe();
    }
}

customElements.define('bcn-currentmonth', CurrentMonth);
