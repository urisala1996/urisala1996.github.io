/**
  @author David Piegza

  Implements a simple graph drawing with force-directed placement in 2D and 3D.

  It uses the force-directed-layout implemented in:
  https://github.com/davidpiegza/Graph-Visualization/blob/master/layouts/force-directed-layout.js

  Drawing is done with Three.js: http://github.com/mrdoob/three.js

  To use this drawing, include the graph-min.js file and create a SimpleGraph object:

  <!DOCTYPE html>
  <html>
    <head>
      <title>Graph Visualization</title>
      <script type="text/javascript" src="path/to/graph-min.js"></script>
    </head>
    <body onload="new Drawing.SimpleGraph({layout: '3d', showStats: true, showInfo: true})">
    </bod>
  </html>

  Parameters:
  options = {
    layout: "2d" or "3d"

    showStats: <bool>, displays FPS box
    showInfo: <bool>, displays some info on the graph and layout
              The info box is created as <div id="graph-info">, it must be
              styled and positioned with CSS.


    selection: <bool>, enables selection of nodes on mouse over (it displays some info
               when the showInfo flag is set)


    limit: <int>, maximum number of nodes

    numNodes: <int> - sets the number of nodes to create.
    numEdges: <int> - sets the maximum number of edges for a node. A node will have
              1 to numEdges edges, this is set randomly.
  }


  Feel free to contribute a new drawing!

 */

var Drawing = Drawing || {};

Drawing.SimpleGraph = function(options) {
  options = options || {};

  this.layout = options.layout || "2d";
  this.layout_options = options.graphLayout || {};
  this.show_stats = options.showStats || false;
  this.show_info = options.showInfo || false;
  this.show_labels = options.showLabels || true;
  this.selection = options.selection || false;
  this.limit = options.limit || 10;
  this.nodes_count = options.numNodes || 20;
  this.edges_count = options.numEdges || 10;

  var colorSelection  = 0x0398fc;
  var colorRelatives  = 0x7ea5f7;
  var colorBase       = 0xcccccc;

  var camera, controls, scene, renderer, interaction, geometry, object_selection;
  var stats;
  var info_text = {};
  var graph = new GRAPHVIS.Graph({limit: options.limit});

  var geometries = [];

  var that=this;

  init();
  createGraph();
  animate();

  function init() {
    // Three.js initialization
    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);


    camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 1, 1000000);
    camera.position.z = 10000;

    controls = new THREE.TrackballControls(camera);

    controls.rotateSpeed = 0.7;
    controls.zoomSpeed = 4;
    controls.panSpeed = 5;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.7;

    controls.keys = [ 65, 83, 68 ];

    controls.addEventListener('change', render);

    scene = new THREE.Scene();

    // Node geometry
    if(that.layout === "3d") {
      geometry = new THREE.CircleGeometry(120,20);
    } else {
      geometry = new THREE.BoxGeometry( 50, 50, 0 );
    }

    // Create node selection, if set
    if(that.selection) {
      object_selection = new THREE.ObjectSelection({
        domElement: renderer.domElement,
        selected: function(obj) {
          // display info
          if(obj !== null) {
            info_text.select = "Object " + obj.name;
          } else {
            delete info_text.select;
          }
        },
        clicked: function(obj) {
          console.log("Clicked: " + obj.name);
          obj.material.color.set( 0xff00ff );
          showRelatives(obj.name);

        }
      });
    }

    document.body.appendChild( renderer.domElement );

    // Stats.js
    if(that.show_stats) {
      stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.top = '0px';
      document.body.appendChild( stats.domElement );
    }

    // Create info box
    if(that.show_info) {
      var info = document.createElement("div");
      var id_attr = document.createAttribute("id");
      id_attr.nodeValue = "graph-info";
      info.setAttributeNode(id_attr);
      document.body.appendChild( info );
    }
  }


  /**
   *  Creates a graph with random nodes and edges.
   *  Number of nodes and edges can be set with
   *  numNodes and numEdges.
   */
  function createGraph() {

    var node0   = new GRAPHVIS.Node(0);
    var node1   = new GRAPHVIS.Node(1);
    var node2   = new GRAPHVIS.Node(2);
    var node3   = new GRAPHVIS.Node(3);
    var node4   = new GRAPHVIS.Node(4);
    var node5   = new GRAPHVIS.Node(5);
    var node6   = new GRAPHVIS.Node(6);
    var node7   = new GRAPHVIS.Node(7);
    var node8   = new GRAPHVIS.Node(8);
    var node9   = new GRAPHVIS.Node(9);
    var node10  = new GRAPHVIS.Node(10);
    var node11  = new GRAPHVIS.Node(11);
    var node12  = new GRAPHVIS.Node(12);
    var node13  = new GRAPHVIS.Node(13);
    var node14  = new GRAPHVIS.Node(14);
    var node15  = new GRAPHVIS.Node(15);
    var node16  = new GRAPHVIS.Node(16);
    var node17  = new GRAPHVIS.Node(17);
    var node18  = new GRAPHVIS.Node(18);
    var node19  = new GRAPHVIS.Node(19);
    var node20  = new GRAPHVIS.Node(20);
    var node21  = new GRAPHVIS.Node(21);

    /* Authors info */
    /* The ObjectID (for rendering) starts and OFFSET=8 + NodeID*/
    node0.data.name       = "SALVADOR DALÍ";
    node0.data.yearBorn   = 1904;
    node0.data.yearDeath  = 1989;
    node0.data.childs     = 0;
    node0.data.otherInfo  = 0;

    node1.data.name       = "ANDY WARHOL";
    node1.data.yearBorn   = 1928;
    node1.data.yearDeath  = 1987;
    node1.data.childs     = 0;
    node1.data.otherInfo  = 0;

    node2.data.name       = "ROBERT MAPPLETHORPE";
    node2.data.yearBorn   = 1946;
    node2.data.yearDeath  = 1989;
    node2.data.childs     = 0;
    node2.data.otherInfo  = 0;

    node3.data.name       = "MIQUEL BARCELÓ";
    node3.data.yearBorn   = 1957;
    node3.data.yearDeath  = 0;
    node3.data.childs     = "Marcela i Joaquim";
    node3.data.otherInfo  = "Mare artista";

    node4.data.name       = "RICHARD AVEDON";
    node4.data.yearBorn   = 1928;
    node4.data.yearDeath  = 1987;
    node4.data.childs     = "1 Fill";
    node4.data.otherInfo  = 0;

    node5.data.name       = "ANTONIO SAURA";
    node5.data.yearBorn   = 1930;
    node5.data.yearDeath  = 1998;
    node5.data.childs     = "María, Ana i Elena";
    node5.data.otherInfo  = 0;

    node6.data.name       = "ALIGHIERO BOETTI";
    node6.data.yearBorn   = 1940;
    node6.data.yearDeath  = 1994;
    node6.data.childs     = "Matteo, Agata i Giordano";
    node6.data.otherInfo  = 0;

    node7.data.name       = "EDUARDO ARROYO";
    node7.data.yearBorn   = 1937;
    node7.data.yearDeath  = 2018;
    node7.data.childs     = "Pimpi";
    node7.data.otherInfo  = 0;

    node8.data.name       = "MANUEL MILLARES";
    node8.data.yearBorn   = 1926;
    node8.data.yearDeath  = 1972;
    node8.data.childs     = "Eva";
    node8.data.otherInfo  = 0;

    node9.data.name       = "LUCIO FONTANA";
    node9.data.yearBorn   = 1899;
    node9.data.yearDeath  = 1968;
    node9.data.childs     = 0;
    node9.data.otherInfo  = "Pare artista";

    node10.data.name       = "PABLO PALAZUELO";
    node10.data.yearBorn   = 1916;
    node10.data.yearDeath  = 2007;
    node10.data.childs     = 0;
    node10.data.otherInfo  = 0;

    node11.data.name       = "ANTONI TÀPIES";
    node11.data.yearBorn   = 1923;
    node11.data.yearDeath  = 2012;
    node11.data.childs     = "Antoni, Clara i Miquel Àngel";
    node11.data.otherInfo  = 0;

    node12.data.name       = "EDUARDO CHILLIDA";
    node12.data.yearBorn   = 1924;
    node12.data.yearDeath  = 2002;
    node12.data.childs     = "Guiomar, Pedro, Iñaki, Karmentxina, Susana, María, Luis i Eduardo";
    node12.data.otherInfo  = "Pare i mare artistes frustrats";

    node13.data.name       = "ALEXANDER CALDER";
    node13.data.yearBorn   = 1898;
    node13.data.yearDeath  = 1976;
    node13.data.childs     = "Mary i Sandra";
    node13.data.otherInfo  = "Pare, mare i avi aristes";

    node14.data.name       = "JOAN MIRÓ";
    node14.data.yearBorn   = 1893;
    node14.data.yearDeath  = 1983;
    node14.data.childs     = "Maria Dolors";
    node14.data.otherInfo  = 0;

    node15.data.name       = "MAN RAY";
    node15.data.yearBorn   = 1890;
    node15.data.yearDeath  = 1976;
    node15.data.childs     = 0;
    node15.data.otherInfo  = 0;

    node16.data.name       = "JEAN ARP";
    node16.data.yearBorn   = 1897;
    node16.data.yearDeath  = 1966;
    node16.data.childs     = 0;
    node16.data.otherInfo  = 0;

    node17.data.name       = "GIACOMO BALLA";
    node17.data.yearBorn   = 1871;
    node17.data.yearDeath  = 1958;
    node17.data.childs     = 0;
    node17.data.otherInfo  = "Pare artista";

    node18.data.name       = "CHRISTO";
    node18.data.yearBorn   = 1935;
    node18.data.yearDeath  = 2020;
    node18.data.childs     = "Cyril";
    node18.data.otherInfo  = 0;

    node19.data.name       = "EQUIPO CRÓNICA";
    node19.data.yearBorn   = 0;
    node19.data.yearDeath  = 0;
    node19.data.childs     = 0;
    node19.data.otherInfo  = 0;

    node20.data.name       = "MANOLO VALDÉS";
    node20.data.yearBorn   = 1942;
    node20.data.yearDeath  = 0;
    node20.data.childs     = 0;
    node20.data.otherInfo  = 0;

    node21.data.name       = "RAFAEL SOLBES";
    node21.data.yearBorn   = 1940;
    node21.data.yearDeath  = 1981;
    node21.data.childs     = 0;
    node21.data.otherInfo  = 0;

    graph.addNode(node0);
    graph.addNode(node1);
    graph.addNode(node2);
    graph.addNode(node3);
    graph.addNode(node4);
    graph.addNode(node5);
    graph.addNode(node6);
    graph.addNode(node7);
    graph.addNode(node8);
    graph.addNode(node9);
    graph.addNode(node10);
    graph.addNode(node11);
    graph.addNode(node12);
    graph.addNode(node13);
    graph.addNode(node14);
    graph.addNode(node15);
    graph.addNode(node16);
    graph.addNode(node17);
    graph.addNode(node18);
    graph.addNode(node19);
    graph.addNode(node20);
    graph.addNode(node21);

    /* Friendship connections */
    graph.addEdge(node0,node1);
    graph.addEdge(node0,node11);
    graph.addEdge(node0,node14);
    graph.addEdge(node0,node15);
    graph.addEdge(node0,node16);

    graph.addEdge(node1,node3);
    graph.addEdge(node1,node2);
    graph.addEdge(node1,node0);

    graph.addEdge(node2,node1);

    graph.addEdge(node3,node9);
    graph.addEdge(node3,node11);
    graph.addEdge(node3,node14);
    graph.addEdge(node3,node1);

    /* Invisible connections */
    graph.addEdge(node4,node5);
    graph.addEdge(node4,node2);
    graph.addEdge(node4,node1);

    graph.addEdge(node5,node19);
    graph.addEdge(node5,node11);
    graph.addEdge(node5,node18);
    graph.addEdge(node5,node7);

    graph.addEdge(node6,node9);

    graph.addEdge(node7,node5);
    graph.addEdge(node7,node19);
    graph.addEdge(node7,node0);
    graph.addEdge(node7,node14);

    graph.addEdge(node8,node5);
    graph.addEdge(node8,node14);

    graph.addEdge(node9,node6);
    graph.addEdge(node9,node3);
    graph.addEdge(node9,node14);

    graph.addEdge(node10,node12);
    graph.addEdge(node10,node14);

    graph.addEdge(node11,node3);
    graph.addEdge(node11,node5);
    graph.addEdge(node11,node14);
    graph.addEdge(node11,node19);
    graph.addEdge(node11,node0);

    graph.addEdge(node12,node13);
    graph.addEdge(node12,node14);
    graph.addEdge(node12,node10);

    graph.addEdge(node13,node15);
    graph.addEdge(node13,node12);
    graph.addEdge(node13,node16);
    graph.addEdge(node13,node14);

    graph.addEdge(node14,node3);
    graph.addEdge(node14,node12);
    graph.addEdge(node14,node13);
    graph.addEdge(node14,node15);
    graph.addEdge(node14,node16);
    graph.addEdge(node14,node9);
    graph.addEdge(node14,node8);
    graph.addEdge(node14,node0);
    graph.addEdge(node14,node10);
    graph.addEdge(node14,node7);
    graph.addEdge(node14,node11);

    graph.addEdge(node15,node13);
    graph.addEdge(node15,node14);
    graph.addEdge(node15,node0);

    graph.addEdge(node16,node13);
    graph.addEdge(node16,node14);
    graph.addEdge(node16,node0);

    /* Invisible connections */
    graph.addEdge(node17,node16);
    graph.addEdge(node17,node9);
    /* Invisible connections */
    graph.addEdge(node18,node12);
    graph.addEdge(node18,node19);

    /*Equipo cronica connections*/
    graph.addEdge(node19,node20);
    graph.addEdge(node19,node21);
    graph.addEdge(node19,node11);
    graph.addEdge(node19,node5);
    graph.addEdge(node19,node7);

    /* Draw Nodes */
    drawNode(node0,0);
    drawNode(node1,0);
    drawNode(node2,0);
    drawNode(node3,0);
    drawNode(node4,1); //Invisible
    drawNode(node5,0);
    drawNode(node6,0);
    drawNode(node7,0);
    drawNode(node8,0);
    drawNode(node9,0);
    drawNode(node10,0);
    drawNode(node11,0);
    drawNode(node12,0);
    drawNode(node13,0);
    drawNode(node14,0);
    drawNode(node15,0);
    drawNode(node16,0);
    drawNode(node17,1); //Invisible
    drawNode(node18,1); //Invisible
    drawNode(node19,0);
    drawNode(node20,0);
    drawNode(node21,0);

    /* Draw Edges*/
    drawEdge(node0,node1,0);
    drawEdge(node0,node11,0);
    drawEdge(node0,node14,0);
    drawEdge(node0,node15,0);
    drawEdge(node0,node16,0);

    drawEdge(node11,node3,0);
    drawEdge(node11,node5,0);
    drawEdge(node11,node14,0);
    drawEdge(node11,node19,0);

    drawEdge(node7,node5,0);
    drawEdge(node7,node19,0);

    drawEdge(node8,node5,0);
    drawEdge(node8,node14,0);

    drawEdge(node10,node12,0);
    drawEdge(node10,node14,0);

    drawEdge(node14,node3,0);
    drawEdge(node14,node12,0);
    drawEdge(node14,node13,0);
    drawEdge(node14,node15,0);
    drawEdge(node14,node16,0);

    drawEdge(node13,node15,0);
    drawEdge(node13,node16,0);
    drawEdge(node13,node12,0);

    drawEdge(node1,node3,0);
    drawEdge(node1,node2,0);

    drawEdge(node5,node19,0);

    drawEdge(node6,node9,1);
    drawEdge(node3,node9,1);

    drawEdge(node14,node9,1);

    drawEdge(node7,node0,1);
    drawEdge(node7,node14,1);

    drawEdge(node17,node16,2);
    drawEdge(node17,node9,2);

    drawEdge(node18,node12,2);
    drawEdge(node18,node19,2);

    drawEdge(node4,node5,2);
    drawEdge(node4,node2,2);
    drawEdge(node4,node1,2);

    drawEdge(node19,node20,3);
    drawEdge(node19,node21,3);

    that.layout_options.width = that.layout_options.width || 2000;
    that.layout_options.height = that.layout_options.height || 2000;
    that.layout_options.iterations = that.layout_options.iterations || 100000;
    that.layout_options.layout = that.layout_options.layout || that.layout;
    graph.layout = new Layout.ForceDirected(graph, that.layout_options);
    graph.layout.init();
    info_text.nodes = "Nodes " + graph.nodes.length;
    info_text.edges = "Edges " + graph.edges.length;
  }


  /**
   *  Create a node object and add it to the scene.
   */
  function drawNode(node,isInvisible) {
    var draw_object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( {  color: colorBase } ) );
    var label_object;

    var area = 5000;
    draw_object.position.x = Math.floor(Math.random() * (area + area + 1) - area);
    draw_object.position.y = Math.floor(Math.random() * (area + area + 1) - area);

    if(that.layout === "3d") {
      draw_object.position.z = Math.floor(Math.random() * (area + area + 1) - area);
    }

    draw_object.name = node.id;
    node.data.draw_object = draw_object;
    node.position = draw_object.position;
    if(isInvisible){
      node.data.isInvisible = true;
    }
    scene.add( node.data.draw_object );
  }


  /**
   *  Create an edge object (line) and add it to the scene.
   */
  function drawEdge(source, target, type) {

    var tmp_geo = new THREE.Geometry();
    tmp_geo.vertices.push(source.data.draw_object.position);
    tmp_geo.vertices.push(target.data.draw_object.position);


    switch (type) {
      case 0:
        /*Friendship connections*/
        material = new THREE.LineBasicMaterial({ color: 0x606060, linewidth: 1 });
        line = new THREE.LineSegments( tmp_geo, material );
        line.scale.x = line.scale.y = line.scale.z = 1;
        line.originalScale = 1;
      break;

      case 1:
        /*Work connections*/
        material = new THREE.LineBasicMaterial({ color: 0x2d46ab, linewidth: 1 });
        line = new THREE.LineSegments( tmp_geo, material );
        line.scale.x = line.scale.y = line.scale.z = 1;
        line.originalScale = 1;
        //line.computeLineDistances();
        //line.scale.x = line.scale.y = line.scale.z = 1;
        //line.originalScale = 1;

      break;

      case 2:
        /*Invisible connections*/
        material = new THREE.LineBasicMaterial({ color: 0xffffff , opacity:0.01, transparent:true});
        line = new THREE.LineSegments( tmp_geo, material );
        line.renderOrder = 1;
        line.scale.x = line.scale.y = line.scale.z = 1;
        line.originalScale = 1;
      break;

      case 3:
        /*Equipo cronica connections*/
        material = new THREE.LineBasicMaterial({ color: 0x606060 });
        line = new THREE.LineSegments( tmp_geo, material );
        line.scale.x = line.scale.y = line.scale.z = 1;
        line.originalScale = 1;
      break;

    }

      // NOTE: Deactivated frustumCulled, otherwise it will not draw all lines (even though
      // it looks like the lines are in the view frustum).
      line.frustumCulled = false;

      geometries.push(tmp_geo);

      scene.add( line );
  }

  function showRelatives(objName){
    var selectedNode;
    var sceneObject;

    //Reset the color of the last Relative Nodes
    for(i=0; i<graph.nodes.length; i++) {
      node_object = graph.nodes[i].data.draw_object;
      node_object.material.color.setHex(colorBase);
    }

    //Get the selected Node
    selectedNode = graph.getNode(objName);

    //Change color of the connected nodes and itself
    selectedNode.data.draw_object.material.color.setHex(colorSelection);

    if(selectedNode.data.isInvisible == null){

      for(i=0; i<selectedNode.nodesTo.length; i++) {
        //console.log(selectedNode.nodesTo[i].data.name);
        sceneObject = selectedNode.nodesTo[i].data.draw_object;
        sceneObject.material.color.setHex(colorRelatives);
      }

    }

  }


  function animate() {
    requestAnimationFrame( animate );
    controls.update();
    render();
    if(that.show_info) {
      printInfo();
    }
  }


  function render() {
    var i, length, node;

    // Generate layout if not finished
    if(!graph.layout.finished) {
      info_text.calc = "<span style='color: red'>Calculating layout...</span>";
      graph.layout.generate();
    } else {
      info_text.calc = "";
    }

    // Update position of lines (edges)
    for(i=0; i<geometries.length; i++) {
      geometries[i].verticesNeedUpdate = true;
    }

    // Show labels if set
    // It creates the labels when this options is set during visualization
    if(that.show_labels) {
      length = graph.nodes.length;
      for(i=0; i<length; i++) {
        node = graph.nodes[i];
        if(node.data.label_object !== undefined) {
          node.data.label_object.position.x = node.data.draw_object.position.x;
          node.data.label_object.position.y = node.data.draw_object.position.y - 100;
          node.data.label_object.position.z = node.data.draw_object.position.z;
          node.data.label_object.lookAt(camera.position);
          node.data.draw_object.lookAt(camera.position);

        } else {
          var label_object;
          if(node.data.name !== undefined){
            label_object = new THREE.AuthorInfo(node.data.name,node.data.yearBorn,node.data.yearDeath,node.data.childs,node.data.otherInfo, node.data.draw_object);
            node.data.label_object = label_object;
          }

          scene.add( node.data.label_object );
        }
      }
    }

    // render selection
    if(that.selection) {
      object_selection.render(scene, camera);
    }

    // update stats
    if(that.show_stats) {
      stats.update();
    }

    // render scene
    renderer.render( scene, camera );
  }

  /**
   *  Prints info from the attribute info_text.
   */
  function printInfo(text) {
    var str = '';
    for(var index in info_text) {
      if(str !== '' && info_text[index] !== '') {
        str += " - ";
      }
      str += info_text[index];
    }
    document.getElementById("graph-info").innerHTML = str;
  }

  // Generate random number
  function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  // Stop layout calculation
  this.stop_calculating = function() {
    graph.layout.stop_calculating();
  };
};
