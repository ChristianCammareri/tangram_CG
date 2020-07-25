//GUI controlled variables
var isSurrendered = false;

//Parameters for Camera
var cx = 0.0;
var cy = -1.0;
var cz = 2.0;
var elevation = 20.0;
var angle = 0.0;

var width;
var height;

var perspectiveMatrix = [];
var viewMatrix = [];

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
var ambientLight = [0.1, 0.1, 0.1];
var ambientLightTop = [0.2, 0.2, 0.2];
var ambientLightBottom = [0.0, 0.0, 0.0];
var specularShine = 1.0;
var specularColor = [1.0, 1.0, 1.0, 1.0];
//light type [directional, pointlight, spotlight, boh]
var lightSwitch = [0, 0, 0, 0];


// directional light
var dirLightTheta = utils.degToRad(200);
var dirLightPhi = utils.degToRad(120);

var directionalLightDir = [ Math.cos(dirLightPhi),
                            -Math.sin(dirLightPhi),
                            Math.cos(dirLightTheta),
                          ];

var directionalLightColor = [1.0, 1.0, 1.0, 1.0];

//pointlight
var pointLightPosition = [0.0, 0.0, 10.0];
var pointLightColor = [1.0, 1.0, 1.0, 1.0];
var pointLightDecay = 1.0;
var pointLightTarget = 10.0;

//spotlight
var spotLightPos = [0.0, 5.0, 10.0];
var spotLightDir = [0.0, 0.0, -1.0];
var spotLightConeIn = 3.0;
var spotLightConeOut = 3.4;
var spotLightDecay = 1.0;
var spotLightTarget = 10.0;
var spotLightColor = [1.0, 1.0, 1.0, 1.0];

////END LIGHTS
 