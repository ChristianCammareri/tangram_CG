var mouseState = false;
var lastMouseX = -100, lastMouseY = -100;

function doMouseDown(event) {
  //console.log(assetsData[0].drawInfo.locations.worldMatrix);
  //checkIntersectionTriangle(event, assetsData, perspectiveMatrix, viewMatrix);
  lastMouseX = event.pageX;
  lastMouseY = event.pageY;
  console.log(lastMouseX);
  console.log(lastMouseY);
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
    console.log(lastMouseX);

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
        if (selectedItem == -1)
          cz += 0.05;
        break;

      case 69: //E
        if (selectedItem == -1)
          cz -= 0.05;
        break;

      case 82: //R
        if (selectedItem >= 0 && selectedItem < 7)
          assetsData[selectedItem].drawInfo.locations.worldParams[5] += 45.0;
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
        if (selectedItem >= 0 && selectedItem < 6) {

          assetsData[selectedItem].drawInfo.locations.worldParams[3] += 180.0;
          assetsData[selectedItem].drawInfo.locations.worldParams[4] += 180.0;
        } else if (selectedItem == 6)

          assetsData[selectedItem].drawInfo.locations.worldParams[4] -= 180.0;
        else
          elevation += 1.0;
        break;

      case 71: //G
        if (selectedItem >= 0 && selectedItem < 6) {

          assetsData[selectedItem].drawInfo.locations.worldParams[3] -= 180.0;
          assetsData[selectedItem].drawInfo.locations.worldParams[4] -= 180.0;
        } else if (selectedItem == 6)

          assetsData[selectedItem].drawInfo.locations.worldParams[4] -= 180.0;
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

        if (selectedItem == -1) {
          selectedItem = e.keyCode - 49;
          assetsData[selectedItem].drawInfo.locations.worldParams[2] += 0.1;
        }
        else if (selectedItem == e.keyCode - 49) {
          if (checkNotOverlap(selectedItem)) {

            assetsData[selectedItem].drawInfo.locations.worldParams[2] -= 0.1;
            selectedItem = -1;
          }
          else {
            window.alert("Eh no");
          }
        } else {
          if (checkNotOverlap(selectedItem)) {

            assetsData[selectedItem].drawInfo.locations.worldParams[2] -= 0.1;
            selectedItem = e.keyCode - 49;
            assetsData[selectedItem].drawInfo.locations.worldParams[2] += 0.1;

          }
          else {
            window.alert("Eh no");
          }
        }

        break;

      case 67: //C
        var correct = checkSolution(selectedSetup);
        if (correct)
          window.alert("Incredibileeee! Rete! Che gol!");
        else
          window.alert("Prova il check... non va!");
        break

      case 80: //P
        for (i = 0; i < assetsData.length - 1; i++)
          console.log(i + "_" + assetsData[i].drawInfo.locations.worldParams);
        break;

      case 32: //space
        initPosition();
        break;





    }
    keys[e.keyCode] = false;
  }
}
