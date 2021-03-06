function drawFloor() {
    initializeProgram(glMain, ShadersType.FLOOR);

    drawSceneFloor();


    function drawSceneFloor(){

    
        glMain.useProgram(programsArray[ShadersType.FLOOR]);
        var viewMatrix = utils.MakeView(cx, cy, cz, elevation, angle);
        var perspectiveMatrix = utils.MakePerspective(90, width / height, 0.1, 100.0);
    
        var worldLocation = assetsFloor.drawInfo.worldParams;
        assetsFloor.drawInfo.worldMatrix = utils.MakeWorld(worldLocation[0], worldLocation[1], worldLocation[2], worldLocation[3], worldLocation[4], worldLocation[5], worldLocation[6]); 
       
        var lightDirMatrix = viewMatrix;
        var lightPosMatrix = viewMatrix;
    
        var viewWorldMatrix = utils.multiplyMatrices(viewMatrix, assetsFloor.drawInfo.worldMatrix);
        var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);
        var floorNormalMatrix = utils.invertMatrix(utils.transposeMatrix(viewWorldMatrix));
       
        glMain.uniformMatrix4fv(locationsArray[ShadersType.FLOOR].matrixLocation, glMain.FALSE, utils.transposeMatrix(projectionMatrix));
        glMain.uniformMatrix4fv(locationsArray[ShadersType.FLOOR].normalMatrixPositionHandle, glMain.FALSE, utils.transposeMatrix(floorNormalMatrix));
        glMain.uniformMatrix4fv(locationsArray[ShadersType.FLOOR].vertexMatrixPositionHandle, glMain.FALSE, utils.transposeMatrix(viewWorldMatrix));
        
        glMain.activeTexture(glMain.TEXTURE0);
        glMain.bindTexture(glMain.TEXTURE_2D, assetsFloor.drawInfo.texture);
        glMain.uniform1i(locationsArray[ShadersType.FLOOR].textLocation, 0);
        glMain.uniformMatrix4fv(locationsArray[ShadersType.FLOOR].perspectiveLocation, glMain.FALSE, perspectiveMatrix);
        //LIGHTS
        glMain.uniform4fv(locationsArray[ShadersType.FLOOR].specularColorHandle, specularColor);
        glMain.uniform4fv(locationsArray[ShadersType.FLOOR].lightSwitch, lightSwitch);
        glMain.uniform1f(locationsArray[ShadersType.FLOOR].specShine, specularShine);
        glMain.uniformMatrix4fv(locationsArray[ShadersType.FLOOR].lightDirMatrix, glMain.FALSE, utils.transposeMatrix(lightDirMatrix));
        glMain.uniformMatrix4fv(locationsArray[ShadersType.FLOOR].lightPosMatrix, glMain.FALSE, utils.transposeMatrix(lightPosMatrix));
        //Directional Light
        glMain.uniform3fv(locationsArray[ShadersType.FLOOR].directionalLightDir, directionalLightDir);
        glMain.uniform4fv(locationsArray[ShadersType.FLOOR].directionalLightCol, directionalLightColor);
        //Point light
        glMain.uniform3fv(locationsArray[ShadersType.FLOOR].pointLightPosition, pointLightPosition);
        glMain.uniform4fv(locationsArray[ShadersType.FLOOR].pointLightColor, pointLightColor);
        glMain.uniform1f(locationsArray[ShadersType.FLOOR].pointLightDecay, pointLightDecay);
        glMain.uniform1f(locationsArray[ShadersType.FLOOR].pointLightTarget, pointLightTarget);
  
        //Spot light
        glMain.uniform3fv(locationsArray[ShadersType.FLOOR].spotLightPosition, spotLightPos);
        glMain.uniform4fv(locationsArray[ShadersType.FLOOR].spotLightColor, spotLightColor);
        glMain.uniform3fv(locationsArray[ShadersType.FLOOR].spotLightDir, spotLightDir);
        glMain.uniform1f(locationsArray[ShadersType.FLOOR].spotLightConeOut, spotLightConeOut);
        glMain.uniform1f(locationsArray[ShadersType.FLOOR].spotLightConeIn, spotLightConeIn);
        glMain.uniform1f(locationsArray[ShadersType.FLOOR].spotLightTarget, spotLightTarget);
        glMain.uniform1f(locationsArray[ShadersType.FLOOR].spotLightDecay, spotLightDecay);
  

        glMain.bindVertexArray(assetsFloor.drawInfo.vao);
        glMain.drawElements(glMain.TRIANGLES, assetsFloor.structInfo.indices.length, glMain.UNSIGNED_SHORT, 0 );
        
        
        window.requestAnimationFrame(drawSceneFloor);
    }

}