import resolve from 'rollup-plugin-node-resolve';
import includePaths from 'rollup-plugin-includepaths';
import { terser } from 'rollup-plugin-terser';
export default {
  input: '../esm/index.js',
  plugins: [
    includePaths({
      include: {
        "@ungap/create-content": "../node_modules/@ungap/degap/create-content.js",
        "@ungap/template-tag-arguments": "../node_modules/@ungap/degap/template-tag-arguments.js",
        "@ungap/weakmap": "../node_modules/@ungap/degap/weakmap.js",
        "@ungap/essential-map": "../node_modules/@ungap/degap/essential-map.js",
        "@ungap/import-node": "../node_modules/@ungap/degap/import-node.js",
        "@ungap/trim": "../node_modules/@ungap/degap/trim.js"
      },
    }),
    resolve({module: true}),
    terser()
  ],
  context: 'null',
  moduleContext: 'null',
  output: {
    exports: 'named',
    file: '../js/new.js',
    format: 'iife',
    name: 'TodoMVC'
  }
};
