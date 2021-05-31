class Deleter {
  constructor(tree) {
    this.tree = tree;
  }
  delete(value) {
    this.deletedValue = value;
    if (this.tree.noRoot()) return;
    if (this.tree.root.get_value() === this.deletedValue) {
      this.tree.controller.toggle_select(this.tree.root, () =>
        this.deleteRoot()
      );
    } else {
      this.propagateDelete(this.tree.root);
    }
  }
  deleteRoot() {
    if (this.tree.root.hasTwoChild()) {
      this.deleteHasBoth(this.tree.root);
    } else if (this.tree.root.has_left()) {
      this.tree.controller.toggle_select(this.tree.root.get_left(), () => {
        this.tree.root = this.tree.root.get_left();
        this.tree.root.removeCursor();
        this.tree.printLastTree();
      });
    } else if (this.tree.root.has_right()) {
      this.tree.controller.toggle_select(this.tree.root.get_right(), () => {
        this.tree.root = this.tree.root.get_right();
        this.tree.root.removeCursor();
        this.tree.printLastTree();
      });
    } else {
      this.tree.root = new NullNode();
      this.tree.printLastTree();
    }
  }

  propagateDelete(node) {
    if (node.IsPsudo()) {
      // value does't exist
      this.tree.printLastTree();
      return;
    }
    this.tree.controller.toggle(node, () => {
      node.removeCursor();
      if (node.ShouldGoRight(this.deletedValue)) {
        if (node.get_right().get_value() == this.deletedValue) {
          this.deletePos(node, 1);
          return;
        }
        this.propagateDelete(node.get_right());
      } else {
        if (node.get_left().get_value() == this.deletedValue) {
          this.deletePos(node, 0);
          return;
        }
        this.propagateDelete(node.get_left());
      }
    });
  }
  // it gets the parent of deleted node
  // and the positon of the deleted node
  // 0 --> left
  // 1 --> right
  deletePos(parent_node, pos) {
    var deleted_node = null;
    if (pos == 0) {
      deleted_node = parent_node.get_left();
    } else {
      deleted_node = parent_node.get_right();
    }
    this.tree.controller.toggle_select(deleted_node, () => {
      if (deleted_node.has_left() && deleted_node.has_right()) {
        this.deleteHasBoth(deleted_node);
      } else if (deleted_node.has_left()) {
        this.tree.controller.toggle_select(deleted_node.get_left(), () => {
          deleted_node.get_left().removeCursor();
          deleted_node.removeCursor();
          this.deleteHasLeft(parent_node, pos);
          this.tree.printLastTree();
        });
      } else if (deleted_node.has_right()) {
        this.tree.controller.toggle_select(deleted_node.get_right(), () => {
          deleted_node.removeCursor();
          deleted_node.get_right().removeCursor();
          this.deleteHasRight(parent_node, pos);
          this.tree.printLastTree();
        });
      } else {
        deleted_node.removeCursor();
        if (pos == 0) {
          parent_node.set_left(new NullNode());
        } else {
          parent_node.set_right(new NullNode());
        }
        this.tree.printLastTree();
      }
    });
  }
  deleteHasLeft(parent_node, pos_of_child) {
    if (pos_of_child == 0) {
      parent_node.set_left(parent_node.get_left().get_left());
    } else {
      parent_node.set_right(parent_node.get_right().get_left());
    }
  }
  deleteHasRight(parent_node, pos_of_child) {
    if (pos_of_child == 0) {
      parent_node.set_left(parent_node.get_left().get_right());
    } else {
      parent_node.set_right(parent_node.get_right().get_right());
    }
  }
  deleteHasBoth(deleted_node) {
    var Right = deleted_node.get_right();
    if (!Right.has_left()) {
      this.tree.controller.toggle_select(Right, () => {
        deleted_node.set_value(Right.get_value());
        if (Right.has_right()) {
          this.deleteHasRight(deleted_node, 1);
        } else {
          deleted_node.set_right(new NullNode());
        }
        deleted_node.removeCursor();
        this.tree.printLastTree();
      });
    } else {
      this.tree.controller.toggle(Right, () => {
        Right.removeCursor();
        this.getParentMostLeft(Right, (parentLeftMost) => {
          var LeftMost = parentLeftMost.get_left();
          deleted_node.removeCursor();
          deleted_node.set_value(LeftMost.get_value());
          if (LeftMost.has_right()) {
            this.deleteHasRight(parentLeftMost, 0);
          } else {
            parentLeftMost.set_left(new NullNode());
          }
          this.tree.printLastTree();
        });
      });
    }
  }
  getParentMostLeft(node, callback) {
    if (node.get_left().has_left()) {
      this.tree.controller.toggle(node.get_left(), () => {
        node.get_left().removeCursor();
        this.getParentMostLeft(node.get_left(), callback);
      });
    } else {
      this.tree.controller.toggle_select(node.get_left(), () => {
        node.get_left().removeCursor();
        callback(node);
      });
    }
  }
}
