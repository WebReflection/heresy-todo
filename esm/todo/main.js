import {ref} from 'heresy';
import {withAccessor} from './utils.js';

import List from './list.js';

export default withAccessor('data', {
  extends: 'section',
  includes: {List},
  ondata() { this.render(); },
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
});
