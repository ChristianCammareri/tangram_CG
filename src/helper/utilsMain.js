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

function initializeProgram(gl) {

    compileAndLinkShaders(gl);
    getAttributeAndUniformLocation(gl, 0);
    createVAO(gl,0);
}

function compileAndLinkShaders(gl) {

    var program;
    utils.loadFiles([shadersPath.vs, shadersPath.fs], function (shaderText) {
        var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
        program = utils.createProgram(gl, vertexShader, fragmentShader);
    });

    programsArray[0] = program;
    gl.useProgram(programsArray[0]);

    
    return;


}

function getAttributeAndUniformLocation(gl, shadersType) {
    

    var positionAttributeLocation = gl.getAttribLocation(programsArray[shadersType], "inPosition");
    var normalAttributeLocation = gl.getAttribLocation(programsArray[shadersType], "inNormal");

    var matrixLocation = gl.getUniformLocation(programsArray[shadersType], "matrix");
    var normalMatrixPositionHandle = gl.getUniformLocation(programsArray[shadersType], 'nMatrix');
    var vertexMatrixPositionHandle = gl.getUniformLocation(programsArray[shadersType], 'pMatrix');

    var materialColorHandle = gl.getUniformLocation(programsArray[shadersType], 'materialColor');
    var specularColorHandle = gl.getUniformLocation(programsArray[shadersType], 'specularColor');

    //Directional Light
    var lightDirectionHandle = gl.getUniformLocation(programsArray[shadersType], 'lightDirection');
    var lightPositionHandle = gl.getUniformLocation(programsArray[shadersType], 'lightPosition');
    var lightColorHandle = gl.getUniformLocation(programsArray[shadersType], 'lightColor');

    //Point light
    var pointLightPosition = gl.getUniformLocation(programsArray[shadersType], 'LBPos');
    var pointLightColor = gl.getUniformLocation(programsArray[shadersType], 'LBCol');

    //Spotligh light
    //var spotLightPosition = gl.getUniformLocation(programsArray[shadersType], 'LCPos');
    //var spotLightColor = gl.getUniformLocation(programsArray[shadersType], 'LBCol');

    var decayHandle = gl.getUniformLocation(programsArray[shadersType], 'decay');
    var targetHandle = gl.getUniformLocation(programsArray[shadersType], 'target');
    var specShine = gl.getUniformLocation(programsArray[shadersType], 'specShine');

    locationsArray[shadersType] =  {
        "positionAttributeLocation": positionAttributeLocation,
        "normalAttributeLocation": normalAttributeLocation,
        "matrixLocation": matrixLocation,

        "materialColorHandle": materialColorHandle,
        "specularColorHandle": specularColorHandle,
        "lightDirectionHandle": lightDirectionHandle,
        "lightColorHandle": lightColorHandle,
        "lightPositionHandle": lightPositionHandle,

        "decayHandle": decayHandle,
        "targetHandle": targetHandle,
        "specShine": specShine,

        "pointLightPosition":pointLightPosition,
        "pointLightColor":pointLightColor,

        //"spotLightPosition":spotLightPos,
        //"spotLightCin":spotLightCin,
        //"spotLightCout":spotLightCout,

        "normalMatrixPositionHandle": normalMatrixPositionHandle,
        "vertexMatrixPositionHandle": vertexMatrixPositionHandle
    };

    return;

}

function createVAO(gl,shadersType) {

    for (i = 0; i < assetsData.length; i++) {

        assetsData[i].drawInfo.vao = gl.createVertexArray();
        gl.bindVertexArray(assetsData[i].drawInfo.vao);


        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(assetsData[i].structInfo.vertices), gl.STATIC_DRAW);
        putAttributesOnGPU(locationsArray[shadersType].positionAttributeLocation);


        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(assetsData[i].structInfo.normals), gl.STATIC_DRAW);
        putAttributesOnGPU(locationsArray[shadersType].normalAttributeLocation);



        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(assetsData[i].structInfo.indices), gl.STATIC_DRAW);

    }

}

function putAttributesOnGPU(location) {

    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);

}

function initPosition(idSetup) {

    for (i = 0; i < assetsData.length - 1; i++){
        assetsData[i].drawInfo.worldParams = [setups[idSetup].positionMatrix[i][0], setups[idSetup].positionMatrix[i][1], 0.0, 0.0, 0.0, setups[idSetup].positionMatrix[i][2], 1.0];
        //console.log(assetsData[i].drawInfo.locations.worldParams);
    }

    if(setups[idSetup].flippedParallelogram == 180.0){
        assetsData[6].drawInfo.worldParams = [setups[idSetup].positionMatrix[6][0], setups[idSetup].positionMatrix[6][1], 0.0, 0.0, 180.0, setups[idSetup].positionMatrix[6][2], 1.0];
   
    }
    assetsData[i].drawInfo.worldParams = [0.0, 0.0, -0.15, 0.0, 0.0, 0.0, 1.0];

}

