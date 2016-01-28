var graphs  = {};

graphs.WeightedGraph = function() {
       this.graph = {}; 
};

graphs.WeightedGraph.prototype = {
	addVertex : function(vertex) {
		this.graph[vertex] = [];
    },

    addEdge : function(edge) {
        this.graph[edge.from].push(edge);
    },

  allPaths : function(from, to, visiting, paths, weight) {
		paths = paths || [];
		visiting = visiting || [];
    weight = weight || 0;
		if(from == to){
      var path = visiting.concat(from)
      path.weight = weight;
      weight = 0; 
			return paths.push(path);
    }
		for (var i = 0; i < this.graph[from].length; i++) {
			var vertex = this.graph[from][i].to;
			if(visiting.indexOf(vertex) == -1)
				this.allPaths(vertex, to, visiting.concat(from), paths,weight+=this.graph[from][i].weight);
      weight = 0;
		}
		return paths;
	},

  shortestPath_2 : function(from, to) {
    paths = this.allPaths(from, to)
    var weights = [];
    for (var i = 0; i < paths.length; i++) {
      weights.push(paths[i].weight);
    }
    var g = Math.min.apply(Math,weights);
    var s = weights.indexOf(g);
    return paths[s];
  },

  shortestPath : function(from, to) {
    var path = this.allPaths(from,to);
    var path_1=[];
    var path_2=[];
    for (var i = 0; i < path.length; i++) {
      if(this.graph[from][i].to == to)
        path_1.push(this.graph[from][i])
      else{
        path_2.push(this.graph[from][i])
        for (var j = 0; j < this.graph[path[i][i+1]].length; j++) {
          if(this.graph[from][i].to == this.graph[path[i][i+1]][j].from)
            path_2.push(this.graph[path[i][i+1]][j]);
        };
      }
      // if(from != to) return [{}];
    };
    if(path_1.length == 1 && path_2.length ==0) return path_1;
    if(path_1.length == 0) return path_2;
    var path = path_1[0];
    var weight_1 = path_1[0].weight ;
    var weight_2 = 0;
    for (var i = 0; i < path_1.length; i++) {
      if(weight_1 > path_1[i].weight)
        path = path_1[i];
        weight_1 = path_1[i].weight;
    }
    for (var j = 0; j < path_2.length; j++) {
      if(path_2[j].weight)
        weight_2+=path_2[j].weight;
    }
    
    return (path_2.length ==0) ? [path] : (weight_1 < weight_2) ? [path] : path_2;
  }
};


graphs.Edge = function(name, from, to, weight) {
       this.name = name,
       this.from = from,
       this.to = to,
       this.weight = weight
};

module.exports = graphs;