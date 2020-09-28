import { CurrentText } from './currenttext.js'

const CLASSTODAY = "today";
const DAYNOTINMONTH = "notinmonth";
const SELECTDAY = "selected";
const css = new CSSStyleSheet();
css.replaceSync(`
   
    :host{
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    
    }
    :host(.today){
        background-color:  rgb(0, 120, 215);
        padding:2px;
    }
    :host(:hover){
        border: 1px solid white;
    }
    :host(.notinmonth){
        color:gray;
    }
`);

export class Day extends CurrentText {
    #day;
    #objectDay;
    constructor(){
        super();
        this.shadow.adoptedStyleSheets=[css];
    }
    set objectDay(value) {
        this.#objectDay = value;
        let day = value.date.getDate();
        if (!this.#day) {
            this.init(day)
            this.#day = day;
        } else {
            this.update(day)
        }
        this.setClass(value);
    }
    get objectDay(){
        return this.#objectDay;
    }
    selectedDay(){
        this.classList.add(SELECTDAY);
    }
    removeSelectedDay(){
        this.classList.remove(SELECTDAY);
    }
    setClass(value) {
        this.removeClass();
        if (!value.isCurrentMonth) {
            this.classList.add(DAYNOTINMONTH);
        }
        if (value.isToday) {
            this.classList.add(CLASSTODAY);
        }
    }
    removeClass(){
        this.classList.remove(DAYNOTINMONTH);
        this.classList.remove(CLASSTODAY);
    }
}

customElements.define('bcn-day', Day)