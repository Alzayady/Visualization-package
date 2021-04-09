class Searcher {
  constructor(tree) {
    this.tree = tree;
  }
  search(value, node = this.tree.root) {
    if (node == null) {
      this.tree.printLastTree();
      return;
    }
    if (node.get_value() == value) {
      this.tree.controller.toggle_select(node, () => {
        node.removeCursor();
        this.tree.printLastTree();
      });
      return;
    }
    this.tree.controller.toggle(node, () => {
      node.removeCursor();
      if (node.has_right() && node.ShouldGoRight(value)) {
        this.search(value, node.get_right());
      } else if (node.has_left() && !node.ShouldGoRight(value)) {
        this.search(value, node.get_left());
      } else {
        this.tree.printLastTree();
      }
    });
  }
}
