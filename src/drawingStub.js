var perspectiveMatrix = [];
var viewMatrix = [];

var mouseState = false;
var lastMouseX = -100, lastMouseY = -100;

function doMouseDown(event) {
  //console.log(assetsData[0].drawInfo.locations.worldMatrix);
  //checkIntersectionTriangle(event, assetsData, perspectiveMatrix, viewMatrix);
  lastMouseX = event.pageX;
  lastMouseY = event.pageY;
  mouseState = true;
}
function doMouseUp(event) {
  lastMouseX = -100;
  lastMouseY = -100;
  mouseState = false;
}
function doMouseMove(event) {
  if (mouseState) {
    var dx = event.pageX - lastMouseX;
    var dy = lastMouseY - event.pageY;
    lastMouseX = event.pageX;
    lastMouseY = event.pageY;

    if ((dx != 0) || (dy != 0)) {
      cx = cx + dx / 500;
      cy = cy + dy / 500;
      /*angle += dx/2;
      elevation += dy/2;*/
    }
  }
}
function doMouseWheel(event) {
  var nLookRadius = lookRadius + event.wheelDelta / 200.0;
  if ((nLookRadius > 2.0) && (nLookRadius < 100.0)) {
    lookRadius = nLookRadius;
  }
}

function main() {

  //define directional light
  var dirLightAlpha = -utils.degToRad(60);
  var dirLightBeta = -utils.degToRad(120);

  var directionalLight = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
  Math.sin(dirLightAlpha),
  Math.cos(dirLightAlpha) * Math.sin(dirLightBeta)
  ];
  var directionalLightColor = [2.0, 2.0, 2.0];

  var canvas = getCanvas();

  canvas.addEventListener("mousedown", doMouseDown, false);
  canvas.addEventListener("mouseup", doMouseUp, false);
  canvas.addEventListener("mousemove", doMouseMove, false);
  canvas.addEventListener("mousewheel", doMouseWheel, false);

  gl = canvas.getContext("webgl2");

  perspectiveMatrix = utils.MakePerspective(90, gl.canvas.width / gl.canvas.height, 0.1, 100.0);

  var locations = initializeYourProgram(gl);

  initPosition(); 
  drawScene();

  function drawScene() {

    
    /*cz = lookRadius * Math.cos(utils.degToRad(-angle)) * Math.cos(utils.degToRad(-elevation));
	  cx = lookRadius * Math.sin(utils.degToRad(-angle)) * Math.cos(utils.degToRad(-elevation));
	  cy = lookRadius * Math.sin(utils.degToRad(-elevation));*/
    viewMatrix = utils.MakeView(cx, cy, cz, elevation, angle);

    var lightDirMatrix = utils.invertMatrix(utils.transposeMatrix(viewMatrix));

    var lightDirectionTransformed = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(lightDirMatrix), directionalLight);

    for (i = 0; i < assetsData.length; i++) {
      
      var worldLocation = assetsData[i].drawInfo.locations.worldParams;
      assetsData[i].drawInfo.locations.worldMatrix = utils.MakeWorld(worldLocation[0], worldLocation[1], worldLocation[2], worldLocation[3], worldLocation[4], worldLocation[5], worldLocation[6]); //TODO eliminare objects world matrix in futuro

      var worldViewMatrix = utils.multiplyMatrices(viewMatrix, assetsData[i].drawInfo.locations.worldMatrix);
      var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, worldViewMatrix);

      var cubeNormalMatrix = utils.invertMatrix(utils.transposeMatrix(worldViewMatrix));
      

      gl.uniformMatrix4fv(locations.matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));
      gl.uniformMatrix4fv(locations.normalMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(cubeNormalMatrix));
      gl.uniformMatrix4fv(locations.vertexMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(assetsData[i].drawInfo.locations.worldMatrix));

      gl.uniform3fv(locations.materialDiffColorHandle, (colors[i]));
      gl.uniform3fv(locations.lightColorHandle, directionalLightColor);
      gl.uniform3fv(locations.lightDirectionHandle, lightDirectionTransformed);


      gl.bindVertexArray(assetsData[i].drawInfo.vao);
      gl.drawElements(gl.TRIANGLES, assetsData[i].structInfo.indices.length, gl.UNSIGNED_SHORT, 0);
    
    }

    window.requestAnimationFrame(drawScene);
  }


}

window.onload = main;

