class InOrder {
  constructor(tree) {
    this.tree = tree;
  }
  traverse(node = this.tree.root, callBack, IS_END = true) {
    if (node == null) return;
    var end_funtion = () => {
      if (IS_END) {
        this.tree.clearTree();
        return;
      }
      callBack();
    };
    // IS_END is still true if and only if we reach at the very right of the tree
    // but what about middle nodes which has IS_END = true ?
    // in this case it will continue proagate to the end and won't go through that branch calling end_function
    this.tree.controller.toggle(node, () => {
      node.removeCursor();
      if (node.has_left()) {
        this.traverse(
          node.get_left(),
          () => {
            if (node.has_right()) {
              this.tree.controller.toggle_select(node, () => {
                this.traverse(node.get_right(), callBack, IS_END);
              });
            } else {
              this.tree.controller.toggle_select(node, () => {
                end_funtion();
              });
            }
          },
          false
        );
      } else if (node.has_right()) {
        this.tree.controller.select(node, () => {
          this.traverse(node.get_right(), callBack, IS_END);
        });
      } else {
        this.tree.controller.select(node, () => {
          end_funtion();
        });
      }
    });
  }
}
