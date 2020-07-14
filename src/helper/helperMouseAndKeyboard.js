var mouseState = false;
var lastMouseX = -100, lastMouseY = -100;

function doMouseDown(event) {
  //console.log(assetsData[0].drawInfo.locations.worldMatrix);
  //checkIntersectionTriangle(event, assetsData, perspectiveMatrix, viewMatrix);
  lastMouseX = event.pageX;
  lastMouseY = event.pageY;
  mouseState = true;
}
function doMouseUp(event) {
  lastMouseX = -100;
  lastMouseY = -100;
  mouseState = false;
}
function doMouseMove(event) {
  if (mouseState) {
    var dx = event.pageX - lastMouseX;
    var dy = lastMouseY - event.pageY;
    lastMouseX = event.pageX;
    lastMouseY = event.pageY;

    if ((dx != 0) || (dy != 0)) {
      cx = cx + dx / 500;
      cy = cy + dy / 500;
      /*angle += dx/2;
      elevation += dy/2;*/
    }
  }
}
function doMouseWheel(event) {
  var nLookRadius = lookRadius + event.wheelDelta / 200.0;
  if ((nLookRadius > 2.0) && (nLookRadius < 100.0)) {
    lookRadius = nLookRadius;
  }
}

var keyFunctionDown = function (e) {
    if (!keys[e.keyCode]) {
      keys[e.keyCode] = true;
      switch (e.keyCode) {
  
        case 83: //S
          cy -= 0.05;
          break;
  
        case 87: //W
          cy += 0.05;
          break;
  
        case 68: //D
          cx += 0.05;
          break;
  
        case 65: //A
          cx -= 0.05;
          break;
  
        case 81: //Q
          cz += 0.05;
          break;
  
        case 69: //E
          cz -= 0.05;
          break;
  
        case 82: //R
          angle += 1.0;
          break;
  
        case 84: //T
          angle -= 1.0;
          break;
  
        case 70: //F
          elevation += 1.0;
          break;
  
        case 71: //G
          elevation -= 1.0;
          break;
  
  
  
  
  
  
      }
      keys[e.keyCode] = false;
    }
  }
  