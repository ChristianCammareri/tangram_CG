function drawOverlay() {

  var perspectiveMatrixOverlay = utils.MakePerspective(90, width / height, 0.1, 100.0);

  initializeProgram(glOverlay, ShadersType.SOLUTION);

  initPositionSolution(selectedSetup);
  drawSceneOverlay();

  function drawSceneOverlay() {

    var viewMatrixOverlay = utils.MakeView(0, 0, 3, 0, 0);

    for (i = 0; i < assetsData.length; i++) {
      glOverlay.useProgram(programsArray[ShadersType.SOLUTION]);
      
      
      var worldMatrixSolution = utils.multiplyMatrices(utils.MakeTranslateMatrix(4, 0, 0), assetsData[i].drawInfo.worldMatrixSolution);
      var worldViewMatrixOverlay = utils.multiplyMatrices(viewMatrixOverlay, worldMatrixSolution);
      var projectionMatrixOverlay = utils.multiplyMatrices(perspectiveMatrixOverlay, worldViewMatrixOverlay);

      glOverlay.uniformMatrix4fv(locationsArray[ShadersType.SOLUTION].matrixLocation, glOverlay.FALSE, utils.transposeMatrix(projectionMatrixOverlay));

      var myColor;
      if(isSurrendered) {
        myColor = [assetsData[i].drawInfo.ambientColor[0], assetsData[i].drawInfo.ambientColor[1], assetsData[i].drawInfo.ambientColor[2], 1.0];
      }
      else {
        myColor = [0.0, 0.0, 0.0, 1.0];
      }
      glOverlay.uniform4fv(locationsArray[ShadersType.SOLUTION].materialColorHandle, myColor);

      glOverlay.bindVertexArray(assetsData[i].drawInfo.vaoOverlay);
      glOverlay.drawElements(glOverlay.TRIANGLES, assetsData[i].structInfo.indices2D.length, glOverlay.UNSIGNED_SHORT, 0);

    }

    window.requestAnimationFrame(drawSceneOverlay);
  }

}