class controller {
  constructor() {
    this.tree = new BinarySearchTree(this);
    this.buttons = [
      "insert",
      "delete",
      "search",
      "InOrder",
      "PreOrder",
      "PostOrder",
    ];
  }
  setTree(tree) {
    this.tree = tree;
  }
  get_value() {
    var value = document.getElementById("text_input").value;
    document.getElementById("text_input").value = "";
    value = parseInt(value);
    return value;
  }
  makeTreat(callback) {
    new Treant(this.tree.root.getWrapperRoot(), callback, $);
  }
  insert = () => {
    var value = this.get_value();
    if (value || value === 0) {
      this.disableAll();
      this.tree.insert(value);
    }
  };
  del = () => {
    var value = this.get_value();
    if (value || value === 0) {
      this.disableAll();
      this.tree.delete(value);
    }
  };
  search = () => {
    var value = this.get_value();
    if (value || value === 0) {
      this.disableAll();
      this.tree.search(value);
    }
  };

  InOrder = () => {
    if (this.tree.noRoot()) {
      return;
    }
    this.disableAll();
    this.tree.InOrderTraverse();
  };
  PreOrder = () => {
    if (this.tree.noRoot()) {
      return;
    }
    this.disableAll();
    this.tree.PreOrderTraverse();
  };
  PostOrder = () => {
    if (this.tree.noRoot()) {
      return;
    }
    this.disableAll();
    this.tree.PostOrderTraverse();
  };

  disableAll() {
    this.set_buttons(true);
  }
  enableAll() {
    this.set_buttons(false);
  }
  set_buttons(value) {
    this.buttons.forEach((button) => {
      document.getElementById(button).disabled = value;
    });
  }
  endProcess() {
    this.enableAll();
  }
  toggle_select(node, callback) {
    node.addCursor();
    this.makeTreat(() => {
      node.addCursorSelected();
      this.makeTreat(() => {
        callback();
      });
    });
  }
  toggle(node, callback) {
    node.addCursor();
    this.makeTreat(() => {
      callback();
    });
  }

  select(node, callback) {
    node.addCursorSelected();
    this.makeTreat(() => {
      callback();
    });
  }
}

let controllerObject = new controller();

add = () => {
  controllerObject.insert();
};

del = () => {
  controllerObject.del();
};
search = () => {
  controllerObject.search();
};
InOrderTraverse = () => {
  controllerObject.InOrder();
};
PreOrderTraverse = () => {
  controllerObject.PreOrder();
};
PostOrderTraverse = () => {
  controllerObject.PostOrder();
};
