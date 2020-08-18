const fieldFact = (
  name,
  fieldId,
  errorFieldId,
  validFormat,
  validInput,
  formatErrorMessage,
  inputErrorMessage
) => {
  if (typeof validFormat === "undefined") validFormat = [];
  if (typeof validInput === "undefined") validInput = [];
  return {
    name: name,
    elem: document.getElementById(fieldId),
    errorElem: document.getElementById(errorFieldId),
    inputErrorColor: "var(--error-input-input-background-color)",
    formatErrorColor: "var(--error-input-format-background-color)",
    initialColor: "var(--input-background-color)",
    validFormat: validFormat,
    validInput: validInput,
    errorMessageFormat: formatErrorMessage,
    errorMessageInput: inputErrorMessage,
    error(content) {
      if (this.hasErrElem()) {
        this.errorElem.innerHTML = content;
        this.errorElem.style.visibility = "visible";
      }
    },
    setBackgroundColor(color) {
      if (this.hasInputElem()) {
        this.elem.style.backgroundColor = color;
      }
    },
    errorInput() {
      this.error(this.errorMessageInput);
      this.setBackgroundColor(this.inputErrorColor);
    },
    errorFormat() {
      this.error(this.errorMessageFormat);
      this.setBackgroundColor(this.formatErrorColor);
    },
    resetError() {
      if (this.hasInputElem) {
        this.setBackgroundColor(this.initialColor);
      }
      if (this.hasErrElem()) {
        this.errorElem.style.visibility = "hidden";
      }
    },
    resetField() {
      this.resetError();
      if (this.hasInputElem()) {
        this.elem.value = "";
      }
    },
    testRegexes(value, regexes) {
      for (var reg of regexes) {
        if (!reg.test(value)) {
          return false;
        }
      }
      return true;
    },
    isValidFormat() {
      return (
        this.hasInputElem() &&
        this.testRegexes(this.elem.value, this.validFormat)
      );
    },
    isValidInput() {
      return (
        this.hasInputElem() &&
        this.testRegexes(this.elem.value, this.validInput)
      );
    },
    hasErrElem() {
      return Boolean(this.errorElem);
    },
    hasInputElem() {
      return Boolean(this.elem);
    },
  };
};
const defaultFormat = /^[0-9a-zA-Z]+$/;
const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validateFields(fields) {
  let temp = true;
  fields.forEach((field) => {
    temp = validateField(field) && temp;
  });
  return temp;
}
function validateField(field) {
  if (field.isValidFormat()) {
    if (field.isValidInput()) {
      field.resetError();
      return true;
    } else {
      field.errorInput();
    }
  } else {
    field.errorFormat();
  }
  return false;
}

export default {
  fieldFact,
  validateField,
  validateFields,
  defaultFormat,
  emailFormat,
};
