class heap {
  constructor(controller, comparator) {
    this.controller = controller;
    this.comparator = comparator;
    this.nodes = [null];
    this.size = 1;
  }
  insert(value) {
    var node = new Node(value);
    this.nodes.push(node);
    this.size++;
    if (this.get_size() == 1) {
      this.root = node;
      this.controller.makeTreat(() => {
        this.controller.endProcess();
      });
      return;
    }
    var index_parent = Math.floor(this.get_size() / 2);

    if (this.get_size() % 2 == 0) {
      // left child
      this.nodes[index_parent].set_left(node);
    } else {
      // right child
      console.log(index_parent);
      this.nodes[index_parent].set_right(node);
    }
    node.addCursor();
    this.controller.makeTreat(() => {
      this.fix_path(this.get_size());
    });
  }

  fix_path(index) {
    if (index == 1) {
      this.nodes[index].removeCursor();
      this.controller.makeTreat(() => {
        this.controller.endProcess();
      });
      return;
    }
    var index_parent = Math.floor(index / 2);

    if (
      this.comparator(
        this.nodes[index_parent].get_value(),
        this.nodes[index].get_value()
      ) > 0
    ) {
      this.nodes[index_parent].addCursorSelected();
      this.controller.makeTreat(() => {
        this.nodes[index].removeCursor();

        this.nodes[index_parent].addCursor();
        this.swap_value(this.nodes[index], this.nodes[index_parent]);

        this.controller.makeTreat(() => {
          this.fix_path(index_parent);
        });
      });
    } else {
      this.nodes[index].removeCursor();
      this.controller.makeTreat(() => {
        this.controller.endProcess();
      });
    }
  }
  extract() {
    if (this.get_size() == 0) {
      this.controller.endProcess();
      return;
    }
    if (this.get_size() == 1) {
      this.nodes.pop();
      this.root = new NullNode();
      this.controller.makeTreat(() => {
        this.controller.endProcess();
      });
      this.size--;
      return;
    }
    this.root.addCursor();
    this.controller.makeTreat(() => {
      this.nodes[this.size - 1].addCursor();
      this.controller.makeTreat(() => {
        this.root.addCursorSelected();
        this.nodes[this.size - 1].addCursorSelected();
        this.controller.makeTreat(() => {
          var index_parent = Math.floor(this.get_size() / 2);
          if (this.get_size() % 2 == 1) {
            this.nodes[index_parent].set_right(new NullNode());
          } else {
            this.nodes[index_parent].set_left(new NullNode());
          }
          this.root.addCursor();
          this.swap_value(this.nodes[1], this.nodes[this.get_size()]);
          this.controller.makeTreat(() => {
            this.heapfy(this.nodes[1]);
          });
          this.size--;
          this.nodes.pop();
        });
      });
    });
  }
  get_size() {
    return this.size - 1;
  }
  swap_value(node1, node2) {
    var temp = node1.get_value();
    node1.set_value(node2.get_value());
    node2.set_value(temp);
  }
  heapfy(node) {
    var compare_left = () => {
      if (this.comparator(node.get_value(), node.get_left().get_value()) > 0) {
        node.get_left().addCursor();
        this.controller.makeTreat(() => {
          node.addCursorSelected();
          node.get_left().addCursorSelected();

          this.controller.makeTreat(() => {
            node.removeCursor();
            node.get_left().addCursor();
            this.swap_value(node, node.get_left());
            this.controller.makeTreat(() => {
              this.heapfy(node.get_left());
            });
          });
        });
      } else {
        node.removeCursor();
        this.controller.makeTreat(() => {
          this.controller.endProcess();
        });
      }
    };
    var compare_right = () => {
      if (this.comparator(node.get_value(), node.get_right().get_value()) > 0) {
        node.get_right().addCursor();
        this.controller.makeTreat(() => {
          node.addCursorSelected();
          node.get_right().addCursorSelected();

          this.controller.makeTreat(() => {
            node.removeCursor();
            node.get_right().addCursor();
            this.swap_value(node, node.get_right());
            this.controller.makeTreat(() => {
              this.heapfy(node.get_right());
            });
          });
        });
      } else {
        node.removeCursor();
        this.controller.makeTreat(() => {
          this.controller.endProcess();
        });
      }
    };
    if (node.hasTwoChild()) {
      if (
        this.comparator(
          node.get_left().get_value(),
          node.get_right().get_value()
        ) > 0
      ) {
        //  the right node is the candidate
        compare_right();
      } else {
        compare_left();
      }
    } else if (node.has_left()) {
      compare_left();
    } else if (node.has_right()) {
      compare_right();
    } else {
      node.removeCursor();
      this.controller.makeTreat(() => {
        this.controller.endProcess();
      });
    }
  }
}
