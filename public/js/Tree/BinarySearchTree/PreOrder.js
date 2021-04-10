class PreOrder {
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
    console.log(node);
    this.tree.controller.select(node, () => {
      if (node.has_left()) {
        this.traverse(
          node.get_left(),
          () => {
            if (node.has_right()) {
              this.traverse(
                node.get_right(),
                () => {
                  end_function();
                },
                false
              );
            } else {
              end_function();
            }
          },
          false
        );
      } else if (node.has_right()) {
        this.traverse(
          node.get_right(),
          () => {
            end_function();
          },
          false
        );
      } else {
        end_function();
      }
    });
  }
}
