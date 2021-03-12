class Deleter {
  constructor(tree) {
    this.tree = tree;
  }
  delete(value) {
    this.deletedValue = value;
    if (this.tree.noRoot()) return;
    if (this.tree.root.text.name === this.deletedValue) {
      this.tree.controller.makeRedThenYellowThenCallBack(this.tree.root, () =>
        this.deleteRoot()
      );
    } else {
      this.propagateDelete(this.tree.root);
    }
  }
  deleteRoot() {
    if (this.tree.hasTwoChild(this.tree.root)) {
      this.deleteHasBoth(this.tree.root);
    } else if (this.tree.hasLeft(this.tree.root)) {
      this.tree.controller.makeRedThenYellowThenCallBack(
        this.tree.getLeft(this.tree.root),
        () => {
          this.tree.root = this.tree.getLeft(this.tree.root);
          this.tree.removeCursor(this.tree.root);
          this.tree.printLastTree();
        }
      );
    } else if (this.tree.hasRight(this.tree.root)) {
      this.tree.controller.makeRedThenYellowThenCallBack(
        this.tree.getRight(this.tree.root),
        () => {
          this.tree.root = this.tree.getRight(this.tree.root);
          this.tree.removeCursor(this.tree.root);
          this.tree.printLastTree();
        }
      );
    } else {
      this.tree.makePsudo(this.tree.root);
      this.tree.printLastTree();
    }
  }

  propagateDelete(node) {
    if (this.tree.IsPsudo(node)) {
      // value does't exist
      this.tree.printLastTree();
      return;
    }
    this.tree.addCursor(node);
    this.tree.controller.makeTreat(() => {
      this.tree.removeCursor(node);
      if (this.tree.ShouldGoRight(node, this.deletedValue)) {
        if (
          this.tree.IsSameValue(this.tree.getRight(node), this.deletedValue)
        ) {
          this.deletePos(node, 1);
          return;
        }
        this.propagateDelete(this.tree.getRight(node));
      } else {
        if (this.tree.IsSameValue(this.tree.getLeft(node), this.deletedValue)) {
          this.deletePos(node, 0);
          return;
        }
        this.propagateDelete(this.tree.getLeft(node));
      }
    });
  }
  // it gets the parent of deleted node
  // and the positon of the deleted node
  // 0 --> left
  // 1 --> right
  deletePos(parentNode, pos) {
    this.deletedNode = this.tree.getChildren(parentNode, pos);
    this.tree.controller.makeRedThenYellowThenCallBack(this.deletedNode, () => {
      if (
        this.tree.hasLeft(this.deletedNode) &&
        this.tree.hasRight(this.deletedNode)
      ) {
        this.deleteHasBoth(this.deletedNode);
      } else if (this.tree.hasLeft(this.deletedNode)) {
        this.tree.controller.makeRedThenYellowThenCallBack(
          this.tree.getLeft(this.deletedNode),
          () => {
            this.tree.removeCursor(this.tree.getLeft(this.deletedNode));
            this.tree.removeCursor(this.deletedNode);
            this.deleteHasLeft(parentNode, pos);
            this.tree.printLastTree();
          }
        );
      } else if (this.tree.hasRight(this.deletedNode)) {
        this.tree.controller.makeRedThenYellowThenCallBack(
          this.tree.getRight(this.deletedNode),
          () => {
            this.tree.removeCursor(this.tree.getRight(this.deletedNode));
            this.tree.removeCursor(this.deletedNode);
            this.deleteHasRight(parentNode, pos);
            this.tree.printLastTree();
          }
        );
      } else {
        this.tree.removeCursor(this.deletedNode);
        this.deleteNoChild(this.deletedNode);
        this.tree.printLastTree();
      }
    });
  }
  deleteNoChild(node) {
    this.tree.makePsudo(node);
  }
  deleteHasLeft(parentNode, posOfChild) {
    parentNode.children[posOfChild] =
      parentNode.children[posOfChild].children[0];
  }
  deleteHasRight(parentNode, posOfChild) {
    parentNode.children[posOfChild] =
      parentNode.children[posOfChild].children[1];
  }
  deleteHasBoth(deletedNode) {
    var Right = this.tree.getRight(deletedNode);
    if (!this.tree.hasLeft(Right)) {
      this.tree.controller.makeRedThenYellowThenCallBack(Right, () => {
        deletedNode.text.name = Right.text.name;
        if (this.tree.hasRight(Right)) {
          this.deleteHasRight(deletedNode, 1);
        } else {
          this.deleteNoChild(Right);
        }
        this.tree.removeCursor(deletedNode);
        this.tree.printLastTree();
      });
    } else {
      this.tree.controller.makeRedThenCallBack(Right, () => {
        this.tree.removeCursor(Right);
        this.getParentMostLeft(Right, (parentLeftMost) => {
          var LeftMost = this.tree.getLeft(parentLeftMost);
          this.tree.removeCursor(deletedNode);
          deletedNode.text.name = LeftMost.text.name;
          if (this.tree.hasRight(LeftMost)) {
            this.deleteHasRight(parentLeftMost, 0);
          } else {
            this.tree.makePsudo(LeftMost);
          }
          this.tree.printLastTree();
        });
      });
    }
  }
  getParentMostLeft(node, callback) {
    if (this.tree.hasLeft(this.tree.getLeft(node))) {
      this.tree.controller.makeRedThenCallBack(this.tree.getLeft(node), () => {
        this.tree.removeCursor(this.tree.getLeft(node));
        this.getParentMostLeft(this.tree.getLeft(node), callback);
      });
    } else {
      this.tree.controller.makeRedThenYellowThenCallBack(
        this.tree.getLeft(node),
        () => {
          this.tree.removeCursor(this.tree.getLeft(node));
          callback(node);
        }
      );
    }
  }
}
