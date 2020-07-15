const setups = [

    {
        positionMatrix: [
            [-Math.sqrt(2) / 3, 0.0, 225.0],
            [0.0, Math.sqrt(2) / 3, 315.0],
            [Math.sqrt(2) / 6, 0.0, 45.0],
            [-Math.sqrt(2) / 4, -5 * Math.sqrt(2) / 12, 135.0],
            [Math.sqrt(2) / 3, -Math.sqrt(2) / 3, 270.0],
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
        [-Math.sqrt(2)/2 + 0.25, Math.sqrt(2) / 6, 135.0] // non preciso
        ],
        flippedParallelogram: 0.0,
        name: "houseSetup"
    },
    {
        positionMatrix: [
            [0.0, 0, 45.0],
            [Math.sqrt(2), 0, 225.0],
            [Math.sqrt(2), 0, 315.0],
            [-0.5, Math.sqrt(2) / 8, 225.0],
            [0, 0, 135.0],
            [-0.5, 3 * Math.sqrt(2) / 8, 45.0],
            [-0.5 + Math.sqrt(2) / 8, 0.0, 90.0] //non preciso
        ],
        flippedParallelogram: 0.0,
        name: "swanSetup"
    }
];
