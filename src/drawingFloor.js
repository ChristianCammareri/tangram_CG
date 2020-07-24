function drawFloor() {
    initializeProgram(glMain, ShadersType.FLOOR);

    drawSceneFloor();


    function drawSceneFloor(){

    
        glMain.useProgram(programsArray[ShadersType.FLOOR]);
        viewMatrix = utils.MakeView(cx, cy, cz, elevation, angle);
    
        var worldLocation = assetsFloor.drawInfo.worldParams;
        assetsFloor.drawInfo.worldMatrix = utils.MakeWorld(worldLocation[0], worldLocation[1], worldLocation[2], worldLocation[3], worldLocation[4], worldLocation[5], worldLocation[6]); //TODO eliminare objects world matrix in futuro
       
    
    
        var viewWorldMatrix = utils.multiplyMatrices(viewMatrix, assetsFloor.drawInfo.worldMatrix);
        var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);
       
        glMain.uniformMatrix4fv(locationsArray[ShadersType.FLOOR].matrixLocation, glMain.FALSE, utils.transposeMatrix(projectionMatrix));
        glMain.activeTexture(glMain.TEXTURE0);
        glMain.bindTexture(glMain.TEXTURE_2D, assetsFloor.drawInfo.texture);
        glMain.uniform1i(locationsArray[ShadersType.FLOOR].textLocation, 0);
    
        glMain.bindVertexArray(assetsFloor.drawInfo.vao);
        glMain.drawElements(glMain.TRIANGLES, assetsFloor.structInfo.indices.length, glMain.UNSIGNED_SHORT, 0 );
        
        
        window.requestAnimationFrame(drawSceneFloor);
    }

}