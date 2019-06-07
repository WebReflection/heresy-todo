import {withAccessor} from './utils.js';

export default withAccessor('count', {
  extends: 'footer',
  oncount() { this.render(); },
  render() {
    this.html`
      <span class="todo-count">${this.count}</span>
      <ul class="filters">
        <li>
          <a href="#/" class="selected">All</a>
        </li>
        <li>
          <a href="#/active">Active</a>
        </li>
        <li>
          <a href="#/completed">Completed</a>
        </li>
      </ul>
      <button class="clear-completed">Clear completed</button>
    `;
  }
});
