function checkSolution(utentMatrix, solutionMatrix) {

    var error = 0.1;

    var deltaTranX = utentMatrix[4][0] - solutionMatrix[4][0];
    var deltaTranY = utentMatrix[4][1] - solutionMatrix[4][1];

    for (i = 0; i < 7; i++) {
        utentMatrix[i][0] -= deltaTranX;
        utentMatrix[i][1] -= deltaTranY;

        utentMatrix[i][0] -= solutionMatrix[i][0];
        utentMatrix[i][1] -= solutionMatrix[i][1];

        utentMatrix[i][2] %= 360;

    }

    utentMatrix[5][2] %= 90;
    solutionMatrix[5][2] %= 90;

    utentMatrix[6][2] %= 180;
    solutionMatrix[6][2] %= 180;



    return checkTwoTriangles(utentMatrix[0], utentMatrix[1], 0) &&
        checkTwoTriangles(utentMatrix[2], utentMatrix[3], 2) &&
        checkSingle(utentMatrix[4]) &&
        checkSingle(utentMatrix[5]) &&
        checkSingle(utentMatrix[6]);



    function checkTwoTriangles(t1, t2, firstIndices) {

        if (Math.abs(t1[0] - t2[0]) < error &&
            Math.abs(t1[1] - t2[1]) < error) {

            if (t1[2] == solutionMatrix[firstIndices][2] &&
                t2[2] == solutionMatrix[firstIndices + 1][2])
                return true;

            if (t1[2] == solutionMatrix[firstIndices + 1][2] &&
                t2[2] == solutionMatrix[firstIndices][2])
                return true;

        }

        return false;


    }

    function checkSingle(t1) {

        if (Math.abs(t1[0]) < error &&
            Math.abs(t1[1]) < error &&
            t1[2] == solutionMatrix[4][2])
            return true;

        return false;

    }

}