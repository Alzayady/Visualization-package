class controller {
  constructor() {
    this.buttons = [
      "insert",
      "delete",
      "search",
      "InOrder",
      "PreOrder",
      "PostOrder",
      "extract",
    ];
  }

  setDStoHeap(comparator) {
    this.DS = new heap(this, comparator);
  }
  setDStoBST() {
    this.DS = new BinarySearchTree(this);
  }
  get_value() {
    var value = document.getElementById("text_input").value;
    document.getElementById("text_input").value = "";
    value = parseInt(value);
    return value;
  }
  makeTreat(callback) {
    new Treant(this.DS.root.getWrapperRoot(), callback, $);
  }
  insert = () => {
    var value = this.get_value();

    if (value || value === 0) {
      this.disableAll();
      console.log(this.DS);
      this.DS.insert(value);
    }
  };

  del = () => {
    var value = this.get_value();
    if (value || value === 0) {
      this.disableAll();
      this.DS.delete(value);
    }
  };
  extract = () => {
    this.disableAll();
    this.DS.extract();
  };
  search = () => {
    var value = this.get_value();
    if (value || value === 0) {
      this.disableAll();
      this.DS.search(value);
    }
  };

  InOrder = () => {
    if (this.DS.noRoot()) {
      return;
    }
    this.disableAll();
    this.DS.InOrderTraverse();
  };
  PreOrder = () => {
    if (this.DS.noRoot()) {
      return;
    }
    this.disableAll();
    this.DS.PreOrderTraverse();
  };
  PostOrder = () => {
    if (this.DS.noRoot()) {
      return;
    }
    this.disableAll();
    this.DS.PostOrderTraverse();
  };

  disableAll() {
    this.set_buttons(true);
  }
  enableAll() {
    this.set_buttons(false);
  }
  set_buttons(value) {
    this.buttons.forEach((button) => {
      if (document.getElementById(button) != null) {
        document.getElementById(button).disabled = value;
      }
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
  wait(callback) {
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
