class InOrder {
  constructor(tree) {
    this.tree = tree;
  }
  traverse(node = this.tree.root, callBack) {
    if (node == null) return;
    var end_funtion = () => {
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
    };
    this.tree.controller.toggle(node, () => {
      node.removeCursor();
      if (node.has_left()) {
        this.traverse(node.get_left(), () => {
          if (node.has_right()) {
            this.tree.controller.toggle_select(node, () => {
              this.traverse(node.get_right(), () => {
                this.tree.controller.toggle(node, () => {
                  node.addCursorSelected();
                  end_funtion();
                });
              });
            });
          } else {
            this.tree.controller.toggle_select(node, () => {
              end_funtion();
            });
          }
        });
      } else if (node.has_right()) {
        this.tree.controller.select(node, () => {
          this.traverse(node.get_right(), () => {
            this.tree.controller.toggle(node, () => {
              node.addCursorSelected();
              end_funtion();
            });
          });
        });
      } else {
        this.tree.controller.select(node, () => {
          end_funtion();
        });
      }
    });
  }
}
