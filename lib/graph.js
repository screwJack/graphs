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
	},

	hasEdgeBetween : function(from, to) {
		return this.edges.indexOf(from+to)!=-1 || this.edges.indexOf(to+from)!=-1;
	},

	order : function() {
		return this.vertexes.length;
	},

	size : function() {
		return this.edges.length;
	}
};

module.exports = graphs;