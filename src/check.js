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