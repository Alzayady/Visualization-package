class controller {
  constructor() {
    this.tree = new BinarySearchTree(this);
  }
  makeTreat(callback) {
    new Treant(this.tree.getWrapperRoot(), callback);
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
}

let controllerObject = new controller();
// new Treant();
console.log("contolring object");
add = () => {
  controllerObject.insert();
};

del = () => {
  controllerObject.del();
};
