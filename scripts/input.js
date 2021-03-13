let arrInputObject = [];

const form = document.querySelector("form");

form.addEventListener("submit", e => submitForm(e))

const submitForm = e => {
    e.preventDefault();
    
    const dataForm = new FormData(e.target);
    
    const entries = dataForm.entries();
    
    let inputObject = {};
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

    arrInputObject.push(inputObject);
    console.log(arrInputObject);
}


console.log(arrInputObject)
