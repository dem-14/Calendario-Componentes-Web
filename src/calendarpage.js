import { CHANELS } from './chanels.js'
import { DateService } from './dateservice.js';
import { Day } from './currentday.js';
import pubsub from './pubsub.js'

const css = new CSSStyleSheet();
css.replaceSync(`
    :host{
        display:grid;
        grid-template-columns: repeat(7,40px);
        grid-template-rows: repeat(6, 40px);
        gap: 2px;
    }    
`);
class CalendarPage extends HTMLElement {
    #date = DateService.getCurrentDate();
    #days = [];
    #unsubscribers=[];
    #click;
    #selectDay;
    constructor() {
        super();
        this.create(this.#date);
        this.#unsubscribers = [
            pubsub.sub(CHANELS.CHANGEMONTH, this.changeAtomaticMonth.bind(this)),
            pubsub.sub(CHANELS.CHANGEDAY, this.changeDay.bind(this)),
            pubsub.sub(CHANELS.CHANGEMANUALMONTH, this.changeManualMonth.bind(this))
        ];
        this.#click = this.click.bind(this);
        this.addEventListener('click', this.#click);
    }
    click(ev) {
        ev.stopPropagation();
        let day = ev.path.filter(d => d instanceof Day)[0]; //event delegation
        if (day) {
            this.setSelectedDay(day);
        }
    }
    setSelectedDay(day) {
        pubsub.pub(CHANELS.SELECTEDDAY, day.objectDay)
        if (this.#selectDay) {
            this.#selectDay.removeSelectedDay();
        }
        day.selectedDay();
        this.#selectDay = day;
    }
    changeDay(date){
        if(this.isCurrentMonth()){
            //TODO Cambiar OldToday a false
            //Cambiar newToday a true
            //si #date == #selectedDay o !#selectedDay 
            this.#date = date;
        }
    }
    changeAtomaticMonth(date){
        if(this.isCurrentMonth()){
            this.changeMonth(date)
        }
    }
    changeMonth(date) {
        DateService.getMonthCalendar(date).forEach((objectDay, index) => {
            this.updateDay(this.#days[index], objectDay)
        })
        this.#date = date;
    }
   
    changeManualMonth(dif) {
        this.changeMonth(DateService.getNextOrPreviosMonth(this.#date, dif))
    }
    createDays(date){
        this.#days = DateService.getMonthCalendar(date)
            .map(objectDay => {
                let day = new Day();
                this.updateDay(day, objectDay);
                return day;
            });
    }
    create(date) {
        this.createDays(date);
        let shadow = this.attachShadow({ mode: 'open' });
        shadow.adoptedStyleSheets=[css];
        this.#days.forEach(day => shadow.appendChild(day));
    }
    updateDay(day, objectDay) {
        day.objectDay = objectDay;
        if (objectDay.isToday) {
            this.setSelectedDay(day);
        }
    }
    isCurrentMonth(){
        return this.#days.map(d=>d.objectDay).filter(o=>o.isToday && o.isCurrentMonth)[0]
    }
    disconnectedCallback() {
        this.#unsubscribers.forEach(unsubscriber => {
            unsubscriber();
        });
        this.removeEventListener('click', this.#click);
        this.#days = null;
    }
}
customElements.define('bcn-month', CalendarPage)