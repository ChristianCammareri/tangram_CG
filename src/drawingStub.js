function main() {

  var canvas = getCanvas();

  canvas.addEventListener("mousedown", doMouseDown, false);
  canvas.addEventListener("mouseup", doMouseUp, false);
  canvas.addEventListener("mousemove", doMouseMove, false);
  canvas.addEventListener("mousewheel", doMouseWheel, false);

  window.addEventListener("keydown", keyFunctionDown, false);

  gl = canvas.getContext("webgl2");

  perspectiveMatrix = utils.MakePerspective(90, gl.canvas.width / gl.canvas.height, 0.1, 100.0);

  var locations = initializeYourProgram(gl);

  initPosition();
  drawScene();

  function drawScene() {

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

      gl.uniform3fv(locations.materialColorHandle, assetsData[i].drawInfo.ambientColor);
      gl.uniform3fv(locations.specularColorHandle, [1.0, 1.0, 1.0]);

      gl.uniform3fv(locations.lightPositionHandle, positionLight);
      gl.uniform3fv(locations.lightColorHandle, directionalLightColor);
      gl.uniform3fv(locations.lightDirectionHandle, lightDirectionTransformed);

      gl.uniform1f(locations.decayHandle, defaultDecay);
      gl.uniform1f(locations.targetHandle, defaultG);
      gl.uniform1f(locations.specShine, defaultSpecShine);


      gl.bindVertexArray(assetsData[i].drawInfo.vao);
      gl.drawElements(gl.TRIANGLES, assetsData[i].structInfo.indices.length, gl.UNSIGNED_SHORT, 0);

    }

    window.requestAnimationFrame(drawScene);
  }


}

window.onload = main;
