
var graphs  = {};

graphs.DirectedGraph = function() {
	this.vertexes = [];
	this.edges = [];
	this.graph = {}; 
};

graphs.DirectedGraph.prototype = {
	addVertex : function(vertex) {
		this.vertexes.push(vertex);
		this.graph[vertex] = [];
	},

	addEdge : function(from, to) {
		this.edges.push(from+to);
		this.graph[from].push(to);
	},

	hasEdgeBetween : function(from, to) {
		return this.edges.indexOf(from+to)!=-1;
	},

	order : function() {
		return this.vertexes.length;
	},

	size : function() {
		return this.edges.length;
	},

	pathBetween : function(from, to, visiting) {
		var visiting = visiting || [];
		if (from == to)
			return visiting.concat(from);

		for(var index in this.graph[from]) {
			var vertex = this.graph[from][index];
			if(visiting.indexOf(vertex)==-1){
				var path = this.pathBetween(vertex, to, visiting.concat(from));
				if(path[path.length-1]==to)
					return path;
			}
		}
		return [];
	},

	hasPathBetween : function(from, to) {
		return this.pathBetween(from,to).length > 1;
	},

	farthestVertex : function(from) {
		var self = this;
		var destinations = this.vertexes.filter(function(vertex){
			if(self.hasPathBetween(from,vertex))return vertex;
		});
		var path = destinations.map(function(vertex){
			return self.pathBetween(from,vertex)
		}).sort(function(a,b){return a.length-b.length});
		var farthestPath = path[path.length-1];
		return farthestPath[farthestPath.length-1];
	}
};

graphs.UndirectedGraph = function() {
	this.vertexes = [];
	this.edges = [];
	this.graph = {}; 
};

graphs.UndirectedGraph.prototype = {
	addVertex : function(vertex) {
		this.vertexes.push(vertex);
		this.graph[vertex] = [];
	},

	addEdge : function(from, to) {
		this.edges.push(from+to);
		this.graph[from].push(to);
		this.graph[to].push(from);

	},

	hasEdgeBetween : function(from, to) {
		return this.edges.indexOf(from+to)!=-1 || this.edges.indexOf(to+from)!=-1;
	},

	order : function() {
		return this.vertexes.length;
	},

	size : function() {
		return this.edges.length;
	},

	pathBetween : function(from, to, visiting) {
		var visiting = visiting || [];
		if (from == to)
			return visiting.concat(from);

		for(var index in this.graph[from]) {
			var vertex = this.graph[from][index];
			if(visiting.indexOf(vertex)==-1){
				var path = this.pathBetween(vertex, to, visiting.concat(from));
				if(path[path.length-1]==to)
					return path;
			}
		}
		return [];
	}
};

module.exports = graphs;