const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("password2");
const sumbitBtn = document.querySelector("button");

function getFieldName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const failedInput = (inputCnt, massage) => {
  if (inputCnt.classList.contains("success"))
    inputCnt.classList.remove("success");
  inputCnt.classList.add("failed");
  inputCnt.querySelector("small").innerText = massage;
};

const successInput = (inputCnt) => {
  if (inputCnt.classList.contains("failed"))
    inputCnt.classList.remove("failed");
  inputCnt.classList.add("success");
};

const checkEmailInput = () => {
  const regx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regx.test(email.value)) successInput(email.parentElement);
  else failedInput(email.parentElement, `Enter valid Email`);
};

function checkEmptyInput(inputArr) {
  for (const i of inputArr) {
    const parent = i.parentElement;
    const fieldName = parent.querySelector("label").innerText;
    if (!i.value.trim())
      failedInput(parent, `${getFieldName(fieldName)} Is Required`);
    else successInput(parent);
  }
}

function checkLength(element, min, max) {
  const parent = element.parentElement;
  if (element.value.length > max) {
    let filedName = parent.querySelector("label").innerText;
    filedName = getFieldName(filedName);
    failedInput(parent, `${filedName} Must be at Max ${max} characters`);
  } else if (element.value.length < min) {
    let filedName = parent.querySelector("label").innerText;
    filedName = getFieldName(filedName);
    failedInput(parent, `${filedName} Must be at Least ${min} characters`);
  } else successInput(parent);
}

function checkConfirmPassword() {
  const parent = confirmPassword.parentElement;
  if (password.value !== confirmPassword.value)
    failedInput(parent, `Password Does not match`);
  else if (password.parentElement.classList.contains("failed"))
    failedInput(parent, `Enter legal Password First`);
  else successInput(parent);
}

sumbitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  checkEmptyInput([username, email, password, confirmPassword]);
  checkEmailInput();
  checkLength(username, 3, 15);
  checkLength(password, 6, 30);
  checkConfirmPassword();
});
