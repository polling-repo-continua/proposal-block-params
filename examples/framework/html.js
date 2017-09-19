function element(Type, arg1, arg2) {
  let result = new Type();
  let block = function() {};

  if (typeof arg1 == "function") {
    block = arg1;
  } else if (typeof arg2 == "function") {
    block = arg2;
  }

  block.call(result, result);

  if (typeof arg1 == "string") {
    result.children = [arg1];
  }

  if (typeof arg1 == "object") {
    for (prop in arg1) {
      result.setAttribute(prop, arg1[prop]);
    }
  }

  // Appends itself into the parent.
  if (this.node) {
    this.node(result);
  }

  return result;
}

class Element {
  constructor(type) {
    this["@type"] = type;
  }
  root() {
    return this;
  };
  node(child) {
    this.children = this.children || [];
    this.children.push(child);
  };
  setAttribute(name, value) {
    this[name] = value;
  };
  static define(parent, label, Type) {
    parent.prototype[`${label}`] = function(arg1, arg2) {
      element.call(this, Type, arg1, arg2);
    };
  }
};

class Div extends Element {
  constructor() {
    super("div");
  }
}

class Span extends Element {
  constructor() {
    super("span");
  }
}

Element.define(Div, "span", Span);
Element.define(Div, "div", Div);

Element.define(Span, "span", Span);
Element.define(Span, "div", Div);

class Body extends Element {
  constructor() {
    super("body");
  }
}
Element.define(Body, "div", Div);
Element.define(Body, "span", Span);

class Title extends Element {
  constructor() {
    super("title");
  }
}

class Head extends Element {
  constructor() {
    super("head");
  }
}
Element.define(Head, "title", Title);

class Html extends Element {
  constructor() {
    super("html");
  }
}
Element.define(Html, "head", Head);
Element.define(Html, "body", Body);


// Prototype in its parent.
for (obj in Object.getPrototypeOf(Span).prototype) {
  console.log(obj);
}

module.exports.div = element.bind(this, Div);
module.exports.title = element.bind(this, Title);
module.exports.html = element.bind(this, Html);