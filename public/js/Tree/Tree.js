class Tree {
  constructor(controller) {
    this.controller = controller;
  }

  makeRedThenYellowThenCallBack(node, callback) {
    this.addCursor(node);
    this.controller.makeTreat(() => {
      this.addCursorSelected(node);
      this.controller.makeTreat(() => {
        callback();
      });
    });
  }
  makeRedThenCallBack(node, callback) {
    this.addCursor(node);
    this.controller.makeTreat(() => {
      callback();
    });
  }

  getLeft = (node) => {
    return this.getChildren(node, 0);
  };
  getRight = (node) => {
    return this.getChildren(node, 1);
  };
  getChildren(node, num) {
    this.child = node.children[num];
    if (!this.IsPsudo(this.child)) {
      return this.child;
    }
    return null;
  }
  hasTwoChild(node) {
    return this.hasLeft(node) && this.hasRight(node);
  }
  hasLeft(node) {
    return this.getLeft(node) != null;
  }
  hasRight(node) {
    return this.getRight(node) != null;
  }

  makeLeftNode(node, newText) {
    return this.makeNodeIn(node, 0, newText);
  }
  makeRightNode(node, newText) {
    return this.makeNodeIn(node, 1, newText);
  }
  makeNodeIn(node, position, value) {
    this.other = position == 0 ? 1 : 0;
    node.children[position] = this.getWrapperNode(value);
    if (!this.hasInPosition(node, this.other)) {
      node.children[this.other] = this.getPsudoNode();
    }
  }
  hasInPosition(node, position) {
    return position == 0 ? this.hasLeft(node) : this.hasRight(node);
  }

  getPsudoNode() {
    return {
      text: { name: "" },
      HTMLclass: "pseudo",
    };
  }
  makePsudo(node) {
    node.text.name = "";
    node.HTMLclass = "pseudo";
    node.children = [];
  }
  IsPsudo(node) {
    return !node || node.text.name === "";
  }
  getWrapperNode(text) {
    return {
      text: {
        name: parseInt(text),
      },
      children: [],
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
      nodeStructure: this.root,
    };
    return wrappedRoot;
  }

  addCursor(node) {
    node.HTMLclass = "red";
  }
  addCursorSelected(node) {
    node.HTMLclass = "yellow";
  }
  removeCursor(node) {
    delete node.HTMLclass;
  }
  printLastTree() {
    this.controller.makeTreat(() => this.controller.endProcess());
  }
  IsSameValue(node, value) {
    if (this.IsPsudo(node)) return false;
    return node.text.name === value;
  }
  ShouldGoRight(node, value) {
    return node.text.name < value;
  }
}
