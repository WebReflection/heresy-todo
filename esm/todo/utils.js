import storage from './storage.js';

export const data = name => {
  const info = storage(name);
  if (!info.id) {
    info.id = 0;
    info.items = {};
  }
  return info;
};

export const withAccessor = (...args) => {
  const Component = args.pop();
  args.forEach(name => {
    const pvt = new WeakMap;
    Object.defineProperty(
      Component,
      name,
      {
        get() {
          return pvt.get(this);
        },
        set(value) {
          pvt.set(this, value);
          const method = `on${name}`;
          if (method in this)
            this[method]();
        }
      }
    );
  });
  return Component;
};
