class BinarySearchTree {
  constructor(controller) {
    this.controller = controller;
    this.Inserter = new Inserter(this);
    this.Deleter = new Deleter(this);
    this.Searcher = new Searcher(this);
    this.InOrder = new InOrder(this);
    this.PreOrder = new PreOrder(this);
    this.PostOrder = new PostOrder(this);
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
  PreOrderTraverse() {
    this.PreOrder.traverse();
  }
  PostOrderTraverse() {
    this.PostOrder.traverse();
  }

  noRoot() {
    return !this.root || this.root.IsPsudo();
  }

  printLastTree() {
    this.controller.makeTreat(() => this.controller.endProcess());
  }
  clearTree() {
    var bfs = [];
    bfs.push(this.root);
    while (bfs.length) {
      var nextBfs = [];
      bfs.forEach((node) => {
        if (node.has_right()) {
          nextBfs.push(node.get_right());
        }
        if (node.has_left()) {
          nextBfs.push(node.get_left());
        }
        node.removeCursor();
      });

      bfs = nextBfs;
    }
    this.printLastTree();
  }
}
