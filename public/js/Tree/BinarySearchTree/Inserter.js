class Inserter {
  constructor(tree) {
    this.tree = tree;
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
    this.tree.controller.makeRedThenCallBack(node, () => {
      this.propagete(node);
    });
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
      this.tree.controller.makeRedThenCallBack(this.tree.getRight(node), () => {
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
      this.tree.controller.makeRedThenCallBack(this.tree.getLeft(node), () => {
        this.tree.removeCursor(this.tree.getLeft(node));
        this.tree.printLastTree();
      });
    }
  }
}
