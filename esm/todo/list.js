import {define, html} from 'heresy';
import {withAccessor} from './utils.js';

import Item from './item.js';
define.local('Item:li', Item);

export default withAccessor('items', class extends HTMLUListElement {
  render() {
    const {items} = this;
    this.html`${Object.keys(items).map(
      key => html`<Item ondelete=${this} .value=${items[key]}/>`
    )}`;
  }

  ondelete(event) {
    const {items} = this;
    const {currentTarget} = event;
    const {value} = currentTarget;
    Object.keys(items).forEach(key => {
      if (items[key] === value) {
        delete items[key];
        this.render();
      }
    });
  }
  onitems() { this.render(); }
});
