const {div} = require("./../examples/framework/html.js");

let head = div { __args__.node("hello world") };

console.log(JSON.stringify(head, undefined, ' '));
