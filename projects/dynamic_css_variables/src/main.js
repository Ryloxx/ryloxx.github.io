const fieldFact = (elem, errorField, validInput, formatErrorMessage, inputErrorMessage) =>{
    return ({
        "elem": document.getElementById(elem),
        "errorElem": document.getElementById(errorField),
        "inputErrorColor": "var(--error-input-input-background-color)",
        "formatErrorColor": "var(--error-input-format-background-color)",
        "initialColor": "var(--input-background-color)",
        "validFormat": new RegExp("^[0-9a-z]+$", "i"),
        "validInput": validInput,
        "errorMessageFormat": formatErrorMessage,
        "errorMessageInput": inputErrorMessage,
        error(content){
            this.errorElem.innerHTML = content;
            this.errorElem.style.visibility = "visible";
        },
        setBackgroundColor(color){
            this.elem.style.backgroundColor = color;
        },
        errorInput(){
            this.error(this.errorMessageInput);
            this.setBackgroundColor(this.inputErrorColor);
        },
        errorFormat(){
            this.error(this.errorMessageFormat);
            this.setBackgroundColor(this.formatErrorColor);
        },
        resetError(){
            this.errorElem.style.visibility = "hidden";
            this.setBackgroundColor(this.initialColor);
        },
        resetField(){
            this.resetError();
            this.elem.value = "";
        },
        isValidFormat(){
            return this.elem.value.match(this.validFormat);
        },
        isValidInput(){
            return this.elem.value.match(this.validInput);
        }
    });
}
const fields = [];
fields.push(fieldFact("userIdInput", "usernameError","^testuser$", "Invalid Username Format", "Invalid Username Input"));
fields.push(fieldFact("userPasswordInput", "passwordError","^mypassword$", "Invalid Password Format", "Invalid Password Input"));
const validationButton = document.getElementById("validateForm");
const cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener("click", (even) =>{
    fields.forEach((element) =>{
        element.resetField();
    })
})

validationButton.addEventListener("click", (event) => {
    let temp = true;
    fields.forEach((element) =>{
        temp = validateField(element) && temp;
    })
    if(temp){
        alert("Good Job");
    }
});

function validateField(field){
    if(field.isValidFormat()){
        if(field.isValidInput()){
            field.resetError();
            return true;
        }else{
            field.errorInput();
        }
    }else{
        field.errorFormat();
    }
    return false;
}