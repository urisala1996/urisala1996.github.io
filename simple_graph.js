
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
  var colorRelatives  = 0xb5ccff;
  var colorBase       = 0xcccccc;
  var colorEdge       = 0x595959;

  var green           = 0x61CF63;
  var red             = 0xF54545;
  var orange          = 0xF7AB28;
  var purple          = 0xCB6AF7;
  var yellow          = 0xFFEE36;

  var circleRadius    = 130;

  var camera, controls, scene, renderer, interaction, geometry, object_selection, resolution;
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

    resolution = new THREE.Vector2(window.innerWidth,window.innerHeight);
    //controls = new THREE.TrackballControls(camera);
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.maxPolarAngle = 2.76632;
    controls.minPolarAngle = 1.7;

    controls.autoRotate = true;
    controls.rotateSpeed = 0.2;

    controls.enableZoom = true;
    controls.maxDistance = 8000;
    controls.minDistance = 5;

    controls.dynamicDampingFactor = 0.7;

    controls.keys = [ 65, 83, 68 ];

    controls.addEventListener('change', render);

    scene = new THREE.Scene();



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
          var node = graph.getNode(obj.name);
          console.log(obj.name);
          //console.log(node.data.name + ": " + node.position.x + "," + node.position.y + "," + node.position.z);
          //obj.material.color.set( 0xff00ff );
          controls.autoRotate = false;
          showRelatives(obj.name);
          updateAuthorInfo(obj.name);

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
    node0.position.x      = 803.898;
    node0.position.y      = 40.167;
    node0.position.z      = 155.77;

    node1.data.name       = "ANDY WARHOL";
    node1.data.yearBorn   = 1928;
    node1.data.yearDeath  = 1987;
    node1.data.childs     = 0;
    node1.data.otherInfo  = 0;
    node1.position.x      = 12.2;
    node1.position.y      = 469.19;
    node1.position.z      = 627.93;

    node2.data.name       = "ROBERT MAPPLETHORPE";
    node2.data.yearBorn   = 1946;
    node2.data.yearDeath  = 1989;
    node2.data.childs     = 0;
    node2.data.otherInfo  = 0;
    node2.position.x      = -484.43;
    node2.position.y      = 959.18;
    node2.position.z      = 1174.03;

    node3.data.name       = "MIQUEL BARCELÓ";
    node3.data.yearBorn   = 1957;
    node3.data.yearDeath  = 0;
    node3.data.childs     = "Marcela i Joaquim";
    node3.data.otherInfo  = "Mare artista";
    node3.position.x      = 271.717;
    node3.position.y      = -71.308;
    node3.position.z      = -68.04;

    node4.data.name       = "RICHARD AVEDON";
    node4.data.yearBorn   = 1928;
    node4.data.yearDeath  = 1987;
    node4.data.childs     = "1 Fill";
    node4.data.otherInfo  = 0;
    node4.position.x      =
    node4.position.y      =
    node4.position.z      =

    node5.data.name       = "ANTONIO SAURA";
    node5.data.yearBorn   = 1930;
    node5.data.yearDeath  = 1998;
    node5.data.childs     = "María, Ana i Elena";
    node5.data.otherInfo  = 0;
    node5.position.x      = 29.65;
    node5.position.y      = 1395.15;
    node5.position.z      = 688.24;

    node6.data.name       = "ALIGHIERO BOETTI";
    node6.data.yearBorn   = 1940;
    node6.data.yearDeath  = 1994;
    node6.data.childs     = "Matteo, Agata i Giordano";
    node6.data.otherInfo  = 0;
    node6.position.x      = -372.66;
    node6.position.y      = -1684.54;
    node6.position.z      = -454.41;

    node7.data.name       = "EDUARDO ARROYO";
    node7.data.yearBorn   = 1937;
    node7.data.yearDeath  = 2018;
    node7.data.childs     = "Pimpi";
    node7.data.otherInfo  = 0;
    node7.position.x      = 1036;
    node7.position.y      = 807.45;
    node7.position.z      = -558.226;

    node8.data.name       = "MANUEL MILLARES";
    node8.data.yearBorn   = 1926;
    node8.data.yearDeath  = 1972;
    node8.data.childs     = "Eva";
    node8.data.otherInfo  = 0;
    node8.position.x      = 1584.53;
    node8.position.y      = 625.85;
    node8.position.z      = -7.921;

    node9.data.name       = "LUCIO FONTANA";
    node9.data.yearBorn   = 1899;
    node9.data.yearDeath  = 1968;
    node9.data.childs     = 0;
    node9.data.otherInfo  = "Pare artista";
    node9.position.x      = 256.72;
    node9.position.y      = -968.91;
    node9.position.z      = -285.14;

    node10.data.name       = "PABLO PALAZUELO";
    node10.data.yearBorn   = 1916;
    node10.data.yearDeath  = 2007;
    node10.data.childs     = 0;
    node10.data.otherInfo  = 0;
    node10.position.x      = 1669.95;
    node10.position.y      = -531.577;
    node10.position.z      = -1053.35;

    node11.data.name       = "ANTONI TÀPIES";
    node11.data.yearBorn   = 1923;
    node11.data.yearDeath  = 2012;
    node11.data.childs     = "Antoni, Clara i Miquel Àngel";
    node11.data.otherInfo  = 0;
    node11.position.x      = 705.88;
    node11.position.y      = 645.087;
    node11.position.z      = -345.177;

    node12.data.name       = "EDUARDO CHILLIDA";
    node12.data.yearBorn   = 1924;
    node12.data.yearDeath  = 2002;
    node12.data.childs     = "Guiomar, Pedro, Iñaki, Karmentxina, Susana, María, Luis i Eduardo";
    node12.data.otherInfo  = "Pare i mare artistes frustrats";
    node12.position.x      = 1816.20;
    node12.position.y      = -86.06;
    node12.position.z      = -784.397;

    node13.data.name       = "ALEXANDER CALDER";
    node13.data.yearBorn   = 1898;
    node13.data.yearDeath  = 1976;
    node13.data.childs     = "Mary i Sandra";
    node13.data.otherInfo  = "Pare, mare i avi aristes";
    node13.position.x      = 1661.47;
    node13.position.y      = -621.39;
    node13.position.z      = -247.71;

    node14.data.name       = "JOAN MIRÓ";
    node14.data.yearBorn   = 1893;
    node14.data.yearDeath  = 1983;
    node14.data.childs     = "Maria Dolors";
    node14.data.otherInfo  = 0;
    node14.position.x      = 1104.95;
    node14.position.y      = -154.78;
    node14.position.z      = -331.42;

    node15.data.name       = "MAN RAY";
    node15.data.yearBorn   = 1890;
    node15.data.yearDeath  = 1976;
    node15.data.childs     = 0;
    node15.data.otherInfo  = 0;
    node15.position.x      = 1440.21;
    node15.position.y      = -399.70;
    node15.position.z      = 263.22;

    node16.data.name       = "JEAN ARP";
    node16.data.yearBorn   = 1897;
    node16.data.yearDeath  = 1966;
    node16.data.childs     = 0;
    node16.data.otherInfo  = 0;
    node16.position.x      = 1059.58;
    node16.position.y      = -838.75;
    node16.position.z      = 12.48;

    node17.data.name       = "GIACOMO BALLA";
    node17.data.yearBorn   = 1871;
    node17.data.yearDeath  = 1958;
    node17.data.childs     = 0;
    node17.data.otherInfo  = "Pare artista";
    node17.position.x      = 600.14;
    node17.position.y      = -1831.31;
    node17.position.z      = 49.676;

    node18.data.name       = "CHRISTO";
    node18.data.yearBorn   = 1935;
    node18.data.yearDeath  = 2020;
    node18.data.childs     = "Cyril";
    node18.data.otherInfo  = 0;
    node18.position.x      = 1731.66;
    node18.position.y      = 1141.599;
    node18.position.z      = -989.499;

    node19.data.name       = "EQUIPO CRÓNICA";
    node19.data.yearBorn   = 0;
    node19.data.yearDeath  = 0;
    node19.data.childs     = 0;
    node19.data.otherInfo  = 0;
    node19.position.x      = 986.35;
    node19.position.y      = 1608.49;
    node19.position.z      = -868.323;

    node20.data.name       = "MANOLO VALDÉS";
    node20.data.yearBorn   = 1942;
    node20.data.yearDeath  = 0;
    node20.data.childs     = 0;
    node20.data.otherInfo  = 0;
    node20.position.x      = 722.76;
    node20.position.y      = 2525.897;
    node20.position.z      = -1729.134;

    node21.data.name       = "RAFAEL SOLBES";
    node21.data.yearBorn   = 1940;
    node21.data.yearDeath  = 1981;
    node21.data.childs     = 0;
    node21.data.otherInfo  = 0;
    node21.position.x      = 1277.69;
    node21.position.y      = 2837.516;
    node21.position.z      = -1143.642;

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



    //while(!graph.layout.finished);

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

    drawEdge(node6,node9,2);
    drawEdge(node3,node9,2);

    drawEdge(node14,node9,2);

    drawEdge(node7,node0,1);
    drawEdge(node7,node14,1);

    //drawEdge(node17,node16,2);
    //drawEdge(node17,node9,2);

    //drawEdge(node18,node12,2);
    //drawEdge(node18,node19,2);

    //drawEdge(node4,node5,2);
    //drawEdge(node4,node2,2);
    //drawEdge(node4,node1,2);

    drawEdge(node19,node20,3);
    drawEdge(node19,node21,3);

  }


  /**
   *  Create a node object and add it to the scene.
   */
  function drawNode(node,isInvisible) {

    // Node geometry
    var geometry = new THREE.CircleGeometry(circleRadius,40);
    var draw_object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( {  color: colorBase } ) );
    var label_object;

    draw_object.position.x = node.position.x;
    draw_object.position.y = node.position.y;
    draw_object.position.z = node.position.z;

    draw_object.name = node.id;
    node.data.draw_object = draw_object;
    node.position = draw_object.position;
    //Set the author Info label invisible
    node.show_authorInfo = false;

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
    var g = new MeshLine();
    g.setGeometry(tmp_geo);

    switch (type) {
      case 0:
        /*Friendship connections*/

        var material = new MeshLineMaterial({
      		useMap: 0,
      		color: new THREE.Color( colorEdge ),
      		opacity: 1,
      		resolution: resolution,
      		sizeAttenuation: false,
      		lineWidth: 2.5,
      	});

        line = new THREE.Mesh(g.geometry, material);

      break;

      case 1:
        /* Rebuig Connections*/

        var material = new MeshLineMaterial({
          useMap: false,
          color: new THREE.Color( red ),
          opacity: 1,
          resolution: resolution,
          sizeAttenuation: false,
          dashArray: 0.01,
          lineWidth: 3,
        });

        line = new THREE.Mesh(g.geometry, material);

      break;

      case 2:
        /* Adora connections*/

        var material = new MeshLineMaterial({
          useMap: false,
          color: new THREE.Color( green ),
          opacity: 1,
          resolution: resolution,
          sizeAttenuation: false,
          dashArray: 0.01,
          lineWidth: 3,
          alphaTest:1,
        });

        line = new THREE.Mesh(g.geometry, material);

      break;

      case 3:
        /*Equipo cronica connections*/

        var material = new MeshLineMaterial({
          useMap: false,
          color: new THREE.Color( colorEdge ),
          opacity: 1,
          resolution: resolution,
          sizeAttenuation: false,
          lineWidth: 2.5,
        });

        line = new THREE.Mesh(g.geometry, material);

      break;

    }

      // NOTE: Deactivated frustumCulled, otherwise it will not draw all lines (even though
      // it looks like the lines are in the view frustum).
      //line.frustumCulled = false;

      //geometries.push(g.geometry);

      scene.add( line );
  }

  /*
    Change the color for the Selected node and its relatives
  */
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

  /*
    Show more info when the Author is Clicked
  */
  function updateAuthorInfo(objName){
      selectedNode = graph.getNode(objName);

      if(selectedNode.show_authorInfo == true){
        selectedNode.show_authorInfo = false;
      }else{
        selectedNode.show_authorInfo = true;
      }
  }


  function animate() {
    requestAnimationFrame( animate );
    controls.update();
    //console.log("Azimuth: " + controls.getAzimuthalAngle() + "Polar: " + controls.getPolarAngle());
    render();
  }


  function render() {
    var i, length, node;
/*
    // Generate layout if not finished
    if(!graph.layout.finished) {
      graph.layout.generate();
    }
*/
/*
    // Update position of lines (edges)
    for(i=0; i<geometries.length; i++) {
      geometries[i].verticesNeedUpdate = true;
    }
*/
    // Show labels if set
    // It creates the labels when this options is set during visualization
    if(that.show_labels) {
      length = graph.nodes.length;
      for(i=0; i<length; i++) {
        node = graph.nodes[i];

        //If Author is clicked, set position for AuthorInfo
        if(node.data.info_object !== undefined){

          if(node.show_authorInfo == true){

            node.data.info_object.visible = true;

            node.data.info_object.position.x = node.data.draw_object.position.x;
            node.data.info_object.position.y = node.data.draw_object.position.y - 125; //Testing this position
            node.data.info_object.position.z = node.data.draw_object.position.z;

            node.data.info_object.lookAt(camera.position);

          }else{
            node.data.info_object.visible = false;
          }


        }else{
          var info_object;

          if(node.show_authorInfo){
            info_object = new THREE.AuthorInfo(node.data.yearBorn,node.data.yearDeath,node.data.childs,node.data.otherInfo, node.data.draw_object);
            node.data.info_object = info_object;
            scene.add( node.data.info_object );
          }

        }

        if(node.data.name_object !== undefined) {

          //Set position for AuthorName
          node.data.name_object.position.x = node.data.draw_object.position.x;
          node.data.name_object.position.y = node.data.draw_object.position.y - 50;
          node.data.name_object.position.z = node.data.draw_object.position.z;

          node.data.name_object.lookAt(camera.position);
          node.data.draw_object.lookAt(camera.position);

        } else {
          var name_object;

          if(node.data.name !== undefined){
            name_object = new THREE.AuthorName(node.data.name, node.data.draw_object);
            node.data.name_object = name_object;
          }

          scene.add( node.data.name_object );
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
/*
  // Stop layout calculation
  this.stop_calculating = function() {
    graph.layout.stop_calculating();
  };
*/

};
