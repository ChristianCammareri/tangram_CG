
//Parameters for Camera
var cx = 0.0;
var cy = -1.0;
var cz = 2.0;
var elevation = 30.0;
var angle = 0.0;

var lookRadius = 1.0;

var perspectiveMatrix = [];
var viewMatrix = [];




var shadersPath = {
    vs: "/src/shaders/vs.glsl",
    fs: "/src/shaders/fs.glsl"
}

var keys = [];
var selectedItem = -1;
var selectedSetup = 1;


 //define directional light
 var dirLightAlpha = -utils.degToRad(60);
 var dirLightBeta = -utils.degToRad(120);

 var directionalLightDir = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
 Math.sin(dirLightAlpha),
 Math.cos(dirLightAlpha) * Math.sin(dirLightBeta)
 ];

 var directionalLightColor = [2.0, 2.0, 2.0];

//pointlight
 var pointLightPosition = [0.0, 0.0, 10.0];
 var pointLightColor = [2.0, 2.0, 2.0];
 var pointLightDir = [0.0, 0.0, -1.0];


 var width;
 var height;

 var perspectiveMatrix;