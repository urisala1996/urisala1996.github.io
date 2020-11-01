THREE.AuthorName = function( nom, cognom, parameters) {
  parameters = parameters || {};

  var labelCanvas = document.createElement( "canvas" );

  function create() {
    var xc = labelCanvas.getContext("2d");
    var fontsize = "35pt";
    //var offset = 0;

    // set font size to measure the text
    xc.font = fontsize + " Aileron";
    var len = xc.measureText("MAPPLETHORPE").width;

    labelCanvas.setAttribute('width', len);

    xc.font = fontsize + " Aileron";
    xc.textBaseline = 'top';
    xc.textAlign = 'center';

    xc.fillText(nom, 195, 0);

    if(name.cognom != ""){
      xc.font = fontsize + " Aileron";
      xc.textBaseline = 'top';
      //xc.textAlign = 'right';
      xc.fillText(cognom,195,50);
      //xc.fillText(cognom,0,50);
    }

    var geometry = new THREE.BoxGeometry(len, 200, 0);
    var xm = new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(
        labelCanvas,
        THREE.UVMapping,
        THREE.ClampToEdgeWrapping,
        THREE.ClampToEdgeWrapping,
        THREE.LinearFilter,
        THREE.LinearFilter
      ),
      transparent: true
    });
    xm.map.needsUpdate = true;

    // set text canvas to cube geometry
    var labelObject = new THREE.Mesh(geometry, xm);
    return labelObject;
  }

  return create();
};

THREE.AuthorInfo = function( yearBorn, yearDeath, childs, otherInfo, parameters) {
  parameters = parameters || {};

  var labelCanvas = document.createElement( "canvas" );

  function create() {
    var xc = labelCanvas.getContext("2d");
    var fontsize = "40pt";
    //var offset = 0;

    // set font size to measure the text
    xc.font = fontsize + " Aileron";
    var len = xc.measureText("xxxxxxxxxxxx").width;
    labelCanvas.setAttribute('width', 800);

    xc.font = "20pt" + " Aileron";
    xc.textBaseline = 'top';
    //xc.textAlign = 'center';
    if(yearDeath != 0) {
      xc.fillText(yearBorn + " - " + yearDeath, 0, 50);
    }else{
      if(yearBorn != 0){
        xc.fillText(yearBorn,0,50);
        xc.fillStyle = "#246dad";
        xc.fillText(2020-yearBorn + " anys",75,50);
        xc.fillStyle = "#000000";
      }
    }

    if(childs != 0){
      xc.font = "18pt" + " Aileron";
      xc.fillStyle = "#f7ab28";
      xc.fillText(childs,0,75);
      xc.fillStyle = "#000000";
    }

    if(otherInfo != 0){
      xc.font = "16pt" + " Aileron";
      xc.fillStyle = "#cb6af7";
      xc.fillText(otherInfo,0,100);
      xc.fillStyle = "#f7ab28";
    }

    var geometry = new THREE.BoxGeometry(800, 200, 0);
    var xm = new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(
        labelCanvas,
        THREE.UVMapping,
        THREE.ClampToEdgeWrapping,
        THREE.ClampToEdgeWrapping,
        THREE.LinearFilter,
        THREE.LinearFilter
      ),
      transparent: true
    });
    xm.map.needsUpdate = true;

    // set text canvas to cube geometry
    var labelObject = new THREE.Mesh(geometry, xm);
    return labelObject;
  }

  return create();
};
