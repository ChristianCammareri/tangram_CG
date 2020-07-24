const setups = [
    
    {
        positionMatrix: [
            [-Math.sqrt(2) / 3, 0.0, 225.0],
            [0.0, Math.sqrt(2) / 3, 315.0],
            [Math.sqrt(2) / 6, 0.0, 45.0],
            [-Math.sqrt(2) / 4, -5 * Math.sqrt(2) / 12, 135.0],
            [Math.sqrt(2) / 3, -Math.sqrt(2) / 3 - 0.000005, 270.0],
            [0.0, -Math.sqrt(2) / 4, 45.0],
            [3 * Math.sqrt(2) / 8, Math.sqrt(2) / 8, 90.0]
        ],
        flippedParallelogram: 0.0,
        name: "initialSetup"
    },
    {
        positionMatrix: [[0.0, -Math.sqrt(2) / 6, 315.0],
        [0.25, Math.sqrt(2) / 6, 135.0],
        [-5*Math.sqrt(2)/12, -Math.sqrt(2) / 4, 225.0],
        [-Math.sqrt(2) / 4, -5*Math.sqrt(2) / 12, 135.0],
        [Math.sqrt(2) / 3, -Math.sqrt(2) / 3, 270.0],
        [-Math.sqrt(2) / 3 + 0.25, Math.sqrt(2) /2, 0.0],
        [-Math.sqrt(2)/2 + 0.25, Math.sqrt(2) / 6, 135.0]
        ],
        flippedParallelogram: 0.0,
        name: "houseSetup"
    },
    {
        positionMatrix: [
            [0.0, 0.0, 0.0],
            [0.377350, 0.427350, 315.0],
            [-0.715, 0.515, 225.0],
            [-0.5950, 1.5799, 45.0],
            [-0.500330, 0.16, 45.0],
            [-0.48, 0.87, 45.0],
            [-0.30, 1.40, 90.0]
        ],
        flippedParallelogram: 180.0,
        name: "gooseSetup"
    },
    {
        positionMatrix: [
            [0.0, 0.0, 270.0],
            [-0.14, 0.6650, 225.0],
            [-0.98, 1.7199, 225.0],
            [-0.50, 1.7199, 45.0],
            [-0.54, 0.87, 45.0],
            [-0.74, 1.365, 45.0],
            [0.8650, -0.1550, 0.0]
        ],
        flippedParallelogram: 180.0,
        name: "catSetup"
    },

    {
        positionMatrix: [
            [0.57, 0.37, 90.0],
            [0, 0.0, 45.0],
            [0, -0.7050, 225.0],
            [1.8990, 0.3650, 0.0],
            [1, 0.23, 270.0],
            [1.4849, 0.45, 0.0],
            [1.2349, -0.2550, 315.0]
        ],
        flippedParallelogram: 180.0,
        name: "bearSetup"
    },
    {
        positionMatrix: [
            [0, 0, 90.0],
            [0.85, 0.18, 270.0],
            [1.015, -0.32, 180.0],
            [1.3499, 0.52, 0.0],
            [0.2, 0.57, 0.0],
            [-0.04, 1.3949, 315.0],
            [-0.8350, 0.085, 315.0]
        ],
        flippedParallelogram: 180.0,
        name: "manOnHorseSetup"
    }
];
