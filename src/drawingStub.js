
var perspectiveMatrix = [];
var viewMatrix = [];
var objectsWorldMatrix = new Array(7);
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

  var program = null;
  var cubeNormalMatrix;

  //One world matrix for each cube...

  //define directional light
  var dirLightAlpha = -utils.degToRad(60);
  var dirLightBeta = -utils.degToRad(120);

  var directionalLight = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
  Math.sin(dirLightAlpha),
  Math.cos(dirLightAlpha) * Math.sin(dirLightBeta)
  ];
  var directionalLightColor = [1.0, 1.0, 1.0];

  var canvas = document.getElementById("c");

  canvas.addEventListener("mousedown", doMouseDown, false);
  canvas.addEventListener("mouseup", doMouseUp, false);
  canvas.addEventListener("mousemove", doMouseMove, false);
  canvas.addEventListener("mousewheel", doMouseWheel, false);
  gl = canvas.getContext("webgl2");
  if (!gl) {
    document.write("GL context not opened");
    return;
  }

  utils.resizeCanvasToDisplaySize(gl.canvas);
  //window.addEventListener("resize", utils.resizeCanvasToDisplaySize(gl.canvas));

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0.85, 0.85, 0.85, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  var program;
  utils.loadFiles([shadersPath.vs, shadersPath.fs], function (shaderText) {
    var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
    var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
    program = utils.createProgram(gl, vertexShader, fragmentShader);
  });
  gl.useProgram(program);


  var positionAttributeLocation = gl.getAttribLocation(program, "inPosition");
  var normalAttributeLocation = gl.getAttribLocation(program, "inNormal");
  var matrixLocation = gl.getUniformLocation(program, "matrix");
  var materialDiffColorHandle = gl.getUniformLocation(program, 'mDiffColor');
  var lightDirectionHandle = gl.getUniformLocation(program, 'lightDirection');
  var lightColorHandle = gl.getUniformLocation(program, 'lightColor');
  var normalMatrixPositionHandle = gl.getUniformLocation(program, 'nMatrix');

  perspectiveMatrix = utils.MakePerspective(90, gl.canvas.width / gl.canvas.height, 0.1, 100.0);

  var vao = new Array(8);

  for (i = 0; i < assetsData.length; i++) {

    vao[i] = gl.createVertexArray();
    gl.bindVertexArray(vao[i]);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(assetsData[i].structInfo.vertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);


    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(assetsData[i].structInfo.normals), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(normalAttributeLocation);
    gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);


    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(assetsData[i].structInfo.indices), gl.STATIC_DRAW);

  }

  initPosition(); // inizializza la le word matrix 
  drawScene();

  function drawScene() {

    /*cz = lookRadius * Math.cos(utils.degToRad(-angle)) * Math.cos(utils.degToRad(-elevation));
	  cx = lookRadius * Math.sin(utils.degToRad(-angle)) * Math.cos(utils.degToRad(-elevation));
	  cy = lookRadius * Math.sin(utils.degToRad(-elevation));*/
    viewMatrix = utils.MakeView(cx, cy, cz, elevation, -angle);

    var lightDirMatrix = utils.invertMatrix(utils.transposeMatrix(viewMatrix));//viewMatrix;
    var lightDirectionTransformed = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(lightDirMatrix), directionalLight);

    for (i = 0; i < assetsData.length; i++) {
      
      var worldLocation = assetsData[i].drawInfo.locations.worldParams;
      objectsWorldMatrix[i] = utils.MakeWorld(worldLocation[0], worldLocation[1], worldLocation[2], worldLocation[3], worldLocation[4], worldLocation[5], worldLocation[6]);
      assetsData[i].drawInfo.locations.worldMatrix = objectsWorldMatrix[i]; //TODO eliminare objects world matrix in futuro

      var worldViewMatrix = utils.multiplyMatrices(viewMatrix, objectsWorldMatrix[i]);
      var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, worldViewMatrix);

      gl.uniformMatrix4fv(matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));

      var cubeNormalMatrix = utils.invertMatrix(utils.transposeMatrix(worldViewMatrix));

      gl.uniformMatrix4fv(normalMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(cubeNormalMatrix));

      gl.uniform3fv(materialDiffColorHandle, (colors[i]));
      gl.uniform3fv(lightColorHandle, directionalLightColor);
      gl.uniform3fv(lightDirectionHandle, lightDirectionTransformed);

      gl.bindVertexArray(vao[i]);
      gl.drawElements(gl.TRIANGLES, assetsData[i].structInfo.indices.length, gl.UNSIGNED_SHORT, 0);
    }

    window.requestAnimationFrame(drawScene);
  }


}

function initPosition() {
  for (i = 0; i < assetsData.length - 1; i++) { // TODO LAST ASSET IS THE FLOOR 
    var asset = assetsData[i];
    asset.drawInfo.locations.worldParams = [setups[0].positionMatrix[i][0], setups[0].positionMatrix[i][1], 0.0, 0.0, 0.0, setups[0].positionMatrix[i][2], 1.0];
  }

  assetsData[7].drawInfo.locations.worldParams = [0.0, 0.0, -0.1, 0.0, 0.0, 0.0, 1.0];




}



window.onload = main;

