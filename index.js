(function(){

    var select = document.getElementById("stageSelect");
    var optionToInsert = document.createElement("option");
    optionToInsert.setAttribute("value", "");
    optionToInsert.setAttribute("disabled", "");
    optionToInsert.setAttribute("selected", "");
    optionToInsert.setAttribute("hidden", "");
    optionToInsert.innerText = "Select your option";
    select.appendChild(optionToInsert);
    for(var i = 0; i < setups.length; i++) {
        optionToInsert = document.createElement("option");
        optionToInsert.setAttribute("value", i);
        optionToInsert.innerText = setups[i].name;
        optionToInsert.addEventListener("click", (e) => {
            isSurrendered = false;
            initPosition(0);
            initPositionSolution(e.target.getAttribute("value"));
        });
        select.appendChild(optionToInsert);
    }

    document.getElementById("dirLightEnable").addEventListener("change", () => {
        console.log("dirLightEnable");
        if(this.checked){
            lightSwitch.x = 1;
        }
        else {
            lightSwitch.x = 0;
        }
    });

    document.getElementById("pointLightEnable").addEventListener("change", () => {
        console.log("pointLightEnable");
        if(this.checked){
            lightSwitch.y = 1;
        }
        else {
            lightSwitch.y = 0;
        }
    });

    document.getElementById("spotLightEnable").addEventListener("change", () => {
        console.log("spotLightEnable");
        if(this.checked){
            lightSwitch.z = 1;
        }
        else {
            lightSwitch.z = 0;
        }
    });

    document.getElementById("dirSlider1").addEventListener("change", (e) => {
        console.log(e.target.value);
        dirLightAlpha = (e.target.value * 360) % 360;
    });

    document.getElementById("dirSlider2").addEventListener("change", (e) => {
        dirLightBeta = (e.target.value * 360) % 360;
    });

    document.getElementById("pointSlider1").addEventListener("change", (e) => {
        pointLightPosition[0] = e.target.value * 40 - 20;
    });

    document.getElementById("pointSlider2").addEventListener("change", (e) => {
        pointLightPosition[1] = e.target.value * 40 - 20;
    });

    document.getElementById("spotSlider1").addEventListener("change", (e) => {
        spotLightPosition[0] = e.target.value * 40 - 20;
    });

    document.getElementById("spotSlider2").addEventListener("change", (e) => {
        spotLightPosition[1] = e.target.value * 40 - 20;
    });

    document.getElementById("dirColor").addEventListener("change", (e) => {
        console.log("dirColor");
        console.log(e.target.value);
        directionalLightColor = e.target.value;
    });

    document.getElementById("pointColor").addEventListener("change", (e) => {
        pointLightColor = e.target.value;
    });

    document.getElementById("spotColor").addEventListener("change", (e) => {
        spotLightColor = e.target.value;
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
        initPosition(0);
    });

    document.getElementById("surrenderBtn").addEventListener("click", () => {
        console.log("surr")
        console.log(isSurrendered);
        if(!isSurrendered) {
            isSurrendered = true;
        }
    });

})();