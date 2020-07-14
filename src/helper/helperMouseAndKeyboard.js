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
    }
  }
}
function doMouseWheel(event) {
  cz += event.wheelDelta / 1200.0;
}

var keyFunctionDown = function (e) {
  if (!keys[e.keyCode]) {
    keys[e.keyCode] = true;
    switch (e.keyCode) {

      case 83: //S
        if (selectedItem >= 0 && selectedItem < 7)
          assetsData[selectedItem].drawInfo.locations.worldParams[1] -= 0.05;
        else
          cy -= 0.05;
        break;

      case 87: //W
        if (selectedItem >= 0 && selectedItem < 7)
          assetsData[selectedItem].drawInfo.locations.worldParams[1] += 0.05;
        else
          cy += 0.05;
        break;

      case 68: //D
        if (selectedItem >= 0 && selectedItem < 7)
          assetsData[selectedItem].drawInfo.locations.worldParams[0] += 0.05;
        else
          cx += 0.05;
        break;

      case 65: //A
        if (selectedItem >= 0 && selectedItem < 7)
          assetsData[selectedItem].drawInfo.locations.worldParams[0] -= 0.05;
        else
          cx -= 0.05;
        break;

      case 81: //Q
        if (selectedItem == 7)
          cz += 0.05;
        break;

      case 69: //E
        if (selectedItem == 7)
          cz -= 0.05;
        break;

      case 82: //R
        if (selectedItem >= 0 && selectedItem < 7)
          assetsData[selectedItem].drawInfo.locations.worldParams[5] -= 45.0;
        else
          angle += 1.0;
        break;

      case 84: //T
        if (selectedItem >= 0 && selectedItem < 7)
          assetsData[selectedItem].drawInfo.locations.worldParams[5] -= 45.0;
        else
          angle -= 1.0;
        break;

      case 70: //F
        if (selectedItem >= 0 && selectedItem < 7) {

          assetsData[selectedItem].drawInfo.locations.worldParams[3] += 180.0;
          assetsData[selectedItem].drawInfo.locations.worldParams[4] += 180.0;
        }
        else
          elevation += 1.0;
        break;

      case 71: //G
      console.log("dentro g");
        if (selectedItem >= 0 && selectedItem < 7) {

          assetsData[selectedItem].drawInfo.locations.worldParams[3] -= 180.0;
          assetsData[selectedItem].drawInfo.locations.worldParams[4] -= 180.0;
        }
        else
          elevation -= 1.0;
        break;

      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
        if (selectedItem >= 0 && selectedItem < 7)
          assetsData[selectedItem].drawInfo.locations.worldParams[2] -= 0.1;
        selectedItem = e.keyCode - 49;
        if (selectedItem >= 0 && selectedItem < 7)
          assetsData[selectedItem].drawInfo.locations.worldParams[2] += 0.1;

        break;






    }
    keys[e.keyCode] = false;
  }
}
