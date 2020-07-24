var canvas, glMain, overlay, glOverlay;

async function init(){

  canvas = getCanvas();
  glMain = canvas.getContext("webgl2");
  overlay = getCanvasOverlay();
  glOverlay = overlay.getContext("webgl2");
  if (!glMain || !glOverlay) {
    document.write("GL context not opened: " + glMain + glOverlay);
    return;
  }
  utils.resizeCanvasToDisplaySize(glMain.canvas);
    
  //MultipleShaders
  await utils.loadFiles([shadersPath.vs, shadersPath.fs], function (shaderText) {
      var vertexShader = utils.createShader(glMain, glMain.VERTEX_SHADER, shaderText[0]);
      var fragmentShader = utils.createShader(glMain, glMain.FRAGMENT_SHADER, shaderText[1]);

      programsArray[ShadersType.ITEM] = utils.createProgram(glMain, vertexShader, fragmentShader);
    });
    
    await utils.loadFiles([shadersPath.vsFloor, shadersPath.fsFloor], function (shaderText) {
      var vertexShader = utils.createShader(glMain, glMain.VERTEX_SHADER, shaderText[0]);
      var fragmentShader = utils.createShader(glMain, glMain.FRAGMENT_SHADER, shaderText[1]);

      programsArray[ShadersType.FLOOR] = utils.createProgram(glMain, vertexShader, fragmentShader);
    });
    
      await utils.loadFiles([shadersPath.ovs, shadersPath.ofs], function (shaderText) {
      var vertexShader = utils.createShader(glOverlay, glOverlay.VERTEX_SHADER, shaderText[0]);
      var fragmentShader = utils.createShader(glOverlay, glOverlay.FRAGMENT_SHADER, shaderText[1]);

      programsArray[ShadersType.SOLUTION] = utils.createProgram(glOverlay, vertexShader, fragmentShader);
    });

    main();
}

function main() {


  //var canvas = getCanvas();

  canvas.addEventListener("mousedown", doMouseDown, false);
  canvas.addEventListener("mouseup", doMouseUp, false);
  canvas.addEventListener("mousemove", doMouseMove, false);
  canvas.addEventListener("mousewheel", doMouseWheel, false);

  window.addEventListener("keydown", keyFunctionDown, false);

  //gl = canvas.getContext("webgl2");

  width = glMain.canvas.width;
  height = glMain.canvas.height;

  perspectiveMatrix = utils.MakePerspective(90, width / height, 0.1, 100.0);

  initializeProgram(glMain, ShadersType.ITEM);

  initPosition(0);
  drawScene();
  //drawOverlay();
  //drawFloor(glMain);

  function drawScene() {
    
    viewMatrix = utils.MakeView(cx, cy, cz, elevation, angle);

    var lightDirMatrix = utils.invertMatrix(utils.transposeMatrix(viewMatrix));

    var lightDirectionTransformed = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(lightDirMatrix), directionalLightDir);

    

    for (i = 0; i < assetsData.length; i++) {
      glMain.useProgram(programsArray[ShadersType.ITEM]);

      var worldLocation = assetsData[i].drawInfo.worldParams;
      assetsData[i].drawInfo.worldMatrix = utils.MakeWorld(worldLocation[0], worldLocation[1], worldLocation[2], worldLocation[3], worldLocation[4], worldLocation[5], worldLocation[6]); //TODO eliminare objects world matrix in futuro

      var worldViewMatrix = utils.multiplyMatrices(viewMatrix, assetsData[i].drawInfo.worldMatrix);
      var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, worldViewMatrix);

      var cubeNormalMatrix = utils.invertMatrix(utils.transposeMatrix(worldViewMatrix));


      glMain.uniformMatrix4fv(locationsArray[0].matrixLocation, glMain.FALSE, utils.transposeMatrix(projectionMatrix));
      glMain.uniformMatrix4fv(locationsArray[0].normalMatrixPositionHandle, glMain.FALSE, utils.transposeMatrix(cubeNormalMatrix));
      glMain.uniformMatrix4fv(locationsArray[0].vertexMatrixPositionHandle, glMain.FALSE, utils.transposeMatrix(assetsData[i].drawInfo.worldMatrix));

      glMain.uniform3fv(locationsArray[0].materialColorHandle, assetsData[i].drawInfo.ambientColor);
      glMain.uniform3fv(locationsArray[0].specularColorHandle, [1.0, 1.0, 1.0]);

      //gl.uniform3fv(locationsArray.lightPositionHandle, positionLight);
      //gl.uniform3fv(locationsArray.lightColorHandle, directionalLightColor);
//      gl.uniform3fv(locationsArray.lightDirectionHandle, lightDirectionTransformed);
      glMain.uniform3fv(locationsArray[0].pointLightPosition, pointLightPosition);
      glMain.uniform3fv(locationsArray[0].pointLightColor, pointLightColor);
     // gl.uniform3fv(locationsArray.pointLightDir, pointLightDir)
      //gl.uniform3fv()
      

      glMain.uniform1f(locationsArray[0].decayHandle, defaultDecay);
      glMain.uniform1f(locationsArray[0].targetHandle, 10.0);

      glMain.uniform1f(locationsArray[0].specShine, defaultSpecShine);

      glMain.bindVertexArray(assetsData[i].drawInfo.vao);
      glMain.drawElements(glMain.TRIANGLES, assetsData[i].structInfo.indices.length, glMain.UNSIGNED_SHORT, 0);

    }

    window.requestAnimationFrame(drawScene);
  }


}

window.onload = init;
