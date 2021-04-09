class Inserter {
  constructor(tree) {
    this.tree = tree;
  }
  insert(value) {
    this.insertedValue = value;
    if (this.tree.noRoot()) {
      this.makeRoot();
      this.tree.printLastTree();
      return;
    }
    this.insert_inner(this.tree.root);
  }
  makeRoot() {
    this.tree.root = new Node(this.insertedValue);
  }
  insert_inner(node) {
    this.tree.controller.toggle(node, () => {
      node.removeCursor();
      this.propagete(node);
    });
  }
  propagete(node) {
    if (node.get_value() == this.insertedValue) {
      this.tree.printLastTree();
    } else if (node.ShouldGoRight(this.insertedValue)) {
      this.goRight(node);
    } else {
      this.goLeft(node);
    }
  }

  goRight(node) {
    if (node.has_right()) {
      this.insert_inner(node.get_right());
    } else {
      node.set_right_value(this.insertedValue);
      this.tree.controller.toggle(node.get_right(), () => {
        node.get_right().removeCursor();
        this.tree.printLastTree();
      });
    }
  }
  goLeft(node) {
    if (node.has_left()) {
      this.insert_inner(node.get_left());
    } else {
      node.set_left_value(this.insertedValue);
      this.tree.controller.toggle(node.get_left(), () => {
        node.get_left().removeCursor();
        this.tree.printLastTree();
      });
    }
  }
}
