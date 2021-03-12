class Searcher {
  constructor(tree) {
    this.tree = tree;
  }
  search(value, node = this.tree.root) {
    if (node == null) {
      this.tree.printLastTree();
      return;
    }
    if (this.tree.IsSameValue(node, value)) {
      this.tree.controller.makeRedThenYellowThenCallBack(node, () => {
        this.tree.removeCursor(node);
        this.tree.printLastTree();
      });
      return;
    }
    this.tree.controller.makeRedThenCallBack(node, () => {
      this.tree.removeCursor(node);
      if (this.tree.ShouldGoRight(node, value)) {
        this.search(value, this.tree.getRight(node));
      } else {
        this.search(value, this.tree.getLeft(node));
      }
    });
  }
}
