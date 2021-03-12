class InOrder {
  constructor(tree) {
    this.tree = tree;
  }
  traverse(node = this.tree.root, callBack = clearTree) {
    if (node == null) return;
    this.tree.controller.makeRedThenCallBack(node, () => {
      this.tree.removeCursor(node);
      if (this.tree.hasLeft(node)) {
        this.traverse(this.tree.getLeft(node), () => {
          if (this.tree.hasRight(node)) {
            this.tree.controller.makeRedThenYellowThenCallBack(node, () => {
              this.traverse(this.tree.getRight(node), callBack);
            });
          } else {
            this.tree.controller.makeRedThenYellowThenCallBack(node, () => {
              callBack(this.tree.root);
            });
          }
        });
      } else if (this.tree.hasRight(node)) {
        this.tree.controller.makeYellowThenCallBack(node, () => {
          this.traverse(this.tree.getRight(node), callBack);
        });
      } else {
        this.tree.controller.makeYellowThenCallBack(node, () => {
          callBack(this.tree.root);
        });
      }
    });
  }
}

clearTree = (root) => {
  var bfs = [];
  bfs.push(root);
  var utilities = new BinarySearchTree();
  while (bfs.length) {
    var nextBfs = [];
    bfs.forEach((node) => {
      if (utilities.hasRight(node)) {
        nextBfs.push(utilities.getRight(node));
      }
      if (utilities.hasLeft(node)) {
        nextBfs.push(utilities.getLeft(node));
      }
      utilities.removeCursor(node);
    });

    bfs = nextBfs;
  }
  let wrappedRoot = {
    chart: {
      container: "#OrganiseChart-simple",
    },
    nodeStructure: root,
  };
  new Treant(
    wrappedRoot,
    () => {
      document.getElementById("insert").disabled = false;
      document.getElementById("delete").disabled = false;
      document.getElementById("search").disabled = false;
      document.getElementById("InOrder").disabled = false;
    },
    $
  );
};
