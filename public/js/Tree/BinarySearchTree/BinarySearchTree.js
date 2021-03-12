class BinarySearchTree extends Tree {
  constructor(controller) {
    super(controller);
    this.Inserter = new Inserter(this);
    this.Deleter = new Deleter(this);
  }

  // insert //
  insert(value) {
    this.Inserter.insert(value);
  }
  delete(value) {
    this.Deleter.delete(value);
  }

  // delete //
}
