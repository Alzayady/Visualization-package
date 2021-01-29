class BinarySearchTree extends Tree {
  constructor(controller) {
    super(controller);
  }

  // insert //
  insert(value) {
    this.insertedValue = value;
    if (!this.root || this.IsPsudo(this.root)) {
      this.makeRoot();
      this.printLastTree();
      return;
    }
    this.insert_inner(this.root);
  }
  makeRoot() {
    this.root = this.getWrapperNode(this.insertedValue);
  }
  insert_inner(node) {
    this.addCursor(node);
    this.controller.makeTreat(() => this.propagete(node));
  }
  propagete(node) {
    this.removeCursor(node);
    if (node.text.name == this.insertedValue) {
      this.printLastTree();
    } else if (this.ShouldGoRight(node, this.insertedValue)) {
      this.goRight(node);
    } else {
      this.goLeft(node);
    }
  }

  goRight(node) {
    if (this.hasRight(node)) {
      this.insert_inner(this.getRight(node));
    } else {
      this.makeRightNode(node, this.insertedValue);
      this.addCursor(this.getRight(node));
      this.controller.makeTreat(() => {
        this.removeCursor(this.getRight(node));
        this.printLastTree();
      });
    }
  }
  goLeft(node) {
    if (this.hasLeft(node)) {
      this.insert_inner(this.getLeft(node));
    } else {
      this.makeLeftNode(node, this.insertedValue);
      this.addCursor(this.getLeft(node));
      this.controller.makeTreat(() => {
        this.removeCursor(this.getLeft(node));
        this.printLastTree();
      });
    }
  }

  printLastTree() {
    this.controller.makeTreat(() => this.controller.endProcess());
  }
  ShouldGoRight(node, value) {
    return node.text.name < value;
  }

  // delete //
  delete(value) {
    this.deletedValue = value;
    if (this.noRoot()) return;
    if (this.root.text.name === this.deletedValue) {
      this.makeRedThenYellowThenCallBack(this.root, () => this.deleteRoot());
    } else {
      this.propagateDelete(this.root);
    }
  }
  noRoot() {
    return this.root === null || this.IsPsudo(this.root);
  }
  deleteRoot() {
    if (this.hasTwoChild(this.root)) {
      this.deleteHasBoth(this.root);
    } else if (this.hasLeft(this.root)) {
      this.makeRedThenYellowThenCallBack(this.getLeft(this.root), () => {
        this.root = this.getLeft(this.root);
        this.removeCursor(this.root);
        this.printLastTree();
      });
    } else if (this.hasRight(this.root)) {
      this.makeRedThenYellowThenCallBack(this.getRight(this.root), () => {
        this.root = this.getRight(this.root);
        this.removeCursor(this.root);
        this.printLastTree();
      });
    } else {
      this.makePsudo(this.root);
      this.printLastTree();
    }
  }
  makeRedThenYellowThenCallBack(node, callback) {
    this.addCursor(node);
    this.controller.makeTreat(() => {
      this.addCursorSelected(node);
      this.controller.makeTreat(() => {
        callback();
      });
    });
  }
  makeRedThenCallBack(node, callback) {
    this.addCursor(node);
    this.controller.makeTreat(() => {
      callback();
    });
  }

  propagateDelete(node) {
    if (this.IsPsudo(node)) {
      // value does't exist
      this.printLastTree();
      return;
    }
    this.addCursor(node);
    this.controller.makeTreat(() => {
      this.removeCursor(node);
      if (this.ShouldGoRight(node, this.deletedValue)) {
        if (this.IsSameValue(this.getRight(node), this.deletedValue)) {
          this.deletePos(node, 1);
          return;
        }
        this.propagateDelete(this.getRight(node));
      } else {
        if (this.IsSameValue(this.getLeft(node), this.deletedValue)) {
          this.deletePos(node, 0);
          return;
        }
        this.propagateDelete(this.getLeft(node));
      }
    });
  }
  IsSameValue(node, value) {
    if (this.IsPsudo(node)) return false;
    return node.text.name === value;
  }
  // it gets the parent of deleted node
  // and the positon of the deleted node
  // 0 --> left
  // 1 --> right
  deletePos(parentNode, pos) {
    this.deletedNode = this.getChildren(parentNode, pos);
    this.makeRedThenYellowThenCallBack(this.deletedNode, () => {
      if (this.hasLeft(this.deletedNode) && this.hasRight(this.deletedNode)) {
        this.deleteHasBoth(this.deletedNode);
      } else if (this.hasLeft(this.deletedNode)) {
        this.makeRedThenYellowThenCallBack(
          this.getLeft(this.deletedNode),
          () => {
            this.removeCursor(this.getLeft(this.deletedNode));
            this.removeCursor(this.deletedNode);
            this.deleteHasLeft(parentNode, pos);
            this.printLastTree();
          }
        );
      } else if (this.hasRight(this.deletedNode)) {
        this.makeRedThenYellowThenCallBack(
          this.getRight(this.deletedNode),
          () => {
            this.removeCursor(this.getRight(this.deletedNode));
            this.removeCursor(this.deletedNode);
            this.deleteHasRight(parentNode, pos);
            this.printLastTree();
          }
        );
      } else {
        this.removeCursor(this.deletedNode);
        this.deleteNoChild(this.deletedNode);
        this.printLastTree();
      }
    });
  }
  deleteNoChild(node) {
    this.makePsudo(node);
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
    var Right = this.getRight(deletedNode);
    if (!this.hasLeft(Right)) {
      this.makeRedThenYellowThenCallBack(Right, () => {
        deletedNode.text.name = Right.text.name;
        if (this.hasRight(Right)) {
          this.deleteHasRight(deletedNode, 1);
        } else {
          this.deleteNoChild(Right);
        }
        this.removeCursor(deletedNode);
        this.printLastTree();
      });
    } else {
      this.makeRedThenCallBack(Right, () => {
        this.removeCursor(Right);
        this.getParentMostLeft(Right, (parentLeftMost) => {
          var LeftMost = this.getLeft(parentLeftMost);
          this.removeCursor(deletedNode);
          deletedNode.text.name = LeftMost.text.name;
          if (this.hasRight(LeftMost)) {
            this.deleteHasRight(parentLeftMost, 0);
          } else {
            this.makePsudo(LeftMost);
          }
          this.printLastTree();
        });
      });
    }
  }
  getParentMostLeft(node, callback) {
    if (this.hasLeft(this.getLeft(node))) {
      this.makeRedThenCallBack(this.getLeft(node), () => {
        this.removeCursor(this.getLeft(node));
        this.getParentMostLeft(this.getLeft(node), callback);
      });
    } else {
      this.makeRedThenYellowThenCallBack(this.getLeft(node), () => {
        this.removeCursor(this.getLeft(node));
        callback(node);
      });
    }
  }
}
