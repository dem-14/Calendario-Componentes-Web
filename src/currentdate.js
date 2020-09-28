import {CHANELS} from './chanels.js';
import {FormatDate} from './formatdate.js';
import {CurrentTextElement} from './currenttextelement.js'
const css = new CSSStyleSheet();
css.replaceSync(`
    :host{
      color:green;
    }
`);

class CurrentDate extends CurrentTextElement{
    constructor(){
        super(CHANELS.CHANGEDAY,FormatDate.getCurrentDate);
        this.shadow.adoptedStyleSheets=[css];
    }
}

customElements.define('bcn-currentdate',CurrentDate);