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
const selectLocalStoredData = document.getElementById("selected-file");
const selectXLocalStoredData = document.getElementById("select-x-label");
const selectYLocalStoredData = document.getElementById("select-y-label");
const loadUserLocalStoredDataButton = document.getElementById(
  "load-user-select"
);
const selectUserDataset = {};
calcButton.disabled = true;
loadUserLocalStoredDataButton.disabled = true;
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
    csv(dataset.path).then((res) => {
      load(res, dataset.name, dataset.x, dataset.y);
    });
  }
});
selectLocalStoredData.addEventListener("change", (event) => {
  let path = selectLocalStoredData.files[0];
  console.log(path);
  if (path) {
    csv(window.URL.createObjectURL(path)).then((textJSON) => {
      for (let selector of [selectXLocalStoredData, selectYLocalStoredData]) {
        while (selector.firstChild) {
          selector.removeChild(selector.firstChild);
        }
        for (let colname in textJSON[0]) {
          let option = document.createElement("option");
          option.value = colname;
          option.text = colname;
          selector.appendChild(option);
        }
      }
      if (selectXLocalStoredData.firstChild) {
        loadUserLocalStoredDataButton.disabled = false;
        selectUserDataset.name = path.name;
        selectUserDataset.data = textJSON;
      }
    });
  }
});
loadUserLocalStoredDataButton.addEventListener("click", (event) => {
  load(
    selectUserDataset.data,
    selectUserDataset.name,
    selectXLocalStoredData.value,
    selectYLocalStoredData.value
  );
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

function load(res, dataname, xlab, ylab) {
  reset();
  res.forEach((record) => {
    let coor = {
      x: parseInt(record[xlab], 10),
      y: parseInt(record[ylab], 10),
    };
    if (!Number.isNaN(coor.x) && !Number.isNaN(coor.y)) {
      model.addCoor(coor);
      view.addCoor(coor);
    }
  });
  view.setDataLabel(dataname);
  view.setXLabel(xlab);
  view.setYLabel(ylab);
  calcButton.disabled = false;
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
