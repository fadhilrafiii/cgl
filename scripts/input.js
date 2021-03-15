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

    inputObject["coordinates"] = getObjCoordinates(inputObject)

    arrInputObject.push(inputObject);
    main(arrInputObject);
}

const getObjCoordinates = (data) => {

    let coordinates = [];
    if (data.shape == 'cube') {
      coordinates.push(data.x - (data.length / 2), data.y - (data.length / 2));
      coordinates.push(data.x + (data.length / 2), data.y - (data.length / 2));
      coordinates.push(data.x - (data.length / 2), data.y + (data.length / 2));
      coordinates.push(data.x + (data.length / 2), data.y + (data.length / 2));
    } 
  
    return coordinates;
  }


console.log(arrInputObject)
