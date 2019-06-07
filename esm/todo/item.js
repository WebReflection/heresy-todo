import {withAccessor} from './utils.js';

export default withAccessor('value', {

  extends: 'li',

  onvalue() { this.render(); },
  onclick(event) {
    event.stopPropagation();
    this.dispatchEvent(new Event('delete'));
  },

  render() {
    const {checked, text} = this.value;
    this.classList.toggle('completed', checked);
    this.html`
    <div class="view">
      <input
        class="toggle" type="checkbox"
        checked=${checked}
      >
      <label>${text}</label>
      <button class="destroy" onclick=${this}></button>
    </div>`;
  }
});
