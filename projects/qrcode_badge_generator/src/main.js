import InputValidation from "./inputValidation.js";
//Initialze all const variable such as button and display elements
const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");
const addAgainButton = document.getElementById("addAnew");
const result = document.getElementById("result");
const dataEntry = document.getElementById("data-entry");
const userDataDisplay = document.getElementById("user-data-display");
const qrCodeHolder = document.getElementById("qr-code-display");
//Pushing fields into an array
const fields = [];
fields.push(
  InputValidation.fieldFact(
    "Firstname",
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
    "Lastname",
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
    "Email",
    "email",
    "email-error",
    [InputValidation.emailFormat],
    undefined,
    "Invalid email format",
    ""
  )
);
fields.push(
  InputValidation.fieldFact(
    "Twitter",
    "twitter",
    "twitter-error",
    [/.{2}/],
    [/^@/],
    "Please provide a twitter account",
    "You twitter account must start with the character '@'"
  )
);
fields.push(
  InputValidation.fieldFact(
    "Github",
    "github",
    "github-error",
    [InputValidation.defaultFormat],
    undefined,
    "Please provide a github account",
    ""
  )
);
//Submit button event handler
submitButton.addEventListener("click", (event) => {
  //Iterate through the fields and check if they are valid
  if (InputValidation.validateFields(fields)) {
    let userDataList = document.createElement("ol");
    let stringToEncode = "";
    //Initiate the qrcode maker
    let qr = qrcode(0, "H");
    userDataDisplay.innerHTML = "";
    userDataList.setAttribute("class", "list-group-flush");
    //Building the string to encode and the user data render elements
    fields.forEach((field) => {
      let userDataListItem = document.createElement("li");
      let dataItem = field.name + ": " + field.elem.value;
      userDataListItem.setAttribute("class", "list-group-item");
      userDataList.appendChild(userDataListItem);
      userDataListItem.innerHTML = dataItem;
      stringToEncode += dataItem + "\n";
    });
    //Creating the qrcode
    qr.addData(stringToEncode);
    qr.make();
    qrCodeHolder.innerHTML = qr.createImgTag();
    userDataDisplay.appendChild(userDataList);
    //transition to the result
    setTimeout(() => {
      transition(dataEntry, result, 0.5);
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
//Fadein fade out transition animation to swap from the data entry to the results
function transition(before, after, duration) {
  before.style.animation = `fadeOut ${duration}s forwards`;
  setTimeout(() => {
    after.style.display = "flex";
    before.style.display = "none";
    after.style.animation = `fadeIn ${duration}s  forwards`;
  }, duration * 1000);
}
