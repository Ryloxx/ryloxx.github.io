const fieldFact = (
  name,
  fieldId,
  errorFieldId,
  validFormat,
  validInput,
  formatErrorMessage,
  inputErrorMessage
) => {
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
      this.errorElem.innerHTML = content;
      this.errorElem.style.visibility = "visible";
    },
    setBackgroundColor(color) {
      this.elem.style.backgroundColor = color;
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
      this.errorElem.style.visibility = "hidden";
      this.setBackgroundColor(this.initialColor);
    },
    resetField() {
      this.resetError();
      this.elem.value = "";
    },
    isValidFormat() {
      return this.elem.value.match(this.validFormat);
    },
    isValidInput() {
      return this.elem.value.match(this.validInput);
    },
  };
};
const defaultFormat = new RegExp("^[0-9a-z]+$", "i");
const emailFormat = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
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
