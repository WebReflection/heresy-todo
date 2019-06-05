import {define, ref} from 'heresy';
import {withAccessor} from './utils.js';

import List from './list.js';
define.local('List:ul', List);

export default withAccessor('data', class extends HTMLElement {

  // the view
  render() {
    this.html`
      <input id="toggle-all" class="toggle-all" type="checkbox">
      <label for="toggle-all">Mark all as complete</label>
      <List
        class="todo-list"
        ref=${ref(this, 'list')}
        .items=${this.data.items}
      />
    `;
  }

  // invoked by withAccessor decorator
  ondata() {
    this.render();
  }

});
