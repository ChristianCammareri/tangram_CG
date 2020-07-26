/* Ottieni dal DOM la canvas utilizzata per mostrare l'area di gioco, ottieni il context di WebGL 2
    e lo inizializzi (settando la viewport, pulendo il color buffer e abilitando il depth test) */
function getCanvas() {

    var canvas = document.getElementById("c");

    gl = canvas.getContext("webgl2");
    if (!gl) {
        document.write("GL context not opened");
        return;
    }

    utils.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.85, 0.85, 0.85, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    return canvas;
}

/* Funzione analoga, che svolge i medesimi compiti per la canvas dedicata all'overlay (in cui è rappresentata
    la soluzione del livello corrente) */
function getCanvasOverlay() {
    var canvasOverlay = document.getElementById("overlay");

    let glOverlay = canvasOverlay.getContext("webgl2");
    if (!glOverlay) {
        document.write("Overlay Canvas: GL context not opened");
        return;
    }

    utils.resizeCanvasToDisplaySize(glOverlay.canvas);

    glOverlay.viewport(0, 0, glOverlay.canvas.width, glOverlay.canvas.height);
    glOverlay.clearColor(1.0, 1.0, 1.0, 1.0);
    glOverlay.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    glOverlay.enable(gl.DEPTH_TEST);

    return canvasOverlay;
}

/* Inizializza il program (identificato da shadersType), creando per quel program l'array (globale)
contenente le location degli attributi e delle uniformi utilizzati negli shader associati. Infine
crea il Vertex Array Object e ne fa il binding. */
function initializeProgram(gl, shadersType) {
    getAttributeAndUniformLocation(gl, shadersType);
    createVAO(gl, shadersType)
}

/* Crea un array rappresentato in formato JSON e lo salva su locationArray relativo al program
identificato da shadersType. */
function getAttributeAndUniformLocation(gl, shadersType) {

    var positionAttributeLocation = gl.getAttribLocation(programsArray[shadersType], "inPosition");
    var normalAttributeLocation = gl.getAttribLocation(programsArray[shadersType], "inNormal");

    var matrixLocation = gl.getUniformLocation(programsArray[shadersType], "matrix");
    var materialColorHandle;

    if (shadersType !== ShadersType.FLOOR)
        materialColorHandle = gl.getUniformLocation(programsArray[shadersType], 'materialColor');

    if (shadersType === ShadersType.SOLUTION) {
        locationsArray[shadersType] = {
            "positionAttributeLocation": positionAttributeLocation,
            "normalAttributeLocation": normalAttributeLocation,
            "matrixLocation": matrixLocation,

            "materialColorHandle": materialColorHandle,
        };
        return;
    }

    var normalMatrixPositionHandle = gl.getUniformLocation(programsArray[shadersType], 'nMatrix');
    var vertexMatrixPositionHandle = gl.getUniformLocation(programsArray[shadersType], 'pMatrix');

    //LIGHTS
    var specularColorHandle = gl.getUniformLocation(programsArray[shadersType], 'specularColor');
    var specShine = gl.getUniformLocation(programsArray[shadersType], 'SpecShine');
    //Directional Light
    var directionalLightDir = gl.getUniformLocation(programsArray[shadersType], 'LADir');
    var directionalLightCol = gl.getUniformLocation(programsArray[shadersType], 'LACol');


    //LIGHTS
    var lightSwitch = gl.getUniformLocation(programsArray[shadersType], 'lightSwitch');
    var lightDirMatrix = gl.getUniformLocation(programsArray[shadersType], 'lightDirMatrix');
    var lightPosMatrix = gl.getUniformLocation(programsArray[shadersType], 'lightPosMatrix');

    //Point light
    var pointLightPosition = gl.getUniformLocation(programsArray[shadersType], 'LBPos');
    var pointLightColor = gl.getUniformLocation(programsArray[shadersType], 'LBCol');
    var pointLightDecay = gl.getUniformLocation(programsArray[shadersType], 'LBDecay');
    var pointLightTarget = gl.getUniformLocation(programsArray[shadersType], 'LBTarget');

    //Spotligh light
    var spotLightPosition = gl.getUniformLocation(programsArray[shadersType], 'LCPos');
    var spotLightColor = gl.getUniformLocation(programsArray[shadersType], 'LCCol');
    var spotLightDir = gl.getUniformLocation(programsArray[shadersType], 'LCDir');
    var spotLightConeIn = gl.getUniformLocation(programsArray[shadersType], 'LCConeIn');
    var spotLightConeOut = gl.getUniformLocation(programsArray[shadersType], 'LCConeOut');
    var spotLightDecay = gl.getUniformLocation(programsArray[shadersType], 'LCDecay');
    var spotLightTarget = gl.getUniformLocation(programsArray[shadersType], 'LCTarget');


    if (shadersType === ShadersType.ITEM) {
        locationsArray[shadersType] = {
            "positionAttributeLocation": positionAttributeLocation,
            "normalAttributeLocation": normalAttributeLocation,
            "matrixLocation": matrixLocation,

            //LIGHTS

            "lightPosMatrix": lightPosMatrix,
            "lightDirMatrix": lightDirMatrix,

            "lightSwitch": lightSwitch,
            "materialColorHandle": materialColorHandle,
            "specularColorHandle": specularColorHandle,
            "specShine": specShine,
            //directional
            "directionalLightDir": directionalLightDir,
            "directionalLightCol": directionalLightCol,

            //pointlight
            "pointLightPosition": pointLightPosition,
            "pointLightColor": pointLightColor,
            "pointLightDecay": pointLightDecay,
            "pointLightTarget": pointLightTarget,

            //spotlight
            "spotLightPosition": spotLightPosition,
            "spotLightColor": spotLightColor,
            "spotLightDir": spotLightDir,
            "spotLightConeIn": spotLightConeIn,
            "spotLightConeOut": spotLightConeOut,
            "spotLightDecay": spotLightDecay,
            "spotLightTarget": spotLightTarget,

            "normalMatrixPositionHandle": normalMatrixPositionHandle,
            "vertexMatrixPositionHandle": vertexMatrixPositionHandle
        };

        return;
    }

    var textLocation = gl.getUniformLocation(programsArray[ShadersType.FLOOR], "u_texture");
    var uvAttributeLocation = gl.getAttribLocation(programsArray[ShadersType.FLOOR], "in_uv");

    locationsArray[shadersType] = {
        "positionAttributeLocation": positionAttributeLocation,
        "normalAttributeLocation": normalAttributeLocation,
        "matrixLocation": matrixLocation,

        //LIGHTS
        "lightPosMatrix": lightPosMatrix,
        "lightDirMatrix": lightDirMatrix,

        "lightSwitch": lightSwitch,
        "specularColorHandle": specularColorHandle,
        "specShine": specShine,
        //directional
        "directionalLightDir": directionalLightDir,
        "directionalLightCol": directionalLightCol,

        //pointlight
        "pointLightPosition": pointLightPosition,
        "pointLightColor": pointLightColor,
        "pointLightDecay": pointLightDecay,
        "pointLightTarget": pointLightTarget,

        //spotlight
        "spotLightPosition": spotLightPosition,
        "spotLightColor": spotLightColor,
        "spotLightDir": spotLightDir,
        "spotLightConeIn": spotLightConeIn,
        "spotLightConeOut": spotLightConeOut,
        "spotLightDecay": spotLightDecay,
        "spotLightTarget": spotLightTarget,

        "normalMatrixPositionHandle": normalMatrixPositionHandle,
        "vertexMatrixPositionHandle": vertexMatrixPositionHandle,

        "uvAttributeLocation": uvAttributeLocation,
        "textLocation": textLocation
    };

}

function createVAO(gl, shadersType) {

    switch (shadersType) {

        case ShadersType.ITEM:
            for (var i = 0; i < assetsData.length; i++) {

                assetsData[i].drawInfo.vao = gl.createVertexArray();
                gl.bindVertexArray(assetsData[i].drawInfo.vao);

                putAttributesOnGPU(gl, locationsArray[shadersType].positionAttributeLocation, assetsData[i].structInfo.vertices, 3);

                putAttributesOnGPU(gl, locationsArray[shadersType].normalAttributeLocation, assetsData[i].structInfo.normals, 3);

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(assetsData[i].structInfo.indices), gl.STATIC_DRAW);
            }
            break;

        case ShadersType.SOLUTION:

            for (var i = 0; i < assetsData.length; i++) {
                assetsData[i].drawInfo.vaoOverlay = gl.createVertexArray();
                gl.bindVertexArray(assetsData[i].drawInfo.vaoOverlay);

                putAttributesOnGPU(gl, locationsArray[shadersType].positionAttributeLocation, assetsData[i].structInfo.vertices2D, 3);

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(assetsData[i].structInfo.indices2D), gl.STATIC_DRAW);
            }
            break;

        case ShadersType.FLOOR:
            assetsFloor.drawInfo.vao = gl.createVertexArray();
            gl.bindVertexArray(assetsFloor.drawInfo.vao);

            putAttributesOnGPU(gl, locationsArray[ShadersType.FLOOR].positionAttributeLocation, assetsFloor.structInfo.vertices, 3);

            putAttributesOnGPU(gl, locationsArray[ShadersType.FLOOR].normalAttributeLocation, assetsFloor.structInfo.normals, 3);

            putAttributesOnGPU(gl, locationsArray[ShadersType.FLOOR].uvAttributeLocation, assetsFloor.structInfo.uv, 2);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(assetsFloor.structInfo.indices), gl.STATIC_DRAW);

            createTexture(gl);
            break;
    }
}

function putAttributesOnGPU(gl, location, data, length) {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, length, gl.FLOAT, false, 0, 0);

}

function initPosition() {
    const idSetup = 0;
    for (i = 0; i < assetsData.length; i++) {
        assetsData[i].drawInfo.worldParams = [setups[idSetup].positionMatrix[i][0], setups[idSetup].positionMatrix[i][1], 0.0, 0.0, 0.0, setups[idSetup].positionMatrix[i][2], 1.0];
    }

    if (setups[idSetup].flippedParallelogram == 180.0) {
        assetsData[6].drawInfo.worldParams = [setups[idSetup].positionMatrix[6][0], setups[idSetup].positionMatrix[6][1], 0.0, 0.0, 180.0, setups[idSetup].positionMatrix[6][2], 1.0];
    }
}

function initPositionSolution(idSetup) {
    for (i = 0; i < assetsData.length - 1; i++) {
        assetsData[i].drawInfo.worldMatrixSolution = utils.MakeWorld(setups[idSetup].positionMatrix[i][0], setups[idSetup].positionMatrix[i][1], 0.0, 0.0, 0.0, setups[idSetup].positionMatrix[i][2], 1.0);
    }

    if (setups[idSetup].flippedParallelogram == 180.0)
        assetsData[i].drawInfo.worldMatrixSolution = utils.MakeWorld(setups[idSetup].positionMatrix[i][0], setups[idSetup].positionMatrix[i][1], 0.0, 0.0, 180.0, setups[idSetup].positionMatrix[i][2], 1.0);
    else
        assetsData[i].drawInfo.worldMatrixSolution = utils.MakeWorld(setups[idSetup].positionMatrix[i][0], setups[idSetup].positionMatrix[i][1], 0.0, 0.0, 0.0, setups[idSetup].positionMatrix[i][2], 1.0);
}

function createTexture(gl) {
    assetsFloor.drawInfo.texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, assetsFloor.drawInfo.texture);
    var image = new Image();
    image.src = imagePath;
    image.onload = function () {
        gl.bindTexture(gl.TEXTURE_2D, assetsFloor.drawInfo.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        gl.generateMipmap(gl.TEXTURE_2D);
    }
}