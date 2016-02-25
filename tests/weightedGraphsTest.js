var graphs=require('../lib/weightedGraph');
var assert=require('chai').assert;
var ld=require('lodash');


var denseGraph=function() {
	var g=new graphs.WeightedGraph();
	var vertices=['A','B','C','D','E','F','G','H','I','J','K','L','M'];

	vertices.forEach(function(vertex){
		g.addVertex(vertex);
	});

	for (var i = 0; i < vertices.length-1; i++) {
		var from=vertices[i];
		for (var j = i+1; j < vertices.length; j++) {
			var edge = new graphs.Edge('e1',vertices[i],vertices[j], Math.round(Math.random()*10) || 4);
			g.addEdge(edge);
		}
	}
	return g;
}



describe("shortest path",function(){
	it("should choose the only path when only one path exists",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');

		var e1=new graphs.Edge("e1",'A','B',1);
		g.addEdge(e1);

		var path=g.shortestPath('A','B');
		assert.equal(1,path.length);
		assert.deepEqual(e1,path[0]);
	});

	it("seree1hould choose the only path when only one path exists",function(){
		var g=denseGraph();
		var path=g.shortestPath_2('A','R');
		console.log(path)
	});


	it("should choose the path with least weight when more than one path exists",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');
		g.addVertex('C');

		var e1=new graphs.Edge("e1",'A','B',1);
		var e2=new graphs.Edge("e2",'B','C',1);
		var e3=new graphs.Edge("e3",'A','C',1);
		g.addEdge(e1);
		g.addEdge(e2);
		g.addEdge(e3);

		var path=g.shortestPath('A','C');
		assert.equal(1,path.length);
		assert.deepEqual(e3,path[0]);
	});

	it("should choose the path with least weight when more than one path exists even if the path has more vertices",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');
		g.addVertex('C');

		var e1=new graphs.Edge("e1",'A','B',1);
		var e2=new graphs.Edge("e2",'B','C',1);
		var e3=new graphs.Edge("e3",'A','C',3);
		g.addEdge(e1);
		g.addEdge(e2);
		g.addEdge(e3);

		var path=g.shortestPath('A','C');
		assert.equal(2,path.length);
		assert.deepEqual(e1,path[0]);
		assert.deepEqual(e2,path[1]);
	});

	it("should choose the path with least weight when multiple edges exist between two vertices",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');

		var e1=new graphs.Edge("e1",'A','B',1);
		var e2=new graphs.Edge("e2",'A','B',2);
		g.addEdge(e1);
		g.addEdge(e2);

		var path=g.shortestPath('A','B');
		assert.equal(1,path.length);
		assert.deepEqual(e1,path[0]);
	});

});
