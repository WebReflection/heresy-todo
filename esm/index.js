import {define} from 'heresy';
import Todo from './todo/index.js';

// define globally the Todo:section
// it will be upgraded on the fly
define('Todo:section', Todo);
