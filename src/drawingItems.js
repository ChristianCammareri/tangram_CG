function drawItems() {
    width = glOverlay.canvas.width;
    height = glOverlay.canvas.height;
  
    perspectiveMatrix = utils.MakePerspective(90, width / height, 0.1, 100.0);

    initializeProgram(glMain, ShadersType.ITEM);

    initPosition(0);
    drawSceneItems();

    function drawSceneItems() {
    
        viewMatrix = utils.MakeView(cx, cy, cz, elevation, angle);
    
        var lightDirMatrix = utils.invertMatrix(utils.transposeMatrix(viewMatrix));
    
        for (i = 0; i < assetsData.length; i++) {
          glMain.useProgram(programsArray[ShadersType.ITEM]);
    
          var worldLocation = assetsData[i].drawInfo.worldParams;
          var worldMatrix = utils.MakeWorld(worldLocation[0], worldLocation[1], worldLocation[2], worldLocation[3], worldLocation[4], worldLocation[5], worldLocation[6]); //TODO eliminare objects world matrix in futuro
    
          var worldViewMatrix = utils.multiplyMatrices(viewMatrix, worldMatrix);
          var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, worldViewMatrix);
    
          var cubeNormalMatrix = utils.invertMatrix(utils.transposeMatrix(worldViewMatrix));
    
    
          glMain.uniformMatrix4fv(locationsArray[0].matrixLocation, glMain.FALSE, utils.transposeMatrix(projectionMatrix));
          glMain.uniformMatrix4fv(locationsArray[0].normalMatrixPositionHandle, glMain.FALSE, utils.transposeMatrix(cubeNormalMatrix));
          glMain.uniformMatrix4fv(locationsArray[0].vertexMatrixPositionHandle, glMain.FALSE, utils.transposeMatrix(worldMatrix));
    
          //LIGHTS
          glMain.uniform4fv(locationsArray[0].materialColorHandle, [assetsData[i].drawInfo.ambientColor[0], assetsData[i].drawInfo.ambientColor[1], assetsData[i].drawInfo.ambientColor[2], 1.0]);
          glMain.uniform4fv(locationsArray[0].specularColorHandle, specularColor);
          glMain.uniform4fv(locationsArray[0].lightSwitch, lightSwitch);
          glMain.uniform1f(locationsArray[0].specShine, specularShine);
          glMain.uniform4fv(locationsArray[0].ambientLight, ambientLight);
          glMain.uniform4fv(locationsArray[0].ambientLightLowColor, ambientLightBottom);
          glMain.uniform4fv(locationsArray[0].ambientLightHighColor, ambientLightTop);
    
          //Directional Light
          var directionalLightDirTransform = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(lightDirMatrix), directionalLightDir);
          glMain.uniform3fv(locationsArray[0].directionalLightDir, directionalLightDirTransform);
          glMain.uniform4fv(locationsArray[0].directionalLightCol, directionalLightColor);
          //Point light
          glMain.uniform3fv(locationsArray[0].pointLightPosition, pointLightPosition);
          glMain.uniform4fv(locationsArray[0].pointLightColor, pointLightColor);
          glMain.uniform1f(locationsArray[0].pointLightDeacy, pointLightDecay);
          glMain.uniform1f(locationsArray[0].pointLightTarget, pointLightTarget);
    
          //Spot light
          glMain.uniform3fv(locationsArray[0].spotLightPosition, spotLightPos);
          glMain.uniform4fv(locationsArray[0].spotLightColor, spotLightColor);
          var spotLightDirTransform = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(lightDirMatrix), spotLightDir);
          glMain.uniform3fv(locationsArray[0].spotLightDir, spotLightDirTransform);
          glMain.uniform1f(locationsArray[0].spotLightConeOut, spotLightConeOut);
          glMain.uniform1f(locationsArray[0].spotLightConeIn, spotLightConeIn);
          glMain.uniform1f(locationsArray[0].spotLightConeOut, spotLightDecay);
          glMain.uniform1f(locationsArray[0].spotLightTarget, spotLightTarget);
    
    
    
          glMain.bindVertexArray(assetsData[i].drawInfo.vao);
          glMain.drawElements(glMain.TRIANGLES, assetsData[i].structInfo.indices.length, glMain.UNSIGNED_SHORT, 0);
    
        }
    
        window.requestAnimationFrame(drawSceneItems);
      }
    
}