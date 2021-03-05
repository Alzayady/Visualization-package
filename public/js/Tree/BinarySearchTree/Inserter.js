class Inserter {
  constructor(tree) {
    this.tree = tree;
    console.log("create inserter ");
  }
  insert(value) {
    this.insertedValue = value;
    if (!this.tree.root || this.tree.IsPsudo(this.tree.root)) {
      this.makeRoot();
      this.tree.printLastTree();
      return;
    }
    this.insert_inner(this.tree.root);
  }
  makeRoot() {
    this.tree.root = this.tree.getWrapperNode(this.insertedValue);
  }
  insert_inner(node) {
    this.tree.addCursor(node);
    this.tree.controller.makeTreat(() => this.propagete(node));
  }
  propagete(node) {
    this.tree.removeCursor(node);
    if (node.text.name == this.insertedValue) {
      this.tree.printLastTree();
    } else if (this.tree.ShouldGoRight(node, this.insertedValue)) {
      this.goRight(node);
    } else {
      this.goLeft(node);
    }
  }

  goRight(node) {
    if (this.tree.hasRight(node)) {
      this.insert_inner(this.tree.getRight(node));
    } else {
      this.tree.makeRightNode(node, this.insertedValue);
      this.tree.addCursor(this.tree.getRight(node));
      this.tree.controller.makeTreat(() => {
        this.tree.removeCursor(this.tree.getRight(node));
        this.tree.printLastTree();
      });
    }
  }
  goLeft(node) {
    if (this.tree.hasLeft(node)) {
      this.insert_inner(this.tree.getLeft(node));
    } else {
      this.tree.makeLeftNode(node, this.insertedValue);
      this.tree.addCursor(this.tree.getLeft(node));
      this.tree.controller.makeTreat(() => {
        this.tree.removeCursor(this.tree.getLeft(node));
        this.tree.printLastTree();
      });
    }
  }
}
