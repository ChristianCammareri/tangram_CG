//GUI controlled variables
var isSurrendered = false;

//Canvas e contexts
var canvas, glMain, overlay, glOverlay;

//Parameters for Camera
var cx = 0.5;
var cy = -0.5;
var cz = 1.5;
var elevation = 15.0;
var angle = 0.0;

var width;
var height;

let AssetType = {
    QUADRILATERAL: 0,
    TRIANGLE: 1,
    
}

let ShadersType = {
    ITEM: 0,
    SOLUTION: 1,
    FLOOR: 2,
}

let programsArray = [null, null, null];
let locationsArray = [null, null, null];

var shadersPath = {
    vs: "/src/shaders/item/vs.glsl",
    fs: "/src/shaders/item/fs.glsl",
    vsFloor: "/src/shaders/floor/vs.glsl",
    fsFloor: "/src/shaders/floor/fs.glsl",
    ovs: "/src/shaders/overlay/vs.glsl",
    ofs: "/src/shaders/overlay/fs.glsl"
}

var imagePath = "/src/resources/floor.png";

var keys = [];
var selectedItem = -1;
var selectedSetup = 3;


//LIGHTS
var ambientLight = [0.1, 0.1, 0.1, 1.0];
var ambientLightTop = [0.2, 0.2, 0.2, 1.0];
var ambientLightBottom = [0.0, 0.0, 0.0, 1.0];
var specularShine = 120;
var specularColor = [1.0, 1.0, 1.0, 1.0];
//light type [directional, pointlight, spotlight, boh]
var lightSwitch = [1, 0, 0, 0];


// directional light
var dirLightTheta = utils.degToRad(45);
var dirLightPhi = utils.degToRad(0);

var directionalLightDir =[ Math.cos(dirLightPhi)*Math.sin(dirLightTheta),
    Math.sin(dirLightPhi)*Math.sin(dirLightTheta),
    Math.cos(dirLightTheta)];

var directionalLightColor = [1.0, 1.0, 1.0, 1.0];

//pointlight
var pointLightPosition = [0.0, 0.0, 10.0];
var pointLightColor = [1.0, 1.0, 1.0, 1.0];
var pointLightDecay = 3.0;
var pointLightTarget = 10.0;

//spotlight
var spotLightPos = [0.0, 0.0, 0.5];
var spotLightTheta = utils.degToRad(0);
var spotLightPhi = utils.degToRad(0);
var spotLightDir = [Math.cos(spotLightPhi)*Math.sin(spotLightTheta),
                    Math.sin(spotLightPhi)*Math.sin(spotLightTheta),
                    Math.cos(spotLightTheta)];
var spotLightConeIn = 1.1;
var spotLightConeOut = 85.5;
var spotLightDecay = 0.7;
var spotLightTarget = 1.0;
var spotLightColor = [1.0, 1.0, 1.0, 1.0];

////END LIGHTS
 