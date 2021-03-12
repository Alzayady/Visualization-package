class BinarySearchTree extends Tree {
  constructor(controller) {
    super(controller);
    this.Inserter = new Inserter(this);
    this.Deleter = new Deleter(this);
    this.Searcher = new Searcher(this);
    this.InOrder = new InOrder(this);
  }

  // insert //
  insert(value) {
    this.Inserter.insert(value);
  }
  delete(value) {
    this.Deleter.delete(value);
  }
  search(value) {
    this.Searcher.search(value);
  }
  InOrderTraverse() {
    this.InOrder.traverse();
  }

  // delete //
}
