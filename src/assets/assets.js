let AssetType = {
    FLOOR: 0,
    TRIANGLE: 1,
    SQUARE: 2,
    PARALLELOGRAM: 3,
    TRAY: 4
}
let defaultSigma = 0;
let defaultG = 0;
let defaultDecay = 0;

let assetsData = [
    {
        name: "T1",
        type: AssetType.TRIANGLE,
        structInfo: {
            vertices: [
                0.0, 0.0, 0.0,
                1.0, 0.0, 0.0, 
                0.0, 1.0, 0.0, 
                0.0, 0.0, 0.1,
                1.0, 0.0, 0.1, 
                0.0, 1.0, 0.1,
                0.0, 0.0, 0.0, 
                0.0, 0.0, 0.1, 
                1.0, 0.0, 0.0, 
                1.0, 0.0, 0.1,
                0.0, 0.0, 0.0, 
                0.0, 0.0, 0.1, 
                0.0, 1.0, 0.0, 
                0.0, 1.0, 0.1,
                1.0, 0.0, 0.0, 
                1.0, 0.0, 0.1, 
                0.0, 1.0, 0.0, 
                0.0, 1.0, 0.1
            ],
            normals: [
                0.0, 0.0, -1.0, 
                0.0, 0.0, -1.0, 
                0.0, 0.0, -1.0, 
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 
                0.0, 0.0, 1.0,
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0,
                -1.0, 0.0, 0.0, 
                -1.0, 0.0, 0.0, 
                -1.0, 0.0, 0.0, 
                -1.0, 0.0, 0.0,
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0, 
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0, 
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0, 
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0
            ],
            indices: [
                0, 2, 1, 
                3, 4, 5, 
                8, 7, 6 , 
                7, 8, 9, 
                10, 11, 12, 
                13, 12, 11, 
                16, 15, 14, 
                15, 16, 17
            ],
            textures: []
        },
        drawInfo: {
            program: [],
            bufferLength: 0,
            vao: [],
            ambientColor: [0.97, 0.89, 0.05, 1.0],
            emissionColor: [0.97, 0.89, 0.05, 1.0],
            sigma: defaultSigma,

            lightInfo: {
                color: [0.9, 0.9, 0.9, 1.0],
                g: defaultG,
                decay: defaultDecay
            },

            locations: {
                // Asset params
                positionAttributeLocation: [],
                normalsAttributeLocation: [],
                wvpMatrixLocation: [],
                worldMatrix : [],
                rotation: 0,
                // Object params
                ambientColorLocation: [],
                emissionColorLocation: [],

                // Lights params
                isDayLocation: [],
                directLightDirectionLocation: [],
                directLightColorLocation: [],
                ambientLightLocation: [],

                // BRDF
                diffuseModeLocation: [],
                specularModeLocation: [],
                specShineLocation: [],
                sigmaLocation: [],
                eyePosLocation: []
            }
        },
    },
    {
        name: "T2",
        type: AssetType.TRIANGLE,
        structInfo: {
            vertices: [
                0.0, 0.0, 0.0,
                1.0, 0.0, 0.0, 
                0.0, 1.0, 0.0, 
                0.0, 0.0, 0.1,
                1.0, 0.0, 0.1, 
                0.0, 1.0, 0.1,
                0.0, 0.0, 0.0, 
                0.0, 0.0, 0.1, 
                1.0, 0.0, 0.0, 
                1.0, 0.0, 0.1,
                0.0, 0.0, 0.0, 
                0.0, 0.0, 0.1, 
                0.0, 1.0, 0.0, 
                0.0, 1.0, 0.1,
                1.0, 0.0, 0.0, 
                1.0, 0.0, 0.1, 
                0.0, 1.0, 0.0, 
                0.0, 1.0, 0.1
            ],
            normals: [
                0.0, 0.0, -1.0, 
                0.0, 0.0, -1.0, 
                0.0, 0.0, -1.0, 
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 
                0.0, 0.0, 1.0,
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0,
                -1.0, 0.0, 0.0, 
                -1.0, 0.0, 0.0, 
                -1.0, 0.0, 0.0, 
                -1.0, 0.0, 0.0,
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0, 
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0, 
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0, 
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0
            ],
            indices: [
                0, 2, 1, 
                3, 4, 5, 
                8, 7, 6 , 
                7, 8, 9, 
                10, 11, 12, 
                13, 12, 11, 
                16, 15, 14, 
                15, 16, 17
            ],
            textures: null
        },
        drawInfo: {
            program: [],
            bufferLength: 0,
            vao: [],
            ambientColor: [0.97, 0.89, 0.05, 1.0],
            emissionColor: [0.97, 0.89, 0.05, 1.0],
            sigma: defaultSigma,

            lightInfo: {
                color: [0.9, 0.9, 0.9, 1.0],
                g: defaultG,
                decay: defaultDecay
            },

            locations: {
                // Asset params
                positionAttributeLocation: [],
                normalsAttributeLocation: [],
                wvpMatrixLocation: [],
                worldMatrix: [],
                rotation: 0,
                // Object params
                ambientColorLocation: [],
                emissionColorLocation: [],

                // Lights params
                isDayLocation: [],
                directLightDirectionLocation: [],
                directLightColorLocation: [],
                ambientLightLocation: [],

                // BRDF
                diffuseModeLocation: [],
                specularModeLocation: [],
                specShineLocation: [],
                sigmaLocation: [],
                eyePosLocation: []
            }
        },
    },
    {
        name: "T3",
        type: AssetType.TRIANGLE,
        structInfo: {
            vertices: [
                0.0, 0.0, 0.0,
                1.0, 0.0, 0.0, 
                0.0, 1.0, 0.0, 
                0.0, 0.0, 0.1,
                1.0, 0.0, 0.1, 
                0.0, 1.0, 0.1,
                0.0, 0.0, 0.0, 
                0.0, 0.0, 0.1, 
                1.0, 0.0, 0.0, 
                1.0, 0.0, 0.1,
                0.0, 0.0, 0.0, 
                0.0, 0.0, 0.1, 
                0.0, 1.0, 0.0, 
                0.0, 1.0, 0.1,
                1.0, 0.0, 0.0, 
                1.0, 0.0, 0.1, 
                0.0, 1.0, 0.0, 
                0.0, 1.0, 0.1
            ],
            normals: [
                0.0, 0.0, -1.0, 
                0.0, 0.0, -1.0, 
                0.0, 0.0, -1.0, 
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 
                0.0, 0.0, 1.0,
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0,
                -1.0, 0.0, 0.0, 
                -1.0, 0.0, 0.0, 
                -1.0, 0.0, 0.0, 
                -1.0, 0.0, 0.0,
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0, 
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0, 
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0, 
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0
            ],
            indices: [
                0, 2, 1, 
                3, 4, 5, 
                8, 7, 6 , 
                7, 8, 9, 
                10, 11, 12, 
                13, 12, 11, 
                16, 15, 14, 
                15, 16, 17
            ],
            textures: null
        },
        drawInfo: {
            program: [],
            bufferLength: 0,
            vao: [],
            ambientColor: [0.97, 0.89, 0.05, 1.0],
            emissionColor: [0.97, 0.89, 0.05, 1.0],
            sigma: defaultSigma,

            lightInfo: {
                color: [0.9, 0.9, 0.9, 1.0],
                g: defaultG,
                decay: defaultDecay
            },

            locations: {
                // Asset params
                positionAttributeLocation: [],
                normalsAttributeLocation: [],
                wvpMatrixLocation: [],
                worldMatrix: [],
                rotation: 0,
                // Object params
                ambientColorLocation: [],
                emissionColorLocation: [],

                // Lights params
                isDayLocation: [],
                directLightDirectionLocation: [],
                directLightColorLocation: [],
                ambientLightLocation: [],

                // BRDF
                diffuseModeLocation: [],
                specularModeLocation: [],
                specShineLocation: [],
                sigmaLocation: [],
                eyePosLocation: []
            }
        },
    },
    {
        name: "T4",
        type: AssetType.TRIANGLE,
        structInfo: {
            vertices: [
                0.0, 0.0, 0.0,
                1.0, 0.0, 0.0, 
                0.0, 1.0, 0.0, 
                0.0, 0.0, 0.1,
                1.0, 0.0, 0.1, 
                0.0, 1.0, 0.1,
                0.0, 0.0, 0.0, 
                0.0, 0.0, 0.1, 
                1.0, 0.0, 0.0, 
                1.0, 0.0, 0.1,
                0.0, 0.0, 0.0, 
                0.0, 0.0, 0.1, 
                0.0, 1.0, 0.0, 
                0.0, 1.0, 0.1,
                1.0, 0.0, 0.0, 
                1.0, 0.0, 0.1, 
                0.0, 1.0, 0.0, 
                0.0, 1.0, 0.1
            ],
            normals: [
                0.0, 0.0, -1.0, 
                0.0, 0.0, -1.0, 
                0.0, 0.0, -1.0, 
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 
                0.0, 0.0, 1.0,
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0,
                -1.0, 0.0, 0.0, 
                -1.0, 0.0, 0.0, 
                -1.0, 0.0, 0.0, 
                -1.0, 0.0, 0.0,
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0, 
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0, 
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0, 
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0
            ],
            indices: [
                0, 2, 1, 
                3, 4, 5, 
                8, 7, 6 , 
                7, 8, 9, 
                10, 11, 12, 
                13, 12, 11, 
                16, 15, 14, 
                15, 16, 17
            ],
            textures: null
        },
        drawInfo: {
            program: [],
            bufferLength: 0,
            vao: [],
            ambientColor: [0.97, 0.89, 0.05, 1.0],
            emissionColor: [0.97, 0.89, 0.05, 1.0],
            sigma: defaultSigma,

            lightInfo: {
                color: [0.9, 0.9, 0.9, 1.0],
                g: defaultG,
                decay: defaultDecay
            },

            locations: {
                // Asset params
                positionAttributeLocation: [],
                normalsAttributeLocation: [],
                wvpMatrixLocation: [],
                worldMatrix: [],
                rotation: 0,
                // Object params
                ambientColorLocation: [],
                emissionColorLocation: [],

                // Lights params
                isDayLocation: [],
                directLightDirectionLocation: [],
                directLightColorLocation: [],
                ambientLightLocation: [],

                // BRDF
                diffuseModeLocation: [],
                specularModeLocation: [],
                specShineLocation: [],
                sigmaLocation: [],
                eyePosLocation: []
            }
        },
    },
    {
        name: "T5",
        type: AssetType.TRIANGLE,
        structInfo: {
            vertices: [
                0.0, 0.0, 0.0,
                1.0, 0.0, 0.0, 
                0.0, 1.0, 0.0, 
                0.0, 0.0, 0.1,
                1.0, 0.0, 0.1, 
                0.0, 1.0, 0.1,
                0.0, 0.0, 0.0, 
                0.0, 0.0, 0.1, 
                1.0, 0.0, 0.0, 
                1.0, 0.0, 0.1,
                0.0, 0.0, 0.0, 
                0.0, 0.0, 0.1, 
                0.0, 1.0, 0.0, 
                0.0, 1.0, 0.1,
                1.0, 0.0, 0.0, 
                1.0, 0.0, 0.1, 
                0.0, 1.0, 0.0, 
                0.0, 1.0, 0.1
            ],
            normals: [
                0.0, 0.0, -1.0, 
                0.0, 0.0, -1.0, 
                0.0, 0.0, -1.0, 
                0.0, 0.0, 1.0,
                0.0, 0.0, 1.0, 
                0.0, 0.0, 1.0,
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0,
                -1.0, 0.0, 0.0, 
                -1.0, 0.0, 0.0, 
                -1.0, 0.0, 0.0, 
                -1.0, 0.0, 0.0,
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0, 
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0, 
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0, 
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0
            ],
            indices: [
                0, 2, 1, 
                3, 4, 5, 
                8, 7, 6 , 
                7, 8, 9, 
                10, 11, 12, 
                13, 12, 11, 
                16, 15, 14, 
                15, 16, 17
            ],
            textures: null
        },
        drawInfo: {
            program: [],
            bufferLength: 0,
            vao: [],
            ambientColor: [0.97, 0.89, 0.05, 1.0],
            emissionColor: [0.97, 0.89, 0.05, 1.0],
            sigma: defaultSigma,

            lightInfo: {
                color: [0.9, 0.9, 0.9, 1.0],
                g: defaultG,
                decay: defaultDecay
            },

            locations: {
                // Asset params
                positionAttributeLocation: [],
                normalsAttributeLocation: [],
                wvpMatrixLocation: [],
                worldMatrix: [],
                rotation: 0,
                // Object params
                ambientColorLocation: [],
                emissionColorLocation: [],

                // Lights params
                isDayLocation: [],
                directLightDirectionLocation: [],
                directLightColorLocation: [],
                ambientLightLocation: [],

                // BRDF
                diffuseModeLocation: [],
                specularModeLocation: [],
                specShineLocation: [],
                sigmaLocation: [],
                eyePosLocation: []
            }
        },
    },

    {
        name: "S",
        type: AssetType.SQUARE,
        structInfo: {
            vertices: [
                -0.25, -0.25, 0.0,
                0.25, -0.25, 0.0, 
                0.25, 0.25, 0.0,
                -0.25, 0.25, 0.0,
                -0.25, -0.25, 0.1, 
                0.25, -0.25, 0.1, 
                0.25, 0.25, 0.1, 
                -0.25, 0.25, 0.1,
                -0.25, -0.25, 0.0, 
                -0.25, -0.25, 0.1, 
                -0.25, 0.25, 0.0, 
                -0.25, 0.25, 0.1,
                0.25, -0.25, 0.0, 
                0.25, -0.25, 0.1, 
                0.25, 0.25, 0.0, 
                0.25, 0.25, 0.1,
                -0.25, -0.25, 0.0, 
                -0.25, -0.25, 0.1, 
                0.25, -0.25, 0.0, 
                0.25, -0.25, 0.1,
                -0.25, 0.25, 0.0, 
                -0.25, 0.25, 0.1, 
                0.25, 0.25, 0.0, 
                0.25, 0.25, 0.1
            ],
            normals: [
                0.0, 0.0, -1.0, 
                0.0, 0.0, -1.0, 
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
                0.0, 0.0, 1.0, 
                0.0, 0.0, 1.0, 
                0.0, 0.0, 1.0, 
                0.0, 0.0, 1.0,
                -1.0, 0.0, 0.0, 
                -1.0, 0.0, 0.0, 
                -1.0, 0.0, 0.0, 
                -1.0, 0.0, 0.0,
                1.0, 0.0, 0.0, 
                1.0, 0.0, 0.0, 
                1.0, 0.0, 0.0, 
                1.0, 0.0, 0.0,
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0,
                0.0, 1.0, 0.0, 
                0.0, 1.0, 0.0, 
                0.0, 1.0, 0.0, 
                0.0, 1.0, 0.0
            ],
            indices: [
                0, 2, 1,  
                0, 3, 2,  
                4, 5, 6,  
                4, 6, 7,  
                8, 9, 10,  
                10, 9, 11,  
                13, 12, 14,  
                13, 14, 15,  
                17, 16, 18, 
                17, 18, 19,  
                20, 21, 22,  
                22, 21, 23
            ],
            textures: null,
        },
        drawInfo: {
            program: [],
            bufferLength: 0,
            vao: [],
            sigma: defaultSigma,

            locations: {
                // Asset params
                positionAttributeLocation: [],
                normalsAttributeLocation: [],
                uvAttributeLocation: [],
                wvpMatrixLocation: [],
                worldMatrix: [],
                rotation: 0,
                // Object params
                textureLocation: [],

                // Lights params
                isDayLocation: [],
                directLightDirectionLocation: [],
                directLightColorLocation: [],
                ambientLightLocation: [],
                lightTargetLocation: [],
                lightDecayLocation: [],
                lightColorLocation: [],
                lightPositionLocation: [],

                // Raycasting params
                electronRadiusLocation: [],
                rayCastingLocation: [],

                // BRDF
                diffuseModeLocation: [],
                specularModeLocation: [],
                specShineLocation: [],
                sigmaLocation: [],
                eyePosLocation: []
            }
        },
    },


    {
        name: "P",
        type: AssetType.PARALLELOGRAM,
        structInfo: {
            vertices: [
                -Math.sqrt(2)/8, -Math.sqrt(2)/8, 0.0,
                3*Math.sqrt(2)/8, -Math.sqrt(2)/8, 0.0, 
                Math.sqrt(2)/8, Math.sqrt(2)/8, 0.0,
                -3*Math.sqrt(2)/8, Math.sqrt(2)/8, 0.0,
            
                -Math.sqrt(2)/8, -Math.sqrt(2)/8, 0.1, 
                3*Math.sqrt(2)/8, -Math.sqrt(2)/8, 0.1, 
                Math.sqrt(2)/8, Math.sqrt(2)/8, 0.1, 
                -3*Math.sqrt(2)/8, Math.sqrt(2)/8, 0.1,
            
                -Math.sqrt(2)/8, -Math.sqrt(2)/8, 0.0, 
                -Math.sqrt(2)/8, -Math.sqrt(2)/8, 0.1, 
                -3*Math.sqrt(2)/8, Math.sqrt(2)/8, 0.0,
                -3*Math.sqrt(2)/8, Math.sqrt(2)/8, 0.1,
            
                3*Math.sqrt(2)/8, -Math.sqrt(2)/8, 0.0, 
                3*Math.sqrt(2)/8, -Math.sqrt(2)/8, 0.1, 
                Math.sqrt(2)/8, Math.sqrt(2)/8, 0.0, 
                Math.sqrt(2)/8, Math.sqrt(2)/8, 0.1,
            
                -Math.sqrt(2)/8, -Math.sqrt(2)/8, 0.0, 
                -Math.sqrt(2)/8, -Math.sqrt(2)/8, 0.1, 
                3*Math.sqrt(2)/8, -Math.sqrt(2)/8, 0.0, 
                3*Math.sqrt(2)/8, -Math.sqrt(2)/8, 0.1,
            
                -3*Math.sqrt(2)/8, Math.sqrt(2)/8, 0.0, 
                -3*Math.sqrt(2)/8, Math.sqrt(2)/8, 0.1, 
                Math.sqrt(2)/8, Math.sqrt(2)/8, 0.0, 
                Math.sqrt(2)/8, Math.sqrt(2)/8, 0.1
            ],
            normals: [
                0.0, 0.0, -1.0, 
                0.0, 0.0, -1.0, 
                0.0, 0.0, -1.0,
                0.0, 0.0, -1.0,
                0.0, 0.0, 1.0, 
                0.0, 0.0, 1.0, 
                0.0, 0.0, 1.0, 
                0.0, 0.0, 1.0,
                -Math.sqrt(2)/2, -Math.sqrt(2)/2, 0.0, 
                -Math.sqrt(2)/2, -Math.sqrt(2)/2, 0.0, 
                -Math.sqrt(2)/2, -Math.sqrt(2)/2, 0.0, 
                -Math.sqrt(2)/2, -Math.sqrt(2)/2, 0.0,
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0, 
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0, 
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0, 
                Math.sqrt(2)/2, Math.sqrt(2)/2, 0.0,
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0, 
                0.0, -1.0, 0.0,
                0.0, 1.0, 0.0, 
                0.0, 1.0, 0.0, 
                0.0, 1.0, 0.0, 
                0.0, 1.0, 0.0
            ],
            indices: [
                0, 2, 1,  
                0, 3, 2,  
                4, 5, 6,  
                4, 6, 7,  
                8, 9, 10,  
                10, 9, 11,  
                13, 12, 14,  
                13, 14, 15,  
                17, 16, 18, 
                17, 18, 19,  
                20, 21, 22,  
                22, 21, 23
            ],
            textures: null,
        },
        drawInfo: {
            program: [],
            bufferLength: 0,
            vao: [],
            sigma: defaultSigma,

            locations: {
                // Asset params
                positionAttributeLocation: [],
                normalsAttributeLocation: [],
                uvAttributeLocation: [],
                wvpMatrixLocation: [],
                worldMatrix: [],
                rotation: 0,
                // Object params
                textureLocation: [],

                // Lights params
                isDayLocation: [],
                directLightDirectionLocation: [],
                directLightColorLocation: [],
                ambientLightLocation: [],
                lightTargetLocation: [],
                lightDecayLocation: [],
                lightColorLocation: [],
                lightPositionLocation: [],

                // Raycasting params
                electronRadiusLocation: [],
                rayCastingLocation: [],

                // BRDF
                diffuseModeLocation: [],
                specularModeLocation: [],
                specShineLocation: [],
                sigmaLocation: [],
                eyePosLocation: []
            }
        },
        
    },

    {
        name: "TRAY",
        type: AssetType.TRAY,
        structInfo: {
            vertices: [],
            normals: [],
            indices: [],
        },
        drawInfo: {
            program: [],
            bufferLength: 0,
            vao: [],
            ambientColor: [0.0, 0.12, 0.5, 1.0],
            locations: {
                positionAttributeLocation: [],
                wvpMatrixLocation: [],
                ambientColorLocation: [],
            },
        }
    },
    {
        type: AssetType.FLOOR,
        structInfo: {
            vertices: [],
            normals: [],
            indices: [],
        },
        drawInfo: {
            program: [],
            bufferLength: 0,
            vao: [],
            ambientColor: [0.0, 0.12, 0.5, 1.0],
            locations: {
                positionAttributeLocation: [],
                wvpMatrixLocation: [],
                ambientColorLocation: [],
            },
        }
    }
]
