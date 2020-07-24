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




function initializeProgram(gl, shadersType) {

    if (shadersType == ShadersType.FLOOR) {
        getAttributeAndUniformLocationFloor(glMain);
        createVAOFloor(glMain);
    }
    else {
        getAttributeAndUniformLocation(gl, shadersType);
        createVAO(gl, shadersType);
    }
}

function getAttributeAndUniformLocation(gl, shadersType) {

    var positionAttributeLocation = gl.getAttribLocation(programsArray[shadersType], "inPosition");
    var normalAttributeLocation = gl.getAttribLocation(programsArray[shadersType], "inNormal");

    var matrixLocation = gl.getUniformLocation(programsArray[shadersType], "matrix");
    var normalMatrixPositionHandle = gl.getUniformLocation(programsArray[shadersType], 'nMatrix');
    var vertexMatrixPositionHandle = gl.getUniformLocation(programsArray[shadersType], 'pMatrix');

    //LIGTHS
    var materialColorHandle = gl.getUniformLocation(programsArray[shadersType], 'materialColor');
    var specularColorHandle = gl.getUniformLocation(programsArray[shadersType], 'specularColor');
    var specShine = gl.getUniformLocation(programsArray[shadersType], 'SpecShine');
    //Directional Light
    var directionalLightDir = gl.getUniformLocation(programsArray[shadersType], 'LADir');
    var directionalLightCol = gl.getUniformLocation(programsArray[shadersType], 'LACol');


    if (shadersType === ShadersType.SOLUTION) {
        locationsArray[shadersType] = {
            "positionAttributeLocation": positionAttributeLocation,
            "normalAttributeLocation": normalAttributeLocation,
            "matrixLocation": matrixLocation,

            //LIGHTS
            "directionalLightDir": directionalLightDir,
            "directionalLightCol": directionalLightCol,
            "specShine": specShine,

            "normalMatrixPositionHandle": normalMatrixPositionHandle,
            "vertexMatrixPositionHandle": vertexMatrixPositionHandle
        };
        return;
    }

    //LIGHTS
    var lightSwitch = gl.getUniformLocation(programsArray[shadersType], 'lightSwitch');


    //Point light
    var pointLightPosition = gl.getUniformLocation(programsArray[shadersType], 'LBPos');
    var pointLightColor = gl.getUniformLocation(programsArray[shadersType], 'LBCol');
    var pointLightDeacy = gl.getUniformLocation(programsArray[shadersType], 'LBDecay');
    var pointLightTarget = gl.getUniformLocation(programsArray[shadersType], 'LBTarget');

    //Spotligh light
    var spotLightPosition = gl.getUniformLocation(programsArray[shadersType], 'LCPos');
    var spotLightColor = gl.getUniformLocation(programsArray[shadersType], 'LCCol');
    var spotLightDir = gl.getUniformLocation(programsArray[shadersType], 'LCDir');
    var spotLightConeIn = gl.getUniformLocation(programsArray[shadersType], 'LCConeIn');
    var spotLightConeOut = gl.getUniformLocation(programsArray[shadersType], 'LCConeOut');
    var spotLightDeacy = gl.getUniformLocation(programsArray[shadersType], 'LCDecay');
    var spotLightTarget = gl.getUniformLocation(programsArray[shadersType], 'LCTarget');



    locationsArray[shadersType] = {
        "positionAttributeLocation": positionAttributeLocation,
        "normalAttributeLocation": normalAttributeLocation,
        "matrixLocation": matrixLocation,

        //LIGHTS
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
        "pointLightDeacy": pointLightDeacy,
        "pointLightTarget": pointLightTarget,

        //spotlight
        "spotLightPosition": spotLightPosition,
        "spotLightColor": spotLightColor,
        "spotLightDir": spotLightDir,
        "spotLightConeIn": spotLightConeIn,
        "spotLightConeOut": spotLightConeOut,
        "spotLightDeacy": spotLightDeacy,
        "spotLightTarget": spotLightTarget,

        "normalMatrixPositionHandle": normalMatrixPositionHandle,
        "vertexMatrixPositionHandle": vertexMatrixPositionHandle
    };

    return;

}

function createVAO(gl, shadersType) {

    if (shadersType === ShadersType.ITEM) {
        for (var i = 0; i < assetsData.length; i++) {

            assetsData[i].drawInfo.vao = gl.createVertexArray();
            gl.bindVertexArray(assetsData[i].drawInfo.vao);

            gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(assetsData[i].structInfo.vertices), gl.STATIC_DRAW);
            putAttributesOnGPU(gl, locationsArray[shadersType].positionAttributeLocation);

            gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(assetsData[i].structInfo.normals), gl.STATIC_DRAW);
            putAttributesOnGPU(gl, locationsArray[shadersType].normalAttributeLocation);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(assetsData[i].structInfo.indices), gl.STATIC_DRAW);
        }
    }
    else {
        for (var i = 0; i < assetsData.length; i++) {

            assetsData[i].drawInfo.vaoOverlay = gl.createVertexArray();
            gl.bindVertexArray(assetsData[i].drawInfo.vaoOverlay);

            gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(assetsData[i].structInfo.vertices2D), gl.STATIC_DRAW);
            putAttributesOnGPU(gl, locationsArray[shadersType].positionAttributeLocation);

            gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(assetsData[i].structInfo.normals2D), gl.STATIC_DRAW);
            putAttributesOnGPU(gl, locationsArray[shadersType].normalAttributeLocation);

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(assetsData[i].structInfo.indices2D), gl.STATIC_DRAW);
        }
    }

}

function putAttributesOnGPU(gl, location) {

    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);

}

function initPosition(idSetup) {

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
        console.log(assetsData[i].drawInfo.worldMatrixSolution);

    }


    if (setups[idSetup].flippedParallelogram == 180.0)
        assetsData[i].drawInfo.worldMatrixSolution = utils.MakeWorld(setups[idSetup].positionMatrix[i][0], setups[idSetup].positionMatrix[i][1], 0.0, 0.0, 180.0, setups[idSetup].positionMatrix[i][2], 1.0);


    else
        assetsData[i].drawInfo.worldMatrixSolution = utils.MakeWorld(setups[idSetup].positionMatrix[i][0], setups[idSetup].positionMatrix[i][1], 0.0, 0.0, 0.0, setups[idSetup].positionMatrix[i][2], 1.0);


}



function getAttributeAndUniformLocationFloor(gl) {

    var positionAttributeLocation = gl.getAttribLocation(programsArray[ShadersType.FLOOR], "inPosition");
    var uvAttributeLocation = gl.getAttribLocation(programsArray[ShadersType.FLOOR], "in_uv");
    var matrixLocation = gl.getUniformLocation(programsArray[ShadersType.FLOOR], "matrix");
    var textLocation = gl.getUniformLocation(programsArray[ShadersType.FLOOR], "u_texture");

    locationsArray[ShadersType.FLOOR] = {
        "positionAttributeLocation": positionAttributeLocation,
        "uvAttributeLocation": uvAttributeLocation,
        "matrixLocation": matrixLocation,
        "textLocation": textLocation
    };

}

function createVAOFloor(gl) {

    assetsFloor.drawInfo.vao = gl.createVertexArray();
    gl.bindVertexArray(assetsFloor.drawInfo.vao);

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(assetsFloor.structInfo.vertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(locationsArray[ShadersType.FLOOR].positionAttributeLocation);
    gl.vertexAttribPointer(locationsArray[ShadersType.FLOOR].positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    var uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(assetsFloor.structInfo.uv), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(locationsArray[ShadersType.FLOOR].uvAttributeLocation);
    gl.vertexAttribPointer(locationsArray[ShadersType.FLOOR].uvAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(assetsFloor.structInfo.indices), gl.STATIC_DRAW);


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


