function checkSolution(idSetup) {

    var error = 0.1;
    var utentMatrix = new Array(7);
    var solutionMatrix = setups[idSetup].positionMatrix;

    for (i = 0; i < 7; i++) {

        utentMatrix[i] = Object.assign({}, assetsData[i].drawInfo.locations.worldParams);


    }


    console.log(setups[idSetup].name);
    var deltaTranX = utentMatrix[4][0] - solutionMatrix[4][0];
    var deltaTranY = utentMatrix[4][1] - solutionMatrix[4][1];

    //console.log(utentMatrix);
    for (i = 0; i < 7; i++) {
        utentMatrix[i][0] -= deltaTranX;
        utentMatrix[i][1] -= deltaTranY;

        utentMatrix[i][0] -= solutionMatrix[i][0];
        utentMatrix[i][1] -= solutionMatrix[i][1];

        for (j = 3; j < 6; j++) {
            while (utentMatrix[i][j] < 0)
                utentMatrix[i][j] += 360

            utentMatrix[i][j] %= 360;
        }

        if (i < 6 && utentMatrix[i][3] == 180 && utentMatrix[i][4] == 180) {

            utentMatrix[i][5] += 180;
            utentMatrix[i][5] %= 360;
        }
    }

    utentMatrix[5][5] %= 90;
    solutionMatrix[5][2] %= 90;

    utentMatrix[6][5] %= 180;
    solutionMatrix[6][2] %= 180;

    console.log(utentMatrix);

    return checkTwoTriangles(utentMatrix[0], utentMatrix[1], 0) &&
        checkTwoTriangles(utentMatrix[2], utentMatrix[3], 2) &&
        checkSingle(utentMatrix[4], 4) &&
        checkSingle(utentMatrix[5], 5) &&
        checkSingle(utentMatrix[6], 6) &&
        (utentMatrix[6][4] == setups[idSetup].flippedParallelogram);



    function checkTwoTriangles(t1, t2, firstIndex) {

        if (Math.abs(t1[0]) < error &&
            Math.abs(t1[1]) < error &&
            Math.abs(t2[0]) < error &&
            Math.abs(t2[1]) < error &&
            t1[5] == solutionMatrix[firstIndex][2] &&
            t2[5] == solutionMatrix[firstIndex + 1][2])

            return true;

        if (Math.abs(t1[0] + t2[0]) < error &&
            Math.abs(t1[1] + t2[1]) < error &&
            t1[5] == solutionMatrix[firstIndex + 1][2] &&
            t2[5] == solutionMatrix[firstIndex][2])
            return true;



        return false;


    }

    function checkSingle(t1, index) {

        if (Math.abs(t1[0]) < error &&
            Math.abs(t1[1]) < error &&
            t1[5] == solutionMatrix[index][2])
            return true;

        return false;

    }

}

function checkNotOverlap(indexItemToCheck) {


    var myItem = modifyVertices(indexItemToCheck)


    for (i = 0; i < 7; i++) {

        if (i != indexItemToCheck) {


            var otherItem = modifyVertices(i);

            for (j = 0; j < myItem.length; j++) {

                if (inside(myItem[j], otherItem))
                    return false;
            }

            for (j = 0; j < otherItem.length; j++) {

                if (inside(otherItem[j], myItem))
                    return false;
            }

            for (j = 0; j < otherItem.length; j++) {


                if (inside(calculateAveragePoints(otherItem, i)[j], myItem))
                    return false;
            }

            for (j = 0; j < myItem.length; j++) {

                if (inside(calculateAveragePoints(myItem, indexItemToCheck)[j], otherItem))
                    return false;
            }


        }
    }

    return true;




}

function inside(point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0], y = point[1];


    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

function modifyVertices(index) {

    var item;

    if (assetsData[index].type == AssetType.TRIANGLE)
        item = new Array(3);
    else
        item = new Array(4);

    var worldLocation = assetsData[index].drawInfo.locations.worldParams;



    for (k = 0; k < item.length; k++) {

        item[k] = [assetsData[index].structInfo.vertices[3 * k], assetsData[index].structInfo.vertices[3 * k + 1], 0.0, 1.0];

        item[k] = utils.multiplyMatrixVector(
            utils.MakeWorld(worldLocation[0], worldLocation[1], worldLocation[2], worldLocation[3],
                worldLocation[4], worldLocation[5], worldLocation[6])
            , item[k]);
    }


    return item;

}

function calculateAveragePoints(item, index) {


    var newItem;

    if (assetsData[index].type == AssetType.TRIANGLE)
        newItem = new Array(3);
    else
        newItem = new Array(4);

    for (k = 0; k < newItem.length; k++) {

        newItem[k] = new Array(2);
        newItem[k][0] = (item[k][0] + item[(k + 1) % newItem.length][0]) / 2;
        newItem[k][1] = (item[k][1] + item[(k + 1) % newItem.length][1]) / 2;
    }

    return newItem;
}