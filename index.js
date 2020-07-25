(function () {

    var select = document.getElementById("stageSelect");
    var optionToInsert = document.createElement("option");
    optionToInsert.setAttribute("value", "");
    optionToInsert.setAttribute("disabled", "");
    optionToInsert.setAttribute("selected", "");
    optionToInsert.setAttribute("hidden", "");
    optionToInsert.innerText = "Select your option";
    select.appendChild(optionToInsert);
    for (var i = 0; i < setups.length; i++) {
        optionToInsert = document.createElement("option");
        optionToInsert.setAttribute("value", i);
        optionToInsert.innerText = setups[i].name;
        optionToInsert.addEventListener("click", (e) => {
            isSurrendered = false;
            initPosition(0);
            initPositionSolution(e.target.getAttribute("value"));
            selectedSetup = e.target.getAttribute("value");
        });
        select.appendChild(optionToInsert);
    }


    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    document.getElementById("dirLightEnable").addEventListener("change", () => {
        console.log("dirLightEnable");
        if (document.getElementById("dirLightEnable").checked) {
            lightSwitch[0] = 1;
        }
        else {
            lightSwitch[0] = 0;
        }
    });

    document.getElementById("pointLightEnable").addEventListener("change", () => {
        console.log("pointLightEnable");
        if (document.getElementById("pointLightEnable").checked) {
            lightSwitch[1] = 1;
        }
        else {
            lightSwitch[1] = 0;
        }
    });

    document.getElementById("spotLightEnable").addEventListener("change", () => {
        console.log("spotLightEnable");
        if (document.getElementById("spotLightEnable").checked) {
            lightSwitch[2] = 1;
        }
        else {
            lightSwitch[2] = 0;
        }
    });

    document.getElementById("dirSlider1").addEventListener("input", (e) => {
        console.log("dirSlider1");
        dirLightTheta = utils.degToRad((e.target.value * 90));
        directionalLightDir =[ Math.cos(dirLightPhi)*Math.sin(dirLightTheta),
                               Math.sin(dirLightPhi)*Math.sin(dirLightPhi),
                               Math.cos(dirLightTheta)];
    });

    document.getElementById("dirSlider2").addEventListener("input", (e) => {
        dirLightPhi = utils.degToRad((e.target.value * 360) % 360);
        directionalLightDir =[ Math.cos(dirLightPhi)*Math.sin(dirLightTheta),
            Math.sin(dirLightPhi)*Math.sin(dirLightPhi),
            Math.cos(dirLightTheta)];
    });

    document.getElementById("pointSlider1").addEventListener("input", (e) => {
        pointLightPosition[0] = e.target.value * 40 - 20;
    });

    document.getElementById("pointSlider2").addEventListener("input", (e) => {
        pointLightPosition[1] = e.target.value * 40 - 20;
    });

    document.getElementById("spotSlider1").addEventListener("input", (e) => {
        spotLightPos[0] = e.target.value * 40 - 20;
    });

    document.getElementById("spotSlider2").addEventListener("input", (e) => {
        spotLightPos[1] = e.target.value * 40 - 20;
    });

    document.getElementById("spotSlider3").addEventListener("input", (e) => {
        //NON SO COSA CI VADA
    });

    document.getElementById("spotSlider4").addEventListener("input", (e) => {
        //NON SO COSA CI VADA
    });

    document.getElementById("spotSlider5").addEventListener("input", (e) => {
        //NON SO COSA CI VADA
    });

    document.getElementById("dirColor").addEventListener("change", (e) => {
        console.log("dirColor");
        console.log(e.target.value);
        var rgbcol = hexToRgb(e.target.value);
        directionalLightColor = [rgbcol.r / 255, rgbcol.g / 255, rgbcol / 255, 1.0];
    });

    document.getElementById("pointColor").addEventListener("change", (e) => {
        var rgbcol = hexToRgb(e.target.value);
        pointLightColor = [rgbcol.r / 255, rgbcol.g / 255, rgbcol / 255, 1.0];
    });

    document.getElementById("spotColor").addEventListener("change", (e) => {
        var rgbcol = hexToRgb(e.target.value);
        spotLightColor = [rgbcol.r / 255, rgbcol.g / 255, rgbcol / 255, 1.0];
    });

    document.getElementById("checkBtn").addEventListener("click", () => {
        console.log("check");
        var correct = checkSolution(selectedSetup);
        if (correct)
            window.alert("Incredibileeee! Rete! Che gol!");
        else
            window.alert("Prova il check... non va!");
    });

    document.getElementById("resetBtn").addEventListener("click", () => {
        console.log("reset")
        isSurrendered = false;
        if (selectedItem >= 0 && selectedItem < 7) {
            assetsData[selectedItem].drawInfo.worldParams[2] -= 0.1;
            selectedItem = -1;
        }
        initPosition(0);
    });

    document.getElementById("surrenderBtn").addEventListener("click", () => {
        console.log("surr")
        console.log(isSurrendered);
        if (!isSurrendered) {
            isSurrendered = true;
        }
    });

})();