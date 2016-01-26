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

	// allPaths : function(from, to) {
	// 	var self = this;
	// 	var paths = [];
	// 	var keys = Object.keys(this.graph[from]);
	// 	var finalKey = this.graph[from][keys.length-1].to;
	// 	var multiplePath = function(from, to, visiting){
	// 		var visiting = visiting || [];
	// 		if (from == to){
	// 			paths.push(visiting.concat(from));
	// 			if(visiting.indexOf(finalKey))
	// 				return paths;
	// 		}
	// 		for(var index in self.graph[from]) {
	// 		var vertex = self.graph[from][index].to;
	// 		if(visiting.indexOf(vertex)==-1){
	// 			var path = multiplePath(vertex, to, visiting.concat(from));
	// 			if(path[path.length-1]==to)
	// 				return path;
	// 		}
	// 		if(paths.length >1)
	// 			return paths
	// 		}
	// 	return [];
	// 	}
	// 	return multiplePath(from, to)
	// },

	shortestPath : function(from, to) {
		// var path = this.allPaths(from,to);
		
		var paths = this.graph[from].filter(function(each){
			return (each.from == from && each.to == to)
				return each;
		});
		return [paths.sort(function(path1,path2){return path1.weight-path2.weight})[0]];
	}
};


graphs.Edge = function(name, from, to, weight) {
	this.name = name,
	this.from = from,
	this.to = to,
	this.weight = weight
};

module.exports = graphs;