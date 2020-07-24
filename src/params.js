
//Parameters for Camera
var cx = 0.0;
var cy = -1.0;
var cz = 2.0;
var elevation = 20.0;
var angle = 0.0;

var lookRadius = 1.0;

var perspectiveMatrix = [];
var viewMatrix = [];




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
var selectedSetup = 0;


//LIGHTS
var ambientLight = [0.1, 0.1, 0.1];
var ambientLightTop = [0.2, 0.2, 0.2];
var ambientLightBottom = [0.0, 0.0, 0.0];
var specularShine = 1.0;
//light type [directional, pointlight, spotlight, boh]
var lightSwitch = [1, 0, 0, 0];

// directional light
var dirLightAlpha = -utils.degToRad(60);
var dirLightBeta = -utils.degToRad(120);

var directionalLightDir = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
                           Math.sin(dirLightAlpha),
                           Math.cos(dirLightAlpha) * Math.sin(dirLightBeta)
                            ];

var directionalLightColor = [1.0, 1.0, 1.0, 1.0];

//pointlight
var pointLightPosition = [0.0, 0.0, 10.0];
var pointLightColor = [0.1, 0.1, 0.1, 1.0];
var pointLightDecay = 1.0;
var pointLightTarget = 10.0;

//spotlight
var spotLightPos = [0.0, 0.0, 10.0];
var spotLightDir = [1.0, -1.0, -1.0];
var spotLightConeIn = 4.0;
var spotLightConeOut = 5.0;
var spotLightDecay = 0.0;
var spotLightTarget = 20.0;
var spotLightColor = [1.0, 1.0, 1.0, 1.0];

////END LIGHTS
 var width;
 var height;

 var perspectiveMatrix;
 var viewMatrix;