//(function(){

  function Tree() {
    this.tree_id = Math.floor(Math.random() * 100000);
  }

  Tree.prototype.size = function () {
    if(this instanceof Leaf) return 1;
    return (1 + this.left.size() + this.right.size());
  }

  Tree.prototype.maximum = function() {
    if(this instanceof Leaf) return this.val;
    return Math.max(this.left.maximum(), this.right.maximum());
  }

  Tree.prototype.map = function(f) {
    if(this instanceof Leaf) return new Leaf(f(this.val));
    return new Node(this.left, this.right);
  }

  Tree.prototype.fold = function(initial, combiner) {
    if(this instanceof Leaf) return initial(this.val);
    return combiner(this.left.fold(initial, combiner), this.right.fold(initial, combiner))
  }

  Tree.prototype.maximum_via_fold = function() {
    var initial = function(x) {return(x)};
    var combiner = function(l, r) {return(Math.max(l, r))};
    return this.fold(initial, combiner);
  }

  Tree.prototype.size_via_fold = function() {
    var initial = function() {return(1)};
    var combiner = function(l, r) {return(1+l+r)};
    return this.fold(initial, combiner);
  }

  Tree.prototype.map_via_fold = function(f) {
    var initial = function(x) {return new Leaf(f(x))};
    var combiner = function(l, r) {return new Node(l, r)};
    return this.fold(initial, combiner);
  }

  Tree.prototype.to_array = function() {
    function helper(arr, level, tree) {
     arr[level] === undefined ? arr[level] = [tree] : arr[level].push(tree)
     if(tree instanceof Node) {
       helper(arr, level+1, tree.left)
       helper(arr, level+1, tree.right)
     }
     return arr
    }
    return helper([], 0, this);
  }

  Tree.prototype.log = function() {
    function helper(arr, str) {
      if(arr.length == 0) return(str);
      if(arr.length > 0) {
        var level = arr.shift();
        for(var i=0; i<arr.length; i++) {str = str + "  "}
        for(var i=0; i<level.length; i++) {
          if(level[i] instanceof Leaf) {str = str + level[i].val} else {str = str + "*"};
          str = str + "  ";
        }
        return helper(arr, str + "\n\n")
      }
    }
    console.log(helper(this.to_array(), ""));
  }

  function Leaf(val) {
    Tree.call(this);
    this.val = val;
  }

  function Node(left, right) {
    Tree.call(this);
    this.left = left;
    this.right = right;
  }
  Leaf.prototype = Object.create(Tree.prototype);
  Node.prototype = Object.create(Tree.prototype);


  var tree = new Node(new Leaf(10), new Node(new Leaf(45), new Leaf(15)));


//})();
