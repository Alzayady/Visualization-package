class PreOrder {
  constructor(tree) {
    this.tree = tree;
  }

  end_function(node, callBack) {
    if (node == this.tree.root) {
      if (node.has_right()) {
        this.tree.controller.wait(() => {
          this.tree.clearTree();
        });
      } else {
        this.tree.clearTree();
      }
    } else {
      callBack();
    }
  }
  traverse_left(node, callBack) {
    this.traverse(node.get_left(), () => {
      this.tree.controller.toggle(node, () => {
        node.addCursorSelected();
        if (node.has_right()) {
          this.traverse_right(node, callBack);
        } else {
          this.end_function(node, callBack);
        }
      });
    });
  }
  traverse_right(node, callBack) {
    this.traverse(node.get_right(), () => {
      this.tree.controller.toggle(node, () => {
        console.log("right");
        node.addCursorSelected();
        this.end_function(node, callBack);
      });
    });
  }
  traverse(node = this.tree.root, callBack) {
    this.tree.controller.toggle_select(node, () => {
      if (node.has_left()) {
        this.traverse_left(node, callBack);
      } else if (node.has_right()) {
        this.traverse_right(node, callBack);
      } else {
        this.end_function(node, callBack);
      }
    });
  }
}
