function normaliseVector(vec){
    var magnitude = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);
    console.log("Magnitude" + magnitude);
    var normVec = [vec[0]/magnitude, vec[1]/magnitude, vec[2]/magnitude];
    return normVec;
}

function rayTriIntersect(o, d, p0, p1, p2){
    let epsilon = 10e-5;
    var e1 = [p1[0]-p0[0], p1[1] - p0[1], p1[2] - p0[2]];
    var e2 = [p2[0]-p0[0], p2[1] - p0[1], p2[2] - p0[2]];
    var q = utils.multiplyMatrices(d, e2);
    var a = e1[0] * q[0] + e1[1] * q[1] + e1[2] * q[2] 
    
    if(a > -epsilon && a < epsilon) return [false, 0, 0, 0];
    var f = 1.0/a;
    var s = [o[0]-p0[0], o[1] - p0[1], o[2] - p0[2]];
    var u = f*(s[0] * q[0] + s[1] * q[1] + s[2] * q[2]);
    
    if(u < 0.0) return [false, 0, 0, 0];
    var r = utils.multiplyMatrices(s, e1);
    var v = f*(d[0] * r[0] + d[1] * r[1] + d[2] * r[2]);
    
    if(v < 0.0 || u + v > 1.0) return [false, 0, 0, 0];
    var t = f*(e2[0] * r[0] + e2[1] * r[1] + e2[2] * r[2]);
    return [true, u, v, t];
}

function checkIntersectionTriangle(ev, objectsInScene, perspectiveMatrix, viewMatrix){
    var top = 0.0, left = 0.0;
    canvas = gl.canvas;
    while (canvas && canvas.tagName !== 'BODY') {
        top += canvas.offsetTop;
        left += canvas.offsetLeft;
        canvas = canvas.offsetParent;
    }
    console.log("left "+left+" top "+top);
    var x = ev.clientX - left;
    var y = ev.clientY - top;
        
    //Here we calculate the normalised device coordinates from the pixel coordinates of the canvas
    console.log("ClientX "+x+" ClientY "+y);
    var normX = (2*x)/ gl.canvas.width - 1;
    var normY = 1 - (2*y) / gl.canvas.height;
    console.log("NormX "+normX+" NormY "+normY);

    //We need to go through the transformation pipeline in the inverse order so we invert the matrices
    var projInv = utils.invertMatrix(perspectiveMatrix);
    var viewInv = utils.invertMatrix(viewMatrix);
    
    //Find the point (un)projected on the near plane, from clip space coords to eye coords
    //z = -1 makes it so the point is on the near plane
    //w = 1 is for the homogeneous coordinates in clip space
    var pointEyeCoords = utils.multiplyMatrixVector(projInv, [normX, normY, -1, 1]);
    console.log("Point eye coords "+pointEyeCoords);

    //This finds the direction of the ray in eye space
    //Formally, to calculate the direction you would do dir = point - eyePos but since we are in eye space eyePos = [0,0,0] 
    //w = 0 is because this is not a point anymore but is considered as a direction
    var rayEyeCoords = [pointEyeCoords[0], pointEyeCoords[1], pointEyeCoords[2], 0];

    
    //We find the direction expressed in world coordinates by multipling with the inverse of the view matrix
    var rayDir = utils.multiplyMatrixVector(viewInv, rayEyeCoords);
    console.log("Ray direction "+rayDir);
    var normalisedRayDir = normaliseVector(rayDir);
    console.log("normalised ray dir "+normalisedRayDir);
    //The ray starts from the camera in world coordinates
    var rayStartPoint = [cx, cy, cz];
    
    //We iterate on all the objects in the scene to check for collisions
    for(i = 0; i < objectsInScene.length-1; i++){ //LAST OBJECT IS THE FLOOR
        var triangles = []
        let structInfo = objectsInScene[i].structInfo;
        for(j = 0; j < structInfo.indices.length; j+=3){
            var p1 = [structInfo.vertices[structInfo.indices[j*3]],
                          structInfo.vertices[structInfo.indices[j*3+1]],
                          structInfo.vertices[structInfo.indices[j*3+2]]];
            var p2 = [structInfo.vertices[structInfo.indices[(j+1)*3]],
                          structInfo.vertices[structInfo.indices[(j+1)*3+1]],
                          structInfo.vertices[structInfo.indices[(j+1)*3+2]]];
            var p3 = [structInfo.vertices[structInfo.indices[(j+2)*3]],
                          structInfo.vertices[structInfo.indices[(j+2)*3+1]],
                          structInfo.vertices[structInfo.indices[(j+2)*3+2]]];
            console.log(objectsInScene[i].drawInfo.locations.worldMatrix);
            console.log(p1);
            console.log(p2);
            console.log(p3);
            let worldPosition1 = utils.multiplyMatrixVector(objectsInScene[i].drawInfo.locations.worldMatrix, [p1[0], p1[1], p1[2], 1.0]);
            let worldPosition2 = utils.multiplyMatrixVector(objectsInScene[i].drawInfo.locations.worldMatrix, [p2[0], p2[1], p2[2], 1.0]);
            let worldPosition3 = utils.multiplyMatrixVector(objectsInScene[i].drawInfo.locations.worldMatrix, [p3[0], p3[1], p3[2], 1.0]);

            console.log(worldPosition1);
            console.log(worldPosition2);
            console.log(worldPosition3);

            triangles.push([worldPosition1, worldPosition2, worldPosition3]);

        }
        for(k = 0; k < triangles.length; k+=3){
            var hit = rayTriIntersect(rayStartPoint, normalisedRayDir, triangles[k], triangles[k+1], triangles[k+2]);
            if(hit[0]){
                console.log("hit piece number "+i);
                activePiece = i;
                break;
            }
        }

    }
}

function updateTrianglePosition(objPosition, worldMatrix){
    alert(worldMatrix);
    var newpos = new Array(3);
    for(i=0; i<3; i++){
        newpos[i] = utils.multiplyMatrixVector(worldMatrix, [objPosition[3*i], objPosition[3*i+1], objPosition[3*i+2]]);
    }
    alert(worldMatrix);
    return newpos;
}