function main() {


  var canvas = getCanvas();

  canvas.addEventListener("mousedown", doMouseDown, false);
  canvas.addEventListener("mouseup", doMouseUp, false);
  canvas.addEventListener("mousemove", doMouseMove, false);
  canvas.addEventListener("mousewheel", doMouseWheel, false);

  window.addEventListener("keydown", keyFunctionDown, false);

  gl = canvas.getContext("webgl2");

  width = gl.canvas.width;
  height = gl.canvas.height;

  perspectiveMatrix = utils.MakePerspective(90, width / height, 0.1, 100.0);

  initializeProgram(gl);

  initPosition(0);
  drawScene();

  function drawScene() {

    viewMatrix = utils.MakeView(cx, cy, cz, elevation, angle);

    var lightDirMatrix = utils.invertMatrix(utils.transposeMatrix(viewMatrix));

    var lightDirectionTransformed = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(lightDirMatrix), directionalLightDir);

    

    for (i = 0; i < assetsData.length; i++) {

      var worldLocation = assetsData[i].drawInfo.worldParams;
      assetsData[i].drawInfo.worldMatrix = utils.MakeWorld(worldLocation[0], worldLocation[1], worldLocation[2], worldLocation[3], worldLocation[4], worldLocation[5], worldLocation[6]); //TODO eliminare objects world matrix in futuro

      var worldViewMatrix = utils.multiplyMatrices(viewMatrix, assetsData[i].drawInfo.worldMatrix);
      var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, worldViewMatrix);

      var cubeNormalMatrix = utils.invertMatrix(utils.transposeMatrix(worldViewMatrix));


      gl.uniformMatrix4fv(locationsArray[0].matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));
      gl.uniformMatrix4fv(locationsArray[0].normalMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(cubeNormalMatrix));
      gl.uniformMatrix4fv(locationsArray[0].vertexMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(assetsData[i].drawInfo.worldMatrix));

      gl.uniform3fv(locationsArray[0].materialColorHandle, assetsData[i].drawInfo.ambientColor);
      gl.uniform3fv(locationsArray[0].specularColorHandle, [1.0, 1.0, 1.0]);

      //gl.uniform3fv(locationsArray.lightPositionHandle, positionLight);
      //gl.uniform3fv(locationsArray.lightColorHandle, directionalLightColor);
//      gl.uniform3fv(locationsArray.lightDirectionHandle, lightDirectionTransformed);
      gl.uniform3fv(locationsArray[0].pointLightPosition, pointLightPosition);
      gl.uniform3fv(locationsArray[0].pointLightColor, pointLightColor);
     // gl.uniform3fv(locationsArray.pointLightDir, pointLightDir)
      //gl.uniform3fv()
      

      gl.uniform1f(locationsArray[0].decayHandle, defaultDecay);
      gl.uniform1f(locationsArray[0].targetHandle, 10.0);

      gl.uniform1f(locationsArray[0].specShine, defaultSpecShine);

      gl.bindVertexArray(assetsData[i].drawInfo.vao);
      gl.drawElements(gl.TRIANGLES, assetsData[i].structInfo.indices.length, gl.UNSIGNED_SHORT, 0);

    }

    window.requestAnimationFrame(drawScene);
  }


}

window.onload = main;
