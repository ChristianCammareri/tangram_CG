//Funzione che controlla se la soluzione proposta dall'utente è giusta
function checkSolution(idSetup) {

    var error = 0.1;
    var utentMatrix = new Array(7);
    var solutionMatrix = setups[idSetup].positionMatrix;

    //Copio i parametri della worldMatrix degli items.
    for (i = 0; i < 7; i++) {
        utentMatrix[i] = Object.assign({}, assetsData[i].drawInfo.worldParams);
    }

    //Calcolo la traslazione dell'assetto proposto dall'utente rispetto a quello esatto.
    //Utilizziamo il triangolo diverso dagli altri per calcolare la distanza della soluzione proposta
    //da quella non traslata.
    var deltaTranX = utentMatrix[4][0] - solutionMatrix[4][0];
    var deltaTranY = utentMatrix[4][1] - solutionMatrix[4][1];

    //Sottraggo quindi prima la traslazione e poi faccio la differenza tra le matrici:
    //nel caso migliore avrò una matrice di zeri.
    //Setto inoltre tutte le rotazioni nel range [0,360].
    for (i = 0; i < 7; i++) {
        utentMatrix[i][0] -= deltaTranX;
        utentMatrix[i][1] -= deltaTranY;

        utentMatrix[i][0] -= solutionMatrix[i][0];
        utentMatrix[i][1] -= solutionMatrix[i][1];

        //Da 3 a 5 parametri di rotazione
        for (j = 3; j < 6; j++) {
            while (utentMatrix[i][j] < 0)
                utentMatrix[i][j] += 360

            utentMatrix[i][j] %= 360;
        }

        // i < 6 ==> Stiamo analizzando i triangoli, e vediamo se sono ribaltati:
        // nel caso in cui lo siano, somma 180 gradi alla rotazione rispetto all'asse z
        // (tenendo conto del modulo 360)
        if (i < 6 && utentMatrix[i][3] == 180 && utentMatrix[i][4] == 180) {

            utentMatrix[i][5] += 180;
            utentMatrix[i][5] %= 360;
        }
    }

    //Setto la rotazione del quadrato nel range [0,90] e quella del parallelogramma nel range [0,180].
    utentMatrix[5][5] %= 90;
    solutionMatrix[5][2] %= 90;

    utentMatrix[6][5] %= 180;
    solutionMatrix[6][2] %= 180;

    //Controllo quindi le coppie di triangoli uguali, gli items singoli e che il parallelogramma sia girato 
    //nel verso giusto (per gli altri items il ribaltamento è considerato come una rotazione di 180 gradi). 
    return checkTwoTriangles(utentMatrix[0], utentMatrix[1], 0) &&
        checkTwoTriangles(utentMatrix[2], utentMatrix[3], 2) &&
        checkSingle(utentMatrix[4], 4) &&
        checkSingle(utentMatrix[5], 5) &&
        checkSingle(utentMatrix[6], 6) &&
        (utentMatrix[6][4] == setups[idSetup].flippedParallelogram);

    //Controllo se la differenza tra le matrici calcolata precedentemente sia minore di un certo errore e
    //se l'item abbia la giusta rotazione. Inoltre per le coppie di triangoli il controllo viene fatto anche
    //sostituendo un triangolo all'altro e viceversa. 
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

//Funziona che controlla se sia possibile rilasciare un item in quanto potrebbe essercene un altro sotto
//return true se posso rilasciare l'item, altrimenti false.
function checkNotOverlap(indexItemToCheck) {

    //Con la relativa worldMatrix calcolo le traslazioni dei vertici dell'item.
    var myItem = modifyVertices(indexItemToCheck)

    for (var i = 0; i < 7; i++) {

        if (i != indexItemToCheck) {
            var otherItem = modifyVertices(i);
            //Controllo un lato dell'item alla volta.
            for (var k = 0; k < myItem.length; k++) {

                //Controllo se il lato appartiene ad una retta passante anche per un lato dell'alto item:
                //in questo caso sicuramente non si sovrappongono.
                if (!checkLimits(myItem[k], myItem[(k + 1) % myItem.length], otherItem)) {

                    //Controllo se i punti appartenenti al lato cadono dentro l'item.
                    if (checkIntermediatePoints(myItem[k], myItem[(k + 1) % myItem.length], otherItem))
                        return false
                }
            }
        }
    }
    return true;

}

function inside(point, vs) {

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

    var worldLocation = assetsData[index].drawInfo.worldParams;

    for (k = 0; k < item.length; k++) {

        item[k] = [assetsData[index].structInfo.vertices[3 * k], assetsData[index].structInfo.vertices[3 * k + 1], 0.0, 1.0];
        item[k] = utils.multiplyMatrixVector(
            utils.MakeWorld(worldLocation[0], worldLocation[1], worldLocation[2], worldLocation[3],
                worldLocation[4], worldLocation[5], worldLocation[6]), item[k]);
    }

    return item;

}

//Funzione ricorsiva che divide in due il segmento fino a quando questo è maggiore del delta.
//A questo punto controlla se le due estremità cadano dentro l'item.
function checkIntermediatePoints(p1, p2, item) {

    var delta = 0.1;
    var x1 = correctNumber(p1[0]), x2 = correctNumber(p2[0]);
    var y1 = correctNumber(p1[1]), y2 = correctNumber(p2[1]);

    if (Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)) < delta)
        return inside(p1, item) || inside(p2, item);

    return checkIntermediatePoints(p1, [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2], item) ||
        checkIntermediatePoints([(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2], p2, item);

}

//Funziona che calcola la retta passante per myP1 e myP2 e poi controlla se i lati dell'altro item
//appartengano ad essa.
function checkLimits(myP1, myP2, item) {

    var x1 = correctNumber(myP1[0]), x2 = correctNumber(myP2[0]);
    var y1 = correctNumber(myP1[1]), y2 = correctNumber(myP2[1]);

    for (var k = 0; k < item.length; k++) {

        var p1 = item[k], p2 = item[(k + 1) % item.length];
        var line1 = buildLine(y1, p1, p2);
        var line2 = buildLine(y2, p1, p2);

        if (correctNumber(p1[1]) != correctNumber(p2[1])) {
            if (x1 == line1 &&
                x2 == line2)
                return true

        } else if (y1 == correctNumber(p1[1]) &&
            y2 == correctNumber(p1[1]))
            return true;

    }

    return false;

}

function correctNumber(num) {

    num = Number(num).toFixed(12);
    if (Math.abs(num) == 0.000000000000)
        num = 0.0;
    return parseFloat(num);
}

function buildLine(y, p1, p2) {

    return correctNumber((y - correctNumber(p1[1])) * (correctNumber(p2[0]) - correctNumber(p1[0])) / (correctNumber(p2[1]) - correctNumber(p1[1])) + correctNumber(p1[0]));

}