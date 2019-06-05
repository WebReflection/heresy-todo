import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
export default {
  input: '../esm/index.js',
  plugins: [
    resolve({module: true}),
    babel({presets: ["@babel/preset-env"]}),
    terser()
  ],
  context: 'null',
  moduleContext: 'null',
  output: {
    exports: 'named',
    file: '../js/old.js',
    format: 'iife',
    name: 'TodoMVC'
  }
};
