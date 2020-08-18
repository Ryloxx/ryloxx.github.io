import InputValidation from "./inputValidation.js";
const fields = [];
fields.push(
  InputValidation.fieldFact(
    "username",
    "username",
    "usernameError",
    [/[A-Za-z0-9]{4,8}/],
    "",
    "*Username must contain only letter and digits and a length between 4 to 8 characters",
    "*Username already taken"
  )
);
fields.push(
  InputValidation.fieldFact(
    "email",
    "email",
    "emailError",
    [InputValidation.emailFormat, /^.*@gmail.com$/],
    "",
    "*Invalid email format(only '@gmail.com' is supported",
    "*Email already used"
  )
);
fields.push(
  InputValidation.fieldFact(
    "password",
    "password",
    "passwordError",
    [/(?=.{0,20})(?=(.*[A-Z]){5,})(?=(.*-){2,})(?=(.*[^a-zA-Z0-9-]){6,})/],
    "",
    "*Password has a maximum length of 20 chars and must contain at least 5 uppercase letter, 2 '-' and 6 symbols",
    "*Can't use this password"
  )
);
fields.forEach((element) => {
  console.log(element);
});
document.getElementById("submitButton").addEventListener("click", (event) => {
  if (InputValidation.validateFields(fields)) {
    alert("Good Job");
  }
});
