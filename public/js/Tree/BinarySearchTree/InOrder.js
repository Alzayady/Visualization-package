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
