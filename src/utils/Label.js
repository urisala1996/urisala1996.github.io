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

  var deathDate= new Date(yearDeath);
  var bornDate= new Date(yearBorn);

  var labelCanvas = document.createElement( "canvas" );

  function create() {
    var xc = labelCanvas.getContext("2d");
    var fontsize = "40pt";
    var offset = 0;

    // set font size to measure the text
    xc.font = fontsize + " Aileron";
    var len = xc.measureText("xxxxxxxxxxxx").width;
    labelCanvas.setAttribute('width', 1000);

    xc.font = "24pt" + " Aileron";
    xc.textBaseline = 'top';
    //xc.textAlign = 'center';
    if(yearDeath != "" && yearBorn != "") {
      xc.fillText(bornDate.getFullYear() + " - " + deathDate.getFullYear(), 0, 50);
      offset = offset + 35;
      xc.fillText(this.getAge(yearBorn,yearDeath) + " anys", 35, 50+offset);
      offset = offset + 35;
    }else{
      if(yearBorn != ""){
        xc.fillText(bornDate.getFullYear(),0,50);
        xc.fillStyle = "#246dad";
        xc.fillText(this.getAge(yearBorn,yearDeath) + " anys",105,50);
        xc.fillStyle = "#000000";
        offset = offset + 35;
      }
    }

    if(childs != 0){
      xc.font = "22pt" + " Aileron";
      xc.fillStyle = "#f7ab28";
      xc.fillText(childs,0,50+offset);
      xc.fillStyle = "#000000";
      offset = offset + 35;
    }

    if(otherInfo != 0){
      xc.font = "22pt" + " Aileron";
      xc.fillStyle = "#cb6af7";
      xc.fillText(otherInfo,0,50+offset);
      xc.fillStyle = "#f7ab28";
    }
    offset = 0;
    var geometry = new THREE.BoxGeometry(1000, 200, 0);
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

function getAge(born,death) {

  var today,birthDate,age,m,deathDate;

  if(death == ""){
    today = new Date();
    birthDate = new Date(born);
    age = today.getFullYear() - birthDate.getFullYear();
    m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
  }else{
    deathDate = new Date(death);
    birthDate = new Date(born);
    age = deathDate.getFullYear() - birthDate.getFullYear();
    m = deathDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && deathDate.getDate() < birthDate.getDate())) {
        age--;
    }
  }
  return age;

}
