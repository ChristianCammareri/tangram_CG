function drawItems() {
  width = glOverlay.canvas.width;
  height = glOverlay.canvas.height;

  var perspectiveMatrix = utils.MakePerspective(90, width / height, 0.1, 100.0);

  initializeProgram(glMain, ShadersType.ITEM);

  initPosition();
  drawSceneItems();

  function drawSceneItems() {

    //Camera
      var viewMatrix = utils.MakeView(cx, cy, cz, elevation, angle);
  
      var lightDirMatrix = utils.invertMatrix(utils.transposeMatrix(viewMatrix));
      var lightPosMatrix = utils.invertMatrix(utils.transposeMatrix(viewMatrix));

      for (i = 0; i < assetsData.length; i++) {
        glMain.useProgram(programsArray[ShadersType.ITEM]);
  
        var worldLocation = assetsData[i].drawInfo.worldParams;
        var worldMatrix = utils.MakeWorld(worldLocation[0], worldLocation[1], worldLocation[2], worldLocation[3], worldLocation[4], worldLocation[5], worldLocation[6]); //TODO eliminare objects world matrix in futuro
  
        var worldViewMatrix = utils.multiplyMatrices(viewMatrix, worldMatrix);
        var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, worldViewMatrix);
  
        var normalMatrix = utils.invertMatrix(utils.transposeMatrix(worldViewMatrix));
  
  
        glMain.uniformMatrix4fv(locationsArray[ShadersType.ITEM].matrixLocation, glMain.FALSE, utils.transposeMatrix(projectionMatrix));
        glMain.uniformMatrix4fv(locationsArray[ShadersType.ITEM].normalMatrixPositionHandle, glMain.FALSE, utils.transposeMatrix(normalMatrix));
        glMain.uniformMatrix4fv(locationsArray[ShadersType.ITEM].vertexMatrixPositionHandle, glMain.FALSE, utils.transposeMatrix(worldMatrix));
        
        //LIGHTS
        glMain.uniform4fv(locationsArray[ShadersType.ITEM].materialColorHandle, [assetsData[i].drawInfo.ambientColor[0], assetsData[i].drawInfo.ambientColor[1], assetsData[i].drawInfo.ambientColor[2], 1.0]);
        glMain.uniform4fv(locationsArray[ShadersType.ITEM].specularColorHandle, specularColor);
        glMain.uniform4fv(locationsArray[ShadersType.ITEM].lightSwitch, lightSwitch);
        glMain.uniform1f(locationsArray[ShadersType.ITEM].specShine, specularShine);
        glMain.uniformMatrix4fv(locationsArray[ShadersType.ITEM].lightDirMatrix, glMain.FALSE, utils.transposeMatrix(lightDirMatrix));
        glMain.uniformMatrix4fv(locationsArray[ShadersType.ITEM].lightPosMatrix, glMain.FALSE, utils.transposeMatrix(lightPosMatrix));
        
        //Directional Light
        var directionalLightDirTransform = directionalLightDir;//utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(lightDirMatrix), directionalLightDir);
        glMain.uniform3fv(locationsArray[ShadersType.ITEM].directionalLightDir, directionalLightDirTransform);
        glMain.uniform4fv(locationsArray[ShadersType.ITEM].directionalLightCol, directionalLightColor);
        //Point light
        glMain.uniform3fv(locationsArray[ShadersType.ITEM].pointLightPosition, pointLightPosition);
        glMain.uniform4fv(locationsArray[ShadersType.ITEM].pointLightColor, pointLightColor);
        glMain.uniform1f(locationsArray[ShadersType.ITEM].pointLightDecay, pointLightDecay);
        glMain.uniform1f(locationsArray[ShadersType.ITEM].pointLightTarget, pointLightTarget);
  
        //Spot light
        glMain.uniform3fv(locationsArray[ShadersType.ITEM].spotLightPosition, spotLightPos);
        glMain.uniform4fv(locationsArray[ShadersType.ITEM].spotLightColor, spotLightColor);
        var spotLightDirTransform = spotLightDir;//utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(lightDirMatrix), spotLightDir);
        glMain.uniform3fv(locationsArray[ShadersType.ITEM].spotLightDir, spotLightDirTransform);
        glMain.uniform1f(locationsArray[ShadersType.ITEM].spotLightConeOut, spotLightConeOut);
        glMain.uniform1f(locationsArray[ShadersType.ITEM].spotLightConeIn, spotLightConeIn);
        glMain.uniform1f(locationsArray[ShadersType.ITEM].spotLightTarget, spotLightTarget);
        glMain.uniform1f(locationsArray[ShadersType.ITEM].spotLightDecay, spotLightDecay);

        glMain.bindVertexArray(assetsData[i].drawInfo.vao);
        glMain.drawElements(glMain.TRIANGLES, assetsData[i].structInfo.indices.length, glMain.UNSIGNED_SHORT, 0);
  
      }
  
      window.requestAnimationFrame(drawSceneItems);
    }
  
}