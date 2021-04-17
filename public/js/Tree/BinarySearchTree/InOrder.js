class InOrder {
  constructor(tree) {
    this.tree = tree;
  }

  traverse(node = this.tree.root, callBack) {
    if (node == null) return;
    this.tree.controller.toggle(node, () => {
      node.removeCursor();
      if (node.has_left()) {
        this.traverse_left(node, callBack);
      } else if (node.has_right()) {
        this.traverse_right(node, callBack);
      } else {
        this.tree.controller.select(node, () => {
          this.end_funtion(node, callBack);
        });
      }
    });
  }

  traverse_left(node, callBack) {
    this.traverse(node.get_left(), () => {
      if (node.has_right()) {
        this.tree.controller.toggle(node, () => {
          this.traverse_right(node, callBack);
        });
      } else {
        this.tree.controller.toggle_select(node, () => {
          this.end_funtion(node, callBack);
        });
      }
    });
  }
  traverse_right(node, callBack) {
    this.tree.controller.select(node, () => {
      this.traverse(node.get_right(), () => {
        this.tree.controller.toggle(node, () => {
          node.addCursorSelected();
          this.end_funtion(node, callBack);
        });
      });
    });
  }
  end_funtion(node, callBack) {
    if (node == this.tree.root) {
      if (node.has_right()) {
        // if root has right node  then we wait one qunatam after toggle the root back after trave the right tree
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
}
