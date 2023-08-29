/* VALIDACION DE CONTACT*/

const formEl = document.querySelector(".form");
const formNameEl = document.getElementById("name");
const formNumberEl = document.getElementById("number");
const formEmailEl = document.getElementById("email");
const formTextEl = document.getElementById("textarea");
const formButtonEl = document.querySelector(".form-button");

//Traigo los mensajes del localStorage o creo array vacío si no hay mensajes:

const messages = JSON.parse(localStorage.getItem("messages")) || [];

//Guardo los mensajes en localStorage:

const saveToLocalStorage = () => {
  localStorage.setItem("messages", JSON.stringify(messages));
};

//Validar si el campo está vacío:

const isEmpty = (input) => {
  return !input.value.trim().length;
};

//Validar el largo del input:

const inputLenght = (input, min, max) => {
  return input.value.length >= min && input.value.length < max;
};

//Validar email:

const inputEmail = (input) => {
  const re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/;
  return re.test(input.value.trim());
};

//Validar teléfono:

const inputPhone = (input) => {
  const re = /^[0-9]{10}$/;
  return re.test(input.value.trim());
};

//Mostrar errores de validación:

const error = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("input-success");
  formField.classList.add("input-error");
  const err = formField.querySelector("small");
  err.style.display = "block";
  err.textContent = message;
};

//Mostrar validación exitosa:

const success = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("input-error");
  formField.classList.add("input-success");
  const suc = formField.querySelector("small");
  suc.style.borderColor = "green";
  suc.textContent = "";
};

//Validar el name:

const checkName = (input) => {
  let valid = false;
  const min = 3;
  const max = 23;

  if (isEmpty(input)) {
    error(input, "* Complete this field.");
    return;
  }
  if (!inputLenght(input, min, max)) {
    error(
      input,
      `* This field must have between ${min} and ${max} characters.`
    );
    return;
  }

  success(input);
  valid = true;
  return valid;
};

//Validar el email:

const checkEmail = (input) => {
  let valid = false;
  if (isEmpty(input)) {
    error(input, "* Complete this field.");
    return;
  }
  if (!inputEmail(input)) {
    error(input, "* This email is not valid");
    return;
  }
  success(input);
  valid = true;
  return valid;
};

//Validar el teléfono:

const checkPhone = (input) => {
  let valid = false;
  if (isEmpty(input)) {
    error(input, "* Complete this field.");
    return;
  }
  if (!inputPhone(input)) {
    error(input, "* This phone is not valid");
    return;
  }
  success(input);
  valid = true;
  return valid;
};

//Validar el mensaje:

const checkText = (input) => {
  let valid = false;
  const min = 10;
  const max = 100;

  if (isEmpty(input)) {
    error(input, "* Complete this field.");
    return;
  }
  if (!inputLenght(input, min, max)) {
    error(
      input,
      `* This field must have between ${min} and ${max} characters.`
    );
    return;
  }

  success(input);
  valid = true;
  return valid;
};

//Validar form:

const formValidate = (event) => {
  event.preventDefault();
  let nameValidate = checkName(formNameEl);
  let emailValidate = checkEmail(formEmailEl);
  let numberValidate = checkPhone(formNumberEl);
  let textValidate = checkText(formTextEl);

  let formValidate =
    nameValidate && emailValidate && numberValidate && textValidate;

  if (formValidate) {
    messages.push({
      name: formNameEl.value,
      email: formEmailEl.value,
      phone: formNumberEl.value,
      text: formTextEl.value,
    });
    saveToLocalStorage(messages);
    alert("Your message has been sent successfully");
  }
  formEl.reset();
};

//Función init del contact, que será llamada en el main.js:

const initContact = () => {
  formEl.addEventListener("submit", formValidate);
  formNameEl.addEventListener("input", () => checkName(formNameEl));
  formEmailEl.addEventListener("input", () => checkEmail(formEmailEl));
  formNumberEl.addEventListener("input", () => checkPhone(formNumberEl));
  formTextEl.addEventListener("input", () => checkText(formTextEl));
};
