var mouseState = false;
var lastMouseX = -100, lastMouseY = -100;

function doMouseDown(event) {
  mouseState = true;
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
    console.log(lastMouseX);
    console.log(lastMouseY);

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

      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:

        if (selectedItem == -1) {
          selectedItem = e.keyCode - 49;
          assetsData[selectedItem].drawInfo.worldParams[2] += 0.1;
        }
        else if (selectedItem == e.keyCode - 49) {
          if (checkNotOverlap(selectedItem)) {

            assetsData[selectedItem].drawInfo.worldParams[2] -= 0.1;
            selectedItem = -1;
          }
          else {
            window.alert("-Potrò posare qui il mio item?\n-Eh no, se sotto ce n'è già un altro no.\n-Ah no, non posso?");
          }
        } else {
          if (checkNotOverlap(selectedItem)) {

            assetsData[selectedItem].drawInfo.worldParams[2] -= 0.1;
            selectedItem = e.keyCode - 49;
            assetsData[selectedItem].drawInfo.worldParams[2] += 0.1;

          }
          else {
            window.alert("-Potrò posare qui il mio item?\n-Eh no, se sotto ce n'è già un altro no.\n-Ah no, non posso?");

          }
        }
        break;

      case 37: 	// Left arrow
        if (selectedItem >= 0 && selectedItem < 7)
          assetsData[selectedItem].drawInfo.worldParams[0] -= 0.025;
        break;

      case 39: 	// Right arrow
        if (selectedItem >= 0 && selectedItem < 7)
          assetsData[selectedItem].drawInfo.worldParams[0] += 0.025;
        break;

      case 38:	// Up arrow
        if (selectedItem >= 0 && selectedItem < 7)
          assetsData[selectedItem].drawInfo.worldParams[1] += 0.025;
        break;

      case 40:	// Down arrow
        if (selectedItem >= 0 && selectedItem < 7)
          assetsData[selectedItem].drawInfo.worldParams[1] -= 0.025;
        break;

      case 90: //Z
        if (selectedItem >= 0 && selectedItem < 7)
          assetsData[selectedItem].drawInfo.worldParams[5] -= 45.0;
        break;

      case 88: //X
        if (selectedItem >= 0 && selectedItem < 7)
          assetsData[selectedItem].drawInfo.worldParams[5] += 45.0;
        break;

      case 32: //space
      if (selectedItem >= 0 && selectedItem < 6) {

        assetsData[selectedItem].drawInfo.worldParams[3] += 180.0;
        assetsData[selectedItem].drawInfo.worldParams[4] += 180.0;
      } else if (selectedItem == 6)

        assetsData[selectedItem].drawInfo.worldParams[4] += 180.0;
        break;

    }
    keys[e.keyCode] = false;
  }
}
