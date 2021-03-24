const listOfSliderLabel = [
    "x-rotate-label",
    "y-rotate-label",
    "z-rotate-label",
    "scale-label",
    "x-translate-label",
    "y-translate-label",
    "z-translate-label",
];

const cameraSliderLabel = [
    "x-camera-label",
    "y-camera-label",
    "z-camera-label",
    "zoom-camera-label"
]

const projectionSliderLabel = [
    "fov-label",
    "znear-label",
    "zfar-label",
    "left-label",
    "right-label",
    "bottom-label",
    "top-label",
    "near-label",
    "far-label",
    "tetha-label",
    "phi-label"
]

let obliqueInput = document.getElementById("oblique");
let perspectiveInput = document.getElementById("perspective");
let orthoInput = document.getElementById("orthographic")

perspectiveInput.style.display = "none";
obliqueInput.style.display = "none";
orthoInput.style.display = "none";


let transformArray = [
    document.getElementById("x-rotate").value,
    document.getElementById("y-rotate").value,
    document.getElementById("z-rotate").value,
    document.getElementById("scale").value,
    document.getElementById("x-translate").value,
    document.getElementById("y-translate").value,
    document.getElementById("z-translate").value,
];

let cameraArray = [
    parseInt(document.getElementById("x-camera").value),
    parseInt(document.getElementById("y-camera").value),
    parseInt(document.getElementById("z-camera").value),
    parseInt(document.getElementById("zoom-camera").value)
]

let projectionArray = [
    parseInt(document.getElementById("fov").value),
    parseInt(document.getElementById("znear").value),
    parseInt(document.getElementById("zfar").value),
    parseInt(document.getElementById("left").value),
    parseInt(document.getElementById("right").value),
    parseInt(document.getElementById("bottom").value),
    parseInt(document.getElementById("top").value),
    parseInt(document.getElementById("near").value),
    parseInt(document.getElementById("far").value),
    parseInt(document.getElementById("tetha").value),
    parseInt(document.getElementById("phi").value)
]

let projection = {
    type: "perspective",
    element: projectionArray
}

let inputObject = {};

const form = document.querySelector("#drawForm");

form.addEventListener("submit", e => submitForm(e))

const submitForm = e => {
    e.preventDefault();
    
    const dataForm = new FormData(e.target);
    
    const entries = dataForm.entries();
    
    for (let item of entries) {
        let [key, value] = item;

        if (key === "shape") {
            inputObject[key] = value;
        } 
        else if (key === "color") {
            inputObject[key] = hexToRgb(value)
        }
        else {
            inputObject[key] = parseInt(value);
        }
    }

    main(inputObject, projection, transformArray, cameraArray)
}

function openSlider(e){

    if (e === "perspective") {
        perspectiveInput.style.display = "block";
        obliqueInput.style.display = "none";
        orthoInput.style.display = "none";
    } else if (e === "orthographic") {
        perspectiveInput.style.display = "none";
        obliqueInput.style.display = "none";
        orthoInput.style.display = "block";
    } else if (e === "oblique") {
        perspectiveInput.style.display = "none";
        obliqueInput.style.display = "block";
        orthoInput.style.display = "block";
    } else {
        perspectiveInput.style.display = "none";
        obliqueInput.style.display = "none";
        orthoInput.style.display = "none";
    }

    projection.type = e

    main(inputObject, projection, transformArray, cameraArray);
}



// For slider (rotation and scaling) input
document.querySelectorAll(".transform-slider").forEach(function (el, index) {
    el.oninput = function () {
        var valPercent =
            (el.valueAsNumber - parseInt(el.min)) /
            (parseInt(el.max) - parseInt(el.min));
        var style =
            "background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(" +
            valPercent +
            ", #ffa500), color-stop(" +
            valPercent +
            ", #f5f6f8));";
        el.style = style;
        transformArray[index] = parseInt(el.value);
        document.getElementById(listOfSliderLabel[index]).textContent =
            el.value;
        main(inputObject, projection, transformArray, cameraArray)
    };
    el.oninput();
});

document.querySelectorAll(".camera-slider").forEach(function (el, index) {
    el.oninput = function () {
        var valPercent =
            (el.valueAsNumber - parseInt(el.min)) /
            (parseInt(el.max) - parseInt(el.min));
        var style =
            "background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(" +
            valPercent +
            ", #ffa500), color-stop(" +
            valPercent +
            ", #f5f6f8));";
        el.style = style;
        cameraArray[index] = parseInt(el.value);
        document.getElementById(cameraSliderLabel[index]).textContent =
            el.value;
        main(inputObject, projection, transformArray, cameraArray)
    };
    el.oninput();
});

document.querySelectorAll(".slider").forEach(function (el, index) {
    el.oninput = function () {
        var valPercent =
            (el.valueAsNumber - parseFloat(el.min)) /
            (parseFloat(el.max) - parseFloat(el.min));
        var style =
            "background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(" +
            valPercent +
            ", #ffa500), color-stop(" +
            valPercent +
            ", #f5f6f8));";
        el.style = style;
        projectionArray[index] = parseFloat(el.value);
        document.getElementById(projectionSliderLabel[index]).textContent =
            el.value;
        projection.element = projectionArray;
        main(inputObject, projection, transformArray, cameraArray)
    };
    el.oninput();
});



