import Database from "./database.js";
import View from "./view.js";
import InputValidation from "./inputValidation.js";

const loadButton = document.getElementById("loadButton");
const queryButton = document.getElementById("queryButton");
const clearButton = document.getElementById("clearButton");
const adduserButton = document.getElementById("adduserButton");
const fields = [];
fields.push(
  InputValidation.fieldFact(
    "name",
    "newname",
    "nameError",
    InputValidation.defaultFormat,
    "",
    "Invalid Format Name",
    "Invalid Input Name"
  )
);
fields.push(
  InputValidation.fieldFact(
    "email",
    "newmail",
    "emailError",
    InputValidation.emailFormat,
    "",
    "Invalid Email Format",
    "Email already in use"
  )
);
const queryCustomerViewEngine = function (dbname, objectStorename) {
  const dataconnection = indexedDB.open(dbname);
  dataconnection.onerror = (event) => {
    console.log(
      "Error occured while trying to connect to database :",
      event.target.message
    );
  };
  dataconnection.onsuccess = (event) => {
    console.log("Connection success.");
    const data = event.target.result;
    var trans = data.transaction(objectStorename, "readonly");
    var table = trans.objectStore(objectStorename);
    var res = table.getAll();
    res.onsuccess = (event) => {
      this.updateData(event.target.result);
    };
    res.onerror = (event) => {
      this.error(event.target.message);
    };
  };
};
const queryAddCustomer = function (customer, dbname, objectStorename) {
  const dataconnection = indexedDB.open(dbname);
  dataconnection.onsuccess = (event) => {
    const db = event.target.result;
    const tran = db.transaction(objectStorename, "readwrite");
    const table = tran.objectStore(objectStorename);
    const res = table.add(customer);
    res.oncomplete = (event) => {
      this.updateData(event.target.result);
    };
    res.onerror = (event) => {
      this.error(event.target.error.message);
    };
  };
};
const dataView = new View.DataView(document.getElementById("dataView"));

loadButton.addEventListener("click", (event) => {
  clearButton.disabled = false;
  loadButton.disabled = true;
  Database.loadDB();
});
queryButton.addEventListener("click", (event) => {
  queryCustomerViewEngine.call(dataView, Database.DBNAME, "customers");
});
clearButton.addEventListener("click", (event) => {
  clearButton.disabled = true;
  loadButton.disabled = false;
  Database.clearDB();
});
adduserButton.addEventListener("click", (event) => {
  if (InputValidation.validateFields(fields)) {
    let newCustomer = {};
    fields.forEach((field) => {
      newCustomer[field.name] = field.elem.value;
    });

    queryAddCustomer.call(dataView, newCustomer, Database.DBNAME, "customers");
  }
});

function init() {
  clearButton.disabled = true;
  loadButton.disabled = false;
}

init();
