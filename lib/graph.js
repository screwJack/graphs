
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
		this.graph[to].push(from);
	},

	hasEdgeBetween : function(from, to) {
		return this.edges.indexOf(from+to)!=-1;
	},

	order : function() {
		return this.vertexes.length;
	},

	size : function() {
		return this.edges.length;
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