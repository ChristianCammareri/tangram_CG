async function loadModels(){
    var obj1 = await utils.get_objstr(modelsPath + "piece1.obj");//triangolo

    var obj2 = await utils.get_objstr(modelsPath + "piece2.obj");//triangolo
    var obj3 = await utils.get_objstr(modelsPath + "piece3.obj");//triangolo 
    var obj4 = await utils.get_objstr(modelsPath + "piece4.obj");//parallelogramma
    var obj5 = await utils.get_objstr(modelsPath + "piece5.obj");//quadrato
    var obj6 = await utils.get_objstr(modelsPath + "piece6.obj");//triangolo piccolo
    var obj7 = await utils.get_objstr(modelsPath + "piece7.obj");//triangolo piccolo
    var tray = await utils.get_objstr(modelsPath + "tray.obj");
    //let ooo = OBJ.Mesh
    console.log("oooo");
    console.log(obj2.indices);
    console.log(obj2.vertices);

    
    assetsData[0].structInfo.vertices = obj1.vertices;
    assetsData[0].structInfo.normals = obj1.vertexNormals;
    assetsData[0].structInfo.indices = obj1.indices;
    assetsData[0].structInfo.textures = obj1.textures;
    console.log("ASDASD");
    console.log(assetsData[0].structInfo.vertices);
    console.log(assetsData[0].structInfo.indices);

    assetsData[1].structInfo.vertices = obj2.vertices;
    assetsData[1].structInfo.normals = obj2.vertexNormals;
    assetsData[1].structInfo.indices = obj2.indices;
    assetsData[1].structInfo.textures = obj2.textures;

    assetsData[2].structInfo.vertices = obj3.vertices;
    assetsData[2].structInfo.normals = obj3.vertexNormals;
    assetsData[2].structInfo.indices = obj3.indices;
    assetsData[2].structInfo.textures = obj3.textures;

    assetsData[3].structInfo.vertices = obj6.vertices;
    assetsData[3].structInfo.normals = obj6.vertexNormals;
    assetsData[3].structInfo.indices = obj6.indices;
    assetsData[3].structInfo.textures = obj6.textures;

    assetsData[4].structInfo.vertices = obj7.vertices;
    assetsData[4].structInfo.normals = obj7.vertexNormals;
    assetsData[4].structInfo.indices = obj7.indices;
    assetsData[4].structInfo.textures = obj7.textures;

    assetsData[5].structInfo.vertices = obj5.vertices;
    assetsData[5].structInfo.normals = obj5.vertexNormals;
    assetsData[5].structInfo.indices = obj5.indices;
    assetsData[5].structInfo.textures = obj5.textures;

    assetsData[6].structInfo.vertices = obj4.vertices;
    assetsData[6].structInfo.normals = obj4.vertexNormals;
    assetsData[6].structInfo.indices = obj4.indices;
    assetsData[6].structInfo.textures = obj4.textures;

    assetsData[7].structInfo.vertices = tray.vertices;
    assetsData[7].structInfo.normals = tray.vertexNormals;
    assetsData[7].structInfo.indices = tray.indices;
    assetsData[7].structInfo.textures = tray.textures;




    

}