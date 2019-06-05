const data = Object.create(null);

export default name => (data[name] || set(name));

function handleEvent() {
  const {name} = this;
  localStorage.setItem(name, JSON.stringify(data[name]));
}

function set(name) {
  addEventListener('beforeunload', {name, handleEvent}, false);
  return (data[name] = JSON.parse(localStorage.getItem(name) || '{}'));
}
