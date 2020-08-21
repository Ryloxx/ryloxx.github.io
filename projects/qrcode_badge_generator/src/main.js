import InputValidation from "./inputValidation.js";
//Initialze all const variable such as button and display elements
const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");
const addAgainButton = document.getElementById("addAnew");
const updateQrButton = document.getElementById("update-qr");
const printQrButton = document.getElementById("print-qr");
const result = document.getElementById("result");
const dataEntry = document.getElementById("data-entry");
const userDataDisplay = document.getElementById("user-data-display");
const qrCodeHolder = document.getElementById("qr-code-display");
//Pushing fields into an array
const fields = [];
fields.push(
  InputValidation.fieldFact(
    "firstname",
    "firstname",
    "firstname-error",
    [InputValidation.defaultFormat],
    undefined,
    "Please provide a firstname",
    ""
  )
);
fields.push(
  InputValidation.fieldFact(
    "lastname",
    "lastname",
    "lastname-error",
    [InputValidation.defaultFormat],
    undefined,
    "Please provide a lastname",
    ""
  )
);
fields.push(
  InputValidation.fieldFact(
    "e-mail",
    "e-mail",
    "email-error",
    [InputValidation.emailFormat],
    undefined,
    "Invalid email format",
    ""
  )
);
fields.push(
  InputValidation.fieldFact(
    "twitter",
    "twitter",
    "twitter-error",
    [],
    [/^$|^@.+/],
    "Please provide a twitter account",
    "You twitter account must start with the character '@'"
  )
);
fields.push(
  InputValidation.fieldFact(
    "github",
    "github",
    "github-error",
    [],
    [/^$|[0-9A-Za-zéè-]+/],
    "Please provide a github account",
    "Invalid github account name"
  )
);

const updateFields = {};
fields.forEach((field) => {
  let obj = Object.assign({}, field);
  obj.elem = document.getElementById(`${field.name}-update`);
  obj.errorElem = document.getElementById(`${field.name}-error-update`);
  updateFields[field.name] = obj;
  obj.elem.addEventListener("input", (event) => {
    updateQrButton.disabled = false;
  });
});
[fields[3], updateFields["twitter"]].forEach((a) => {
  a.elem.addEventListener("input", (event) => {
    addAtBefore(a);
  });
});

//Submit button event handler
submitButton.addEventListener("click", (event) => {
  console.log(updateFields);
  //Iterate through the fields and check if they are valid
  if (InputValidation.validateFields(fields)) {
    setTimeout(() => {
      //Creating the qrcode
      qrCodeHolder.innerHTML = createQrcode(createString(fields));
      //transition to the result
      transition(dataEntry, result, 0.5, () => {
        //Building the user data render elements
        fields.forEach((field) => {
          if (field.elem.value) {
            updateFields[field.name].elem.value = field.elem.value;
            updateFields[field.name].elem.parentNode.style.display = "grid";
          }
          updateQrButton.disabled = true;
        });
      });
    }, 1000);
  }
});
//Rests all fields and potential errors
cancelButton.addEventListener("click", (event) => {
  fields.forEach((field) => {
    field.resetField();
  });
});
//Transition back to the data entry phase
addAgainButton.addEventListener("click", (event) => {
  fields.forEach((field) => {
    field.resetField();
  });
  transition(result, dataEntry, 0.5);
});
//Update the current displayed qr
updateQrButton.addEventListener("click", (event) => {
  let fields = Object.values(updateFields);
  if (InputValidation.validateFields(fields)) {
    let updatedQr = createQrcode(createString(fields));
    transition(qrCodeHolder, qrCodeHolder, 0.5, () => {
      qrCodeHolder.innerHTML = updatedQr;
      updateQrButton.disabled = true;
    });
  } else {
    updateQrButton.disabled = true;
  }
});
//Print qrcode button
printQrButton.addEventListener("click", (event) => {
  window.print();
});
//Fadein fade out transition animation to swap from the data entry to the results
function transition(before, after, duration, callbackmid) {
  before.style.animation = `fadeOut ${duration}s forwards`;
  setTimeout(() => {
    if (typeof callbackmid == "function") {
      callbackmid();
    }
    before.style.display = "none";
    after.style.display = "flex";
    after.style.animation = `fadeIn ${duration}s  forwards`;
  }, duration * 1000);
}
/**
 * Encode a string in to a qrcode image tag elem
 * @param {string} s - String to encode
 */
function createQrcode(s) {
  let qr = qrcode(0, "H");
  qr.addData(s);
  qr.make();
  return qr.createImgTag();
}
/**
 * Create string of multiple field object
 * @param {...fields} fields
 */
function createString(fields) {
  return fields
    .filter((a) => {
      return a.elem.value;
    })
    .map((a) => {
      let res = a.name;
      res = res.charAt(0).toUpperCase() + res.slice(1);
      return res + " :" + a.elem.value;
    })
    .join("\n");
}
function addAtBefore(field) {
  if (field.elem.value && field.elem.value.charAt(0) != "@") {
    field.elem.value = "@" + field.elem.value;
  }
}
