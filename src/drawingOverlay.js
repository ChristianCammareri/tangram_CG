function drawOverlay() {
  width = glOverlay.canvas.width;
  height = glOverlay.canvas.height;

  perspectiveMatrix = utils.MakePerspective(90, width / height, 0.1, 100.0);

  initializeProgram(glOverlay, ShadersType.SOLUTION);

  initPosition(0);
  drawScene();

  function drawScene() {

    viewMatrix = utils.MakeView(cx, cy, cz, elevation, angle);

    for (i = 0; i < assetsData.length; i++) {
      glOverlay.useProgram(programsArray[ShadersType.SOLUTION]);
      var worldLocation = assetsData[i].drawInfo.worldParams;
      assetsData[i].drawInfo.worldMatrix = utils.MakeWorld(worldLocation[0], worldLocation[1], worldLocation[2], worldLocation[3], worldLocation[4], worldLocation[5], worldLocation[6]); //TODO eliminare objects world matrix in futuro
      
      assetsData[i].drawInfo.worldMatrix = utils.multiplyMatrices(utils.MakeTranslateMatrix(2, 2, 0), assetsData[i].drawInfo.worldMatrix);
      var worldViewMatrix = utils.multiplyMatrices(viewMatrix, assetsData[i].drawInfo.worldMatrix);
      var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, worldViewMatrix);

      var cubeNormalMatrix = utils.invertMatrix(utils.transposeMatrix(worldViewMatrix));


      glOverlay.uniformMatrix4fv(locationsArray[1].matrixLocation, glOverlay.FALSE, utils.transposeMatrix(projectionMatrix));
      glOverlay.uniformMatrix4fv(locationsArray[1].normalMatrixPositionHandle, glOverlay.FALSE, utils.transposeMatrix(cubeNormalMatrix));
      glOverlay.uniformMatrix4fv(locationsArray[1].vertexMatrixPositionHandle, glOverlay.FALSE, utils.transposeMatrix(assetsData[i].drawInfo.worldMatrix));

      glOverlay.uniform3fv(locationsArray[1].materialColorHandle, assetsData[i].drawInfo.ambientColor);

      glOverlay.bindVertexArray(assetsData[i].drawInfo.vaoOverlay);
      glOverlay.drawElements(glOverlay.TRIANGLES, assetsData[i].structInfo.indices2D.length, glOverlay.UNSIGNED_SHORT, 0);

    }

    window.requestAnimationFrame(drawScene);
  }

}