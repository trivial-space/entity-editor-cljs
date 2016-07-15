var CodeMirror = require('codemirror'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    vis = require('vis/dist/vis-network.min');

require("codemirror/mode/javascript/javascript");
require("codemirror/mode/htmlmixed/htmlmixed");
require("codemirror/keymap/vim");
require("codemirror/addon/edit/closebrackets");
require("codemirror/addon/edit/closetag");
require("codemirror/addon/edit/matchbrackets");
require("codemirror/addon/edit/matchtags");
require("codemirror/addon/edit/trailingspace");
require("codemirror/addon/display/autorefresh");
require("codemirror/addon/hint/show-hint");
