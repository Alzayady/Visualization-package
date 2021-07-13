class Node {
  constructor(value) {
    this.value = value;
  }
  get_left() {
    if(!this.has_left())
          return new NullNode();
    return this.left;
  }
  get_right() {
    if(!this.has_right())
          return new NullNode();
    return this.right;
  }
  set_left(left) {
    this.left = left;
    if (!this.has_right()) {
      this.right = new NullNode();
    }
  }
  set_right(right) {
    this.right = right;
    if (!this.has_left()) {
      this.left = new NullNode();
    }
  }
  set_value(value) {
    this.value = value;
  }
  set_left_value(value) {
    this.left = new Node(value);
    if (!this.has_right()) {
      this.right = new NullNode();
    }
  }
  set_right_value(value) {
    this.right = new Node(value);
    if (!this.has_left()) {
      this.left = new NullNode();
    }
  }

  get_value() {
    return this.value;
  }
  hasTwoChild() {
    return this.has_left() && this.has_right();
  }
  is_leave() {
    return !this.has_left() && !this.has_right();
  }
  has_left() {
    return this.left && !this.left.IsPsudo();
  }
  has_right() {
    return this.right && !this.right.IsPsudo();
  }

  IsPsudo() {
    return false;
  }

  has_value(value){
    return this.value == value;
  }
  makePsudo() {
    this.IsPsudo = true;
  }
  getWrapperNode() {
    var children = [];
    var node_class = this.COLOR;
    if (!this.is_leave()) {
      children[0] = this.get_left().getWrapperNode();
      children[1] = this.get_right().getWrapperNode();
    }
    return {
      text: {
        name: this.value,
      },
      children: children,
      HTMLclass: node_class,
      connectors: {
        style: {
          stroke: "#8080FF",
          "arrow-end": "block-wide-long",
        },
      },
    };
  }

  getWrapperRoot() {
    let wrappedRoot = {
      chart: {
        container: "#OrganiseChart-simple",
      },
      nodeStructure: this.getWrapperNode(),
    };
    return wrappedRoot;
  }

  addCursor() {
    this.COLOR = "red";
  }
  addCursorSelected() {
    this.COLOR = "yellow";
  }
  removeCursor() {
    this.COLOR = "";
  }
  ShouldGoRight(value) {
    return this.get_value() < value;
  }
}
