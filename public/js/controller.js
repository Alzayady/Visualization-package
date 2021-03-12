class controller {
  constructor() {
    this.tree = new BinarySearchTree(this);
  }
  setTree(tree) {
    this.tree = tree;
  }
  makeTreat(callback) {
    new Treant(this.tree.getWrapperRoot(), callback, $);
  }
  insert = () => {
    var value = document.getElementById("text_input").value;
    document.getElementById("text_input").value = "";
    value = parseInt(value);
    if (value || value === 0) {
      this.disableAll();
      this.tree.insert(value);
    }
  };
  del = () => {
    var value = document.getElementById("text_input").value;
    document.getElementById("text_input").value = "";
    value = parseInt(value);
    if (value || value === 0) {
      this.disableAll();
      this.tree.delete(value);
    }
  };
  disableAll() {
    document.getElementById("insert").disabled = true;
    document.getElementById("delete").disabled = true;
  }
  enableAll() {
    document.getElementById("insert").disabled = false;
    document.getElementById("delete").disabled = false;
  }
  endProcess() {
    this.enableAll();
  }
  makeRedThenYellowThenCallBack(node, callback) {
    this.tree.addCursor(node);
    this.makeTreat(() => {
      this.tree.addCursorSelected(node);
      this.makeTreat(() => {
        callback();
      });
    });
  }
  makeRedThenCallBack(node, callback) {
    this.tree.addCursor(node);
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
