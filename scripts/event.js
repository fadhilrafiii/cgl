const menu = document.getElementById("navMenu");

function showMenu() {
    menu.classList.toggle("none");
}

function getStarted() {
    window.location.href = "#help";
}

// For translation input
document.querySelectorAll(".translate").forEach(function (el, index) {
    el.oninput = function () {
        let length = el.value.length;
        if (parseInt(el.value)) {
            transformArray[4+index] = parseInt(el.value);
        }

        if (!parseInt(el.value[length-1])) {
            transformArray[4+index] = 0;
        }
    };
    el.oninput();
});

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-64px";
        menu.classList.add("none");
    }
    prevScrollpos = currentScrollPos;
};

const saveData = (function () {
    var a = document.createElement("a");
    // document.body.appendChild(a);
    // a.style = "display: none";
    return function (data, fileName) {
      var json = JSON.stringify(data),
        blob = new Blob([json], { type: "octet/stream" }),
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    };
})();

const promptToSave = async () => {
    let fileName = prompt(
        "Do you want to save the data? \n\n If yes give your filename then press 'OK', otherwise press 'Cancel'"
    );

    if (fileName) {
        let file = `${fileName}.json`;
        await saveData(inputObject, file);
    }
};

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16) / 255,
              g: parseInt(result[2], 16) / 255,
              b: parseInt(result[3], 16) / 255,
          }
        : null;
}

const importFile = () => {
    let file = document.getElementById("file");

    let { files } = file;
    let [uploaded] = files;

    if (files) {
        let fileNameEl = document.getElementById("fileName");
        fileNameEl.textContent = `${uploaded.name} is uploaded!`;

        let reader = new FileReader();
        reader.readAsText(uploaded, "UTF-8");

        reader.onload = function (e) {
            inputObject = JSON.parse(e.target.result);
            main(inputObject, projection, transformArray, cameraArray)
        };

        reader.onerror = function (e) {
            alert("Error importing file!");
        };
    }
};

