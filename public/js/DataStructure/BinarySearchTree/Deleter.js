class Deleter {
  constructor() 
  {
       
  }
  delete(tree,value) {
        console.log(tree.root)
        if (tree.noRoot()) 
                return tree.printLastTree();
        if (tree.root.has_value(value)) 
                tree.toggle_select(tree.root, ()=> this.deleteRoot(tree));
        else 
                this.propagate_delete(tree,tree.root,value);
  }

  deleteRoot(tree){
        if (tree.root.hasTwoChild()) 
                  this.delete_Node_With_Two_Child(tree,tree.root);
        else if (tree.root.has_left()) 
                  tree.toggle_select(tree.root.get_left(), ()=> this.delete_root_and_swap_left(tree) );
        else if (tree.root.has_right()) 
                  tree.toggle_select(tree.root.get_right(),()=> this.delete_root_and_swap_right(tree) );
        else 
                  this.make_root_null(tree);
  }

  delete_root_and_swap_left(tree){
        tree.root = tree.root.get_left();
        tree.root.removeCursor();
        tree.printLastTree();
  }
  delete_root_and_swap_right(tree) {
        tree.root = tree.root.get_right();
        tree.root.removeCursor();
        tree.printLastTree();
  }
  make_root_null(tree){
        tree.root = new NullNode();
        tree.printLastTree();
  }


  propagate_delete(tree,node ,deleted_value ) {
        if (tree.out_of_tree(node)) 
                  return tree.printLastTree();
                  
        tree.toggle(node, () => 
        {
                  node.removeCursor();
                  this.deltermine_direction_then_move(tree,node,deleted_value);
        });

  }
  deltermine_direction_then_move(tree, node , deleted_value){
        if (node.ShouldGoRight(deleted_value)) 
        {
                  if (node.get_right().has_value(deleted_value)) 
                          tree.toggle_select(node.get_right() , ()=>  this.deleteRight(tree,node) ) ;
                  else 
                          this.propagate_delete(tree,node.get_right(),deleted_value);
        } else 
        {
                  if (node.get_left().has_value(deleted_value))
                          tree.toggle_select(node.get_left() , ()=>  this.deleteLeft(tree,node) ) ;
                  else 
                          this.propagate_delete(tree,node.get_left(),deleted_value);
        }
  }

  deleteLeft(tree,parent_node){
        var deleted_node = parent_node.get_left();
        if(deleted_node.hasTwoChild())
                  return this.delete_Node_With_Two_Child(tree,deleted_node);
        if(deleted_node.has_left())
        {
                  return tree.toggle_select(deleted_node.get_left(),()=>
                  {
                            deleted_node.get_left().removeCursor();
                            deleted_node.removeCursor();
                            parent_node.set_left(deleted_node.get_left());
                            tree.printLastTree();
                  });
        }else if (deleted_node.has_right())
        {
                  return tree.toggle_select(deleted_node.get_right(),()=>
                  {
                            deleted_node.get_right().removeCursor();
                            deleted_node.removeCursor();
                            parent_node.set_left(deleted_node.get_right());
                            tree.printLastTree();
                  });
        }else
        {
                  parent_node.set_left(new NullNode());
                  tree.printLastTree();
        }
          
}

deleteRight(tree,parent_node){
        var deleted_node = parent_node.get_right();
        if(deleted_node.hasTwoChild())
                    return this.delete_Node_With_Two_Child(tree,deleted_node);
        if(deleted_node.has_left())
        {
                    return tree.toggle_select(deleted_node.get_left(),()=>
                    {
                              deleted_node.get_left().removeCursor();
                              deleted_node.removeCursor();
                              parent_node.set_right(deleted_node.get_left());
                              tree.printLastTree();
                    });
        }else if (deleted_node.has_right())
        {
                    return tree.toggle_select(deleted_node.get_right(),()=>
                    {
                              deleted_node.get_right().removeCursor();
                              deleted_node.removeCursor();
                              parent_node.set_right(deleted_node.get_right());
                              tree.printLastTree();
                    });
        }else
        {
                    parent_node.set_right(new NullNode());
                    tree.printLastTree();
        }
        
}

  delete_Node_With_Two_Child(tree,deleted_node) {
        var Right = deleted_node.get_right();
        if (!Right.has_left())
                  tree.toggle_select(Right, () =>  this.delete_node_and_swap_with_right(tree,deleted_node));
        else {
                  tree.toggle(Right, () => 
                  {
                    Right.removeCursor();
                    this.getParentMostLeft(tree,Right, (parentLeftMost) =>   this.delete_node_and_swap_with_left_most_node(tree,deleted_node,parentLeftMost));
                  });
        }
  }
  delete_node_and_swap_with_right(tree,deleted_node) {
        var Right = deleted_node.get_right();
        deleted_node.set_value(Right.get_value());
        deleted_node.set_right(Right.get_right());
        deleted_node.removeCursor();
        tree.printLastTree();
  }
  delete_node_and_swap_with_left_most_node(tree,deleted_node ,parent_of_left_most ){
        var left_most = parent_of_left_most.get_left();
        deleted_node.removeCursor();
        deleted_node.set_value(left_most.get_value());
        parent_of_left_most.set_left(left_most.get_right());
        tree.printLastTree();
  }

  
  getParentMostLeft(tree,node, callback) {
        if (node.get_left().has_left()) 
        {
                  tree.toggle(node.get_left(), () => {
                    node.get_left().removeCursor();
                    this.getParentMostLeft(tree,node.get_left(), callback);
                  });
        } else 
          
                  tree.toggle_select(node.get_left(), () => { node.get_left().removeCursor(); callback(node);});
      }
}
