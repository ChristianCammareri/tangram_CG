const setups = [
    
    {
        positionMatrix: [
            [-Math.sqrt(2) / 3, 0.0, 225.0],
            [0.0, Math.sqrt(2) / 3, 315.0],
            [Math.sqrt(2) / 6, 0.0, 45.0],
            [-Math.sqrt(2) / 4, -5 * Math.sqrt(2) / 12, 135.0],
            [Math.sqrt(2) / 3, -Math.sqrt(2) / 3 - 0.00005, 270.0],
            [0.0, -Math.sqrt(2) / 4, 45.0],
            [3 * Math.sqrt(2) / 8, Math.sqrt(2) / 8, 90.0]
        ],
        flippedParallelogram: 0.0,
        name: "Initial setup"
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
        name: "House"
    },
    {
        positionMatrix: [
            [0.0, 0.0, 0.0],
            [0.377350, 0.427350, 315.0],
            [-0.71, 0.5155, 225.0],
            [-0.5945, 1.5799, 45.0],
            [-0.495330, 0.165, 45.0],
            [-0.475, 0.87, 45.0],
            [-0.30, 1.40, 90.0]
        ],
        flippedParallelogram: 180.0,
        name: "Goose"
    },
    {
        positionMatrix: [
            [0.0, 0.0, 270.0],
            [-0.14, 0.6650, 225.0],
            [-0.955, 1.715, 225.0],
            [-0.495, 1.715, 45.0],
            [-0.54, 0.87, 45.0],
            [-0.725, 1.36, 45.0],
            [0.8650, -0.1550, 0.0]
        ],
        flippedParallelogram: 180.0,
        name: "Cat"
    },

    {
        positionMatrix: [
            [0.57, 0.37, 90.0],
            [0.005, 0.0, 45.0],
            [0.005, -0.7050, 225.0],
            [1.8990, 0.3650, 0.0],
            [1, 0.235, 270.0],
            [1.485, 0.45, 0.0],
            [1.235, -0.25, 315.0]
        ],
        flippedParallelogram: 180.0,
        name: "Bear"
    },
    {
        positionMatrix: [
            [0.005, 0, 90.0],
            [0.85, 0.18, 270.0],
            [1.015, -0.32, 180.0],
            [1.3499, 0.52, 0.0],
            [0.2, 0.565, 0.0],
            [-0.035, 1.39, 315.0],
            [-0.83, 0.085, 315.0]
        ],
        flippedParallelogram: 180.0,
        name: "Man on horse"
    }
];
