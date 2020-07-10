var vs = `#version 300 es

in vec3 inPosition;
in vec3 inNormal;
out vec3 fsNormal;

uniform mat4 matrix; 
uniform mat4 nMatrix;     //matrix to transform normals

void main() {
  fsNormal = mat3(nMatrix) * inNormal; 
  gl_Position = matrix * vec4(inPosition, 1.0);
}`;

var fs = `#version 300 es

precision mediump float;

in vec3 fsNormal;
out vec4 outColor;

uniform vec3 mDiffColor;
uniform vec3 lightDirection; 
uniform vec3 lightColor;   

void main() {

  vec3 nNormal = normalize(fsNormal);
  vec3 lDir = lightDirection; 
  vec3 lambertColor = mDiffColor * lightColor * dot(-lDir,nNormal);
  outColor = vec4(clamp(lambertColor, 0.0, 1.0), 1.0);
}`;

//Parameters for Camera
var cx = 0.0;
var cy = -1.0;
var cz = 2.0;
var elevation = 30.0;
var angle = 0.0;

var lookRadius = 1.0;


var mouseState = false;
var lastMouseX = -100, lastMouseY = -100;
function doMouseDown(event) {
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
	if(mouseState) {
		var dx = event.pageX - lastMouseX;
		var dy = lastMouseY - event.pageY;
		lastMouseX = event.pageX;
    lastMouseY = event.pageY;
		
		if((dx != 0) || (dy != 0)) {
			cx = cx + dx/500;
			cy = cy + dy/500;
		}
	}
}
function doMouseWheel(event) {
	var nLookRadius = lookRadius + event.wheelDelta/200.0;
	if((nLookRadius > 2.0) && (nLookRadius < 100.0)) {
		lookRadius = nLookRadius;
	}
}

function main() {

  var program = null;
  var cubeNormalMatrix;

  var cubeWorldMatrix = new Array();    //One world matrix for each cube...

  //define directional light
  var dirLightAlpha = -utils.degToRad(60);
  var dirLightBeta  = -utils.degToRad(120);

  var directionalLight = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
              Math.sin(dirLightAlpha),
              Math.cos(dirLightAlpha) * Math.sin(dirLightBeta)
              ];
  var directionalLightColor = [1.0, 1.0, 1.0];

  /*cubeWorldMatrix[0] = utils.MakeWorld( 0.0, 0.0, 0.0, 0.0, 0.0, 225.0, 1.0); //blue
  cubeWorldMatrix[1] = utils.MakeWorld( 0.0, 0.0, 0.0, 0.0, 0.0, 315.0, 1.0); //green
  cubeWorldMatrix[2] = utils.MakeWorld( 0.0, 0.0, 0.0, 0.0, 0.0, 45.0, 1.0); // yellow
  cubeWorldMatrix[3] = utils.MakeWorld( -Math.sqrt(2)/4, -Math.sqrt(2)/4, 0.0, 0.0, 0.0, 135.0, 1.0);  //pink
  cubeWorldMatrix[4] = utils.MakeWorld( Math.sqrt(2)/2, -Math.sqrt(2)/2, 0.0, 0.0, 0.0, 270.0, 1.0); //orange
  cubeWorldMatrix[5] = utils.MakeWorld(-Math.sqrt(2)/4, -Math.sqrt(2)/4, 0.0, 0.0, 0.0, 45.0, 1.0); //square
  cubeWorldMatrix[6] = utils.MakeWorld(Math.sqrt(2)/4, Math.sqrt(2)/2, 0.0, 0.0, 0.0, 90.0, 1.0);*/

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
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0.85, 0.85, 0.85, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, vs);
  var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, fs);
  var program = utils.createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);


  var positionAttributeLocation = gl.getAttribLocation(program, "inPosition");  
  var normalAttributeLocation = gl.getAttribLocation(program, "inNormal");  
  var matrixLocation = gl.getUniformLocation(program, "matrix");
  var materialDiffColorHandle = gl.getUniformLocation(program, 'mDiffColor');
  var lightDirectionHandle = gl.getUniformLocation(program, 'lightDirection');
  var lightColorHandle = gl.getUniformLocation(program, 'lightColor');
  var normalMatrixPositionHandle = gl.getUniformLocation(program, 'nMatrix');

  var perspectiveMatrix = utils.MakePerspective(90, gl.canvas.width/gl.canvas.height, 0.1, 100.0);
  


  var vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesTriangles), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

  var normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalsTriangles), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(normalAttributeLocation);
  gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

  var indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesTriangles), gl.STATIC_DRAW); 
  

  var vao1 = gl.createVertexArray();
  gl.bindVertexArray(vao1);
  var positionBuffer2 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer2);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesSquare), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

  var normalBuffer2 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer2);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalsSquare), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(normalAttributeLocation);
  gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

  var indexBuffer2 = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer2);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesSquare), gl.STATIC_DRAW);


  var vao2 = gl.createVertexArray();
  gl.bindVertexArray(vao2);
  var positionBuffer3 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer3);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesParallelogram), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

  var normalBuffer3 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer3);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalsParallelogram), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(normalAttributeLocation);
  gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

  var indexBuffer3 = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer3);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesSquare), gl.STATIC_DRAW);

  drawScene();


  function drawScene() {

    /*cz = lookRadius * Math.cos(utils.degToRad(-angle)) * Math.cos(utils.degToRad(-elevation));
	  cx = lookRadius * Math.sin(utils.degToRad(-angle)) * Math.cos(utils.degToRad(-elevation));
	  cy = lookRadius * Math.sin(utils.degToRad(-elevation));*/
    viewMatrix = utils.MakeView(cx, cy, cz, elevation, -angle);
        
    var lightDirMatrix = utils.invertMatrix(utils.transposeMatrix(viewMatrix));//viewMatrix;
    var lightDirectionTransformed = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(lightDirMatrix),directionalLight);
    
      for(i = 0; i < 5; i++){

      cubeWorldMatrix[i] = utils.MakeWorld( initialSetup[i][0], initialSetup[i][1], 0.0, 0.0, 0.0, initialSetup[i][2], 1.0);
      var worldViewMatrix = utils.multiplyMatrices(viewMatrix, cubeWorldMatrix[i]);
      var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, worldViewMatrix);

      if(i == 3 || i == 2){
        projectionMatrix = utils.multiplyMatrices(projectionMatrix, utils.MakeScaleNuMatrix(0.5, 0.5, 1.0));
      }
      else if( i == 4){
        projectionMatrix = utils.multiplyMatrices(projectionMatrix, utils.MakeScaleNuMatrix(Math.sqrt(2)/2, Math.sqrt(2)/2, 1.0));
      }

      gl.uniformMatrix4fv(matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));
      
      var cubeNormalMatrix = utils.invertMatrix(utils.transposeMatrix(worldViewMatrix));
      
      gl.uniformMatrix4fv(normalMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(cubeNormalMatrix));

      gl.uniform3fv(materialDiffColorHandle, (colors[i]));
      gl.uniform3fv(lightColorHandle,  directionalLightColor);
      gl.uniform3fv(lightDirectionHandle,  lightDirectionTransformed);

      gl.bindVertexArray(vao);
      gl.drawElements(gl.TRIANGLES, indicesTriangles.length, gl.UNSIGNED_SHORT, 0 );
    }

    for(i = 5; i < 7; i++){
      
      cubeWorldMatrix[i] = utils.MakeWorld( initialSetup[i][0], initialSetup[i][1], 0.0, 0.0, 0.0, initialSetup[i][2], 1.0);
      var worldViewMatrix = utils.multiplyMatrices(viewMatrix, cubeWorldMatrix[i]);
      var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, worldViewMatrix);

      gl.uniformMatrix4fv(matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));
      
      var cubeNormalMatrix = utils.invertMatrix(utils.transposeMatrix(worldViewMatrix));
      
      gl.uniformMatrix4fv(normalMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(cubeNormalMatrix));

      gl.uniform3fv(materialDiffColorHandle, (colors[i]));
      gl.uniform3fv(lightColorHandle,  directionalLightColor);
      gl.uniform3fv(lightDirectionHandle,  lightDirectionTransformed);

      if(i == 5){
        gl.bindVertexArray(vao1);
      }else{
        gl.bindVertexArray(vao2);
      }
      gl.drawElements(gl.TRIANGLES, indicesTriangles.length, gl.UNSIGNED_SHORT, 0 );
    }
    
    window.requestAnimationFrame(drawScene);
  }

  

  

}



window.onload = main;

