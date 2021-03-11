const menu = document.getElementById("navMenu");

function showMenu() {
    menu.classList.toggle("none");
}

function getStarted() {
    window.location.href = "#help";
}

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-64px";
        menu.classList.add("none");
    }
    prevScrollpos = currentScrollPos;
};

const promptToSave = async () => {
    let fileName = prompt(
        "Do you want to save the data? \n\n If yes give your filename then press 'OK', otherwise press 'Cancel'"
    );

    if (fileName) {
        let file = `${fileName}.json`;
        await saveData(inputData, file);
    }
};

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
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

    console.log(files, uploaded);

    if (files) {
        let fileNameEl = document.getElementById("fileName");
        fileNameEl.textContent = `${uploaded.name} is uploaded!`;

        var reader = new FileReader();
        reader.readAsText(uploaded, "UTF-8");

        reader.onload = function (e) {
            let uploadedObj = JSON.parse(e.target.result);
            console.log(uploadedObj);

            uploadedObj.forEach((item) => inputData.push(item));
            main(inputData);
        };

        reader.onerror = function (e) {
            alert("Error importing file!");
        };
    }
};
