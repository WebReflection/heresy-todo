import {define, ref} from 'heresy';

import Header from './header.js';
import Main from './main.js';
import Footer from './footer.js';

import {data} from './utils.js';

// define local render types
const {local} = define;
local('Header:header', Header);
local('Main:section', Main);
local('Footer:footer', Footer);

export default class extends HTMLElement {

  static style(selector) {
    return `
      ${selector} ul.completed > li:not(.completed),
      ${selector} ul.active > li.completed {
        display: none;
      }
    `;
  }

  // invoked automatically on connected
  //  * if no connectedCallback is defined
  //  * if no onconnected is defined too
  render() {
    const tot = getCount(this.data.items);
    this.html`
      <Header class="header" ref=${this.header} onchange=${this}/>
      <Main class="main" ref=${this.main} onchange=${this} .data=${this.data}/>
      <Footer class="footer" ref=${this.footer} count=${tot} onclick=${this}/>
    `;
  }

  // controller methods
  clearCompleted() {
    const {items} = this.data;
    Object.keys(items).forEach(key => {
      if (items[key].checked)
        delete items[key];
    });
  }
  create(text) {
    const id = ++this.data.id;
    this.data.items[id] = {text, checked: false};
  }
  toggleAll(checked) {
    const {items} = this.data;
    Object.keys(items).forEach(key => {
      items[key].checked = checked;
    });
  }

  // events handling
  // entry point granted to run before any other Custom Element mechanism
  oninit() {
    const db = [this.id || '', this.getAttribute('is')].join(':');
    this.data = data(db);
    this.header = ref();
    this.main = ref();
    this.footer = ref();
  }
  onchange(event) {
    const {currentTarget, target} = event;
    switch (currentTarget) {
      case this.header.current:
        const value = target.value.trim();
        if (value && !getItem(this.data.items, value)) {
          target.value = '';
          this.create(value);
        }
        break;
      case this.main.current:
        if (target.className === 'toggle-all')
          this.toggleAll(target.checked);
        else {
          const {value} = target.closest('li');
          value.checked = target.checked;
        }
        break;
    }
    this.render();
  }
  onclick(event) {
    const {currentTarget, target} = event;
    switch (currentTarget) {
      case this.footer.current:
        if (target.className === 'clear-completed')
          this.clearCompleted();
        else if (!target.classList.contains('selected')) {
          currentTarget.querySelector('a.selected').classList.remove('selected');
          target.classList.add('selected');
          const {list} = this.main.current;
          list.current.classList.remove('active', 'completed');
          const className = target.hash.slice(2);
          if (className)
            list.current.classList.add(className);
        }
        break;
    }
    this.render();
  }
};

function getCount(items) {
  return Object.keys(items).filter(key => !items[key].checked).length;
}

function getItem(items, text) {
  return Object.keys(items).some(key => items[key].text === text);
}
