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

  canvas.addEventListener("mousedown", doMouseDown, false);
  canvas.addEventListener("mouseup", doMouseUp, false);
  canvas.addEventListener("mousemove", doMouseMove, false);
  canvas.addEventListener("mousewheel", doMouseWheel, false);

  window.addEventListener("keydown", keyFunctionDown, false);

  drawItems();
  drawOverlay();
  drawFloor();

}

window.onload = init;
