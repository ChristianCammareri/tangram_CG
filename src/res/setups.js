const houseSetup = [
    [0.25, Math.sqrt(2), 135.0],
    [0.0, 0.0, 315.0],
    [-Math.sqrt(2)/4, Math.sqrt(2)/4, 225.0],
    [-Math.sqrt(2)/4, Math.sqrt(2)/4, 135.0],
    [Math.sqrt(2)/2, 0.0, 270.0],
    [-0.25, Math.sqrt(2), 0.0],
    [-0.25 -Math.sqrt(2)/8, 0.25+Math.sqrt(2)/2, 135.0] // non preciso
];


const swanSetup = [
    [0.0, 0, 45.0],
    [Math.sqrt(2), 0, 225.0],
    [Math.sqrt(2), 0, 315.0],
    [-0.5, Math.sqrt(2)/8, 225.0],
    [0, 0, 135.0],
    [-0.5, 3*Math.sqrt(2)/8, 45.0],
    [-0.5 + Math.sqrt(2)/8, 0.0, 90.0] //non preciso
];



const initialSetup = [
    [-Math.sqrt(2)/3, 0.0, 225.0],
    [0.0, Math.sqrt(2)/3, 315.0],
    [Math.sqrt(2)/6, 0.0, 45.0],
    [-Math.sqrt(2)/4, -5*Math.sqrt(2)/12, 135.0],
    [Math.sqrt(2)/3, -Math.sqrt(2)/3, 270.0],
    [0.0, -Math.sqrt(2)/4, 45.0],
    [3*Math.sqrt(2)/8, Math.sqrt(2)/8, 90.0]
];


const initialSetupOld= [ //da cancallare
    [0, 0, 225.0],
    [0, 0, 315.0],
    [0, 0, 45.0],
    [-Math.sqrt(2)/4, -Math.sqrt(2)/4, 135.0],
    [Math.sqrt(2)/2, -Math.sqrt(2)/2, 270.0],
    [0.0, -Math.sqrt(2)/4, 45.0],
    [3*Math.sqrt(2)/8, Math.sqrt(2)/8, 90.0]
];