import '@ungap/custom-elements-builtin';

import {define} from 'heresy';
import Todo from './todo/index.js';

// define globally the Todo:section
// it will be upgraded/hydrated on the fly
define('Todo', Todo);
