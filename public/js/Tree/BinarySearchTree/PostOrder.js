class PostOrder {
  constructor(tree) {
    this.tree = tree;
  }
  traverse(node = this.tree.root, callBack, IS_END = true) {
    var end_function = () => {
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
              this.tree.controller.toggle(node, () => {
                node.removeCursor();
                this.traverse(
                  node.get_right(),
                  () => {
                    this.tree.controller.toggle_select(node, () => {
                      end_function();
                    });
                  },
                  false
                );
              });
            } else {
              this.tree.controller.toggle_select(node, () => {
                end_function();
              });
            }
          },
          false
        );
      } else if (node.has_right()) {
        this.traverse(
          node.get_right(),
          () => {
            this.tree.controller.toggle_select(node, () => {
              end_function();
            });
          },
          false
        );
      } else {
        // if it is a leave , we don't need to toggle it again
        this.tree.controller.select(node, () => {
          end_function();
        });
      }
    });
  }
}
