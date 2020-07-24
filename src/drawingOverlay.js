function drawOverlay() {
  width = glOverlay.canvas.width;
  height = glOverlay.canvas.height;

  perspectiveMatrix = utils.MakePerspective(90, width / height, 0.1, 100.0);

  initializeProgram(glOverlay, ShadersType.SOLUTION);

  initPositionSolution(3);
  drawSceneOverlay();

  function drawSceneOverlay() {

    viewMatrix = utils.MakeView(cx, cy, cz, elevation, angle);

    for (i = 0; i < assetsData.length; i++) {
      glOverlay.useProgram(programsArray[ShadersType.SOLUTION]);
      
      
      var worldMatrixSolution = utils.multiplyMatrices(utils.MakeTranslateMatrix(1.0, 1.0, 0.5), assetsData[i].drawInfo.worldMatrixSolution);
      var worldViewMatrix = utils.multiplyMatrices(viewMatrix, worldMatrixSolution);
      var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, worldViewMatrix);

      var cubeNormalMatrix = utils.invertMatrix(utils.transposeMatrix(worldViewMatrix));


      glOverlay.uniformMatrix4fv(locationsArray[1].matrixLocation, glOverlay.FALSE, utils.transposeMatrix(projectionMatrix));
      glOverlay.uniformMatrix4fv(locationsArray[1].normalMatrixPositionHandle, glOverlay.FALSE, utils.transposeMatrix(cubeNormalMatrix));
      glOverlay.uniformMatrix4fv(locationsArray[1].vertexMatrixPositionHandle, glOverlay.FALSE, utils.transposeMatrix(worldMatrixSolution));

      glOverlay.uniform3fv(locationsArray[1].materialColorHandle, assetsData[i].drawInfo.ambientColor);

      glOverlay.bindVertexArray(assetsData[i].drawInfo.vaoOverlay);
      glOverlay.drawElements(glOverlay.TRIANGLES, assetsData[i].structInfo.indices2D.length, glOverlay.UNSIGNED_SHORT, 0);

    }

    window.requestAnimationFrame(drawSceneOverlay);
  }

}