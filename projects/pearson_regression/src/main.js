import PearsonView from "./view.js";
import PearsonModel from "./model.js";
import InputValidation from "./inputValidation.js";

const view = new PearsonView.View(
  "#coor-list",
  "#result-display",
  "#chart-display",
  ".x",
  ".y"
);
const model = new PearsonModel.Model();
const addCoorButton = document.getElementById("add-coor-button");
const calcButton = document.getElementById("calc-button");
const loadStoredData = document.getElementById("load-stored-data");
const selectStoredData = document.getElementById("stored-dataset-select");
const restButton = document.getElementById("reset-button");
calcButton.disabled = true;
const yCorrInputField = InputValidation.fieldFact(
  "y-coor",
  "y-input",
  "y-input-error",
  [/^0$|^[1-9]+[0-9]*$/],
  undefined,
  "Invalid Y coordinate",
  ""
);
const xCorrInputField = InputValidation.fieldFact(
  "x-coor",
  "x-input",
  "x-input-error",
  [/^0$|^[1-9]+[0-9]*$/],
  undefined,
  "Invalid X coordinate",
  ""
);

addCoorButton.addEventListener("click", (event) => {
  if (InputValidation.validateFields([yCorrInputField, xCorrInputField])) {
    let coor = { x: xCorrInputField.elem.value, y: yCorrInputField.elem.value };
    model.addCoor(coor);
    view.addCoor(coor);
    xCorrInputField.resetField();
    yCorrInputField.resetField();
    calcButton.disabled = false;
  }
});
calcButton.addEventListener("click", (event) => {
  view.displayResult(model.getPearsonCoef());
});
loadStoredData.addEventListener("click", (event) => {
  if (selectStoredData.value in storedDataSet) {
    let dataset = storedDataSet[selectStoredData.value];
    reset();
    csv(dataset.path).then((res) => {
      res.forEach((record) => {
        let coor = {
          x: parseInt(record[dataset.x], 10),
          y: parseInt(record[dataset.y], 10),
        };
        if (!Number.isNaN(coor.x) && !Number.isNaN(coor.y)) {
          model.addCoor(coor);
          view.addCoor(coor);
        }
      });
      view.setDataLabel(dataset.name);
      view.setXLabel(dataset.x);
      view.setYLabel(dataset.y);
      calcButton.disabled = false;
    });
  }
});
restButton.addEventListener("click", (event) => {
  reset();
});
function reset() {
  model.reset();
  view.reset();
  xCorrInputField.resetField();
  yCorrInputField.resetField();
  calcButton.disabled = true;
}
function trimQuote(s) {
  return s.replace(/^"+|"+$/g, "");
}
function csvToJSON(csvdata) {
  let records = csvdata.split("\n");
  let colNames = records[0].split(",").map(trimQuote);
  let res = [];
  for (let i = 1; i < Math.min(200, records.length); i++) {
    let record = records[i].split(",").map(trimQuote);
    let jsonrecord = {};
    colNames.forEach((name, index) => {
      jsonrecord[name] = record[index];
    });
    res.push(jsonrecord);
  }
  return res;
}
async function csv(path) {
  return await fetch(path)
    .then(function (response) {
      return response.text();
    })
    .then(function (csvTxt) {
      return csvToJSON(csvTxt);
    });
}

const storedDataSet = [
  {
    name: "Heart Failure Dataset",
    path: "./datasets/heart_failure_clinical_records_dataset.csv",
    x: "age",
    y: "creatinine_phosphokinase",
  },
  {
    name: "Students Performance",
    path: "./datasets/StudentsPerformance.csv",
    x: "reading score",
    y: "writing score",
  },
];
storedDataSet.forEach((dataset, index) => {
  let option = document.createElement("option");
  selectStoredData.appendChild(option);
  option.textContent = dataset.name;
  option.value = index;
});
