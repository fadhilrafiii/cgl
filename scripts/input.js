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
    parseFloat(document.getElementById("x-camera").value),
    parseFloat(document.getElementById("y-camera").value),
    parseFloat(document.getElementById("z-camera").value),
    parseFloat(document.getElementById("zoom-camera").value)
]

let projectionArray = [
    parseFloat(document.getElementById("fov").value),
    parseFloat(document.getElementById("znear").value),
    parseFloat(document.getElementById("zfar").value),
    parseFloat(document.getElementById("left").value),
    parseFloat(document.getElementById("right").value),
    parseFloat(document.getElementById("bottom").value),
    parseFloat(document.getElementById("top").value),
    parseFloat(document.getElementById("near").value),
    parseFloat(document.getElementById("far").value),
    parseFloat(document.getElementById("tetha").value),
    parseFloat(document.getElementById("phi").value)
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
            inputObject[key] = parseFloat(value);
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
            (el.valueAsNumber - parseFloat(el.min)) /
            (parseFloat(el.max) - parseFloat(el.min));
        var style =
            "background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(" +
            valPercent +
            ", #ffa500), color-stop(" +
            valPercent +
            ", #f5f6f8));";
        el.style = style;
        transformArray[index] = parseFloat(el.value);
        document.getElementById(listOfSliderLabel[index]).textContent =
            el.value;
        console.log(el.defaultValue)
        main(inputObject, projection, transformArray, cameraArray)
    };
    el.oninput();
});

document.querySelectorAll(".camera-slider").forEach(function (el, index) {
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
        cameraArray[index] = parseFloat(el.value);
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

let resetBtn = document.querySelector("#reset-btn");

const reset = () => {
    let allInput = document.querySelectorAll("input");

    allInput = Array.prototype.slice.call(allInput)
    allInput = [...allInput.slice(0,11), ...allInput.slice(18,29)]

    console.log(allInput)

    allInput.forEach((item, index) => {
        item.value = parseFloat(item.defaultValue);
        var valPercent =
            (item.valueAsNumber - parseFloat(item.min)) /
            (parseFloat(item.max) - parseFloat(item.min));
        var style =
            "background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(" +
            valPercent +
            ", #ffa500), color-stop(" +
            valPercent +
            ", #f5f6f8));";
        item.style = style;
        
        if (index >= 0  && index < 4) {
            cameraArray[index] = parseFloat(item.value);
            document.getElementById(cameraSliderLabel[index]).textContent = parseFloat(item.value);
        }

        if (index >= 4  && index < 11) {
            transformArray[index-4] = parseFloat(item.value);
            document.getElementById(listOfSliderLabel[index-4]).textContent = parseFloat(item.value);
        }

        if (index >= 11  && index < 22) {
            projection.element[index-11] = parseFloat(item.value);
            document.getElementById(projectionSliderLabel[index-11]).textContent = parseFloat(item.value);
        }

        console.log(item.value)
    })
    console.log(cameraArray)
    console.log(transformArray)
    console.log(projectionArray)
    main(inputObject, projection, transformArray, cameraArray);
}

resetBtn.addEventListener("click", reset)