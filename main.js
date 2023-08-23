const navListEl = document.querySelector(".navbar__list");
const toggleEl = document.querySelector(".navbar__toggle"); //capturo el menú hamburguesa
console.log(toggleEl);

//para desplegar navbar en menú hamburguesa

const showMenu = () => {
  navListEl.classList.toggle("show-navbar");
};

toggleEl.addEventListener("click", showMenu);

//para que con about us al hacer click desaparezca el botón

const aboutButtonEl = document.querySelector(".about__button");
console.log(aboutButtonEl);
const aboutContainerEl = document.querySelector(".about__contenedor");
console.log(aboutContainerEl);

const hiddenButtonAboutAndShowText = () => {
  aboutButtonEl.classList.toggle("display-none");
  aboutContainerEl.innerHTML = `<p>
  We are a leading company in the manufacture of clothing for ballet dancers for more than 20 years. We focus on the comfort and quality of our garments, so that you can give your best version both in classes and on stage.</p> `;
  aboutContainerEl.classList.toggle("about-p");
};

aboutButtonEl.addEventListener("click", hiddenButtonAboutAndShowText);

/* para que desaparezca el menú desplegado en mobile al scrollear*/

const closeOnScroll = () => {
  if (window.scrollY > 50) {
    // Ajusta el valor según cuánto desees que el elemento desaparezca
    navListEl.style.display = "none";
  } else {
    navListEl.style.display = ""; // O 'inline', según el tipo de elemento que sea
  }
};

window.addEventListener("scroll", closeOnScroll);

/* para que desaparezca la navbar de mobile cuando agrando la pantalla*/

const closeNavbarMovile = () => {
  if (window.innerWidth > 768) {
    navListEl.classList.remove("show-navbar");
  }
};

window.addEventListener("resize", closeNavbarMovile);

/* VALIDACION DE FORMULARIO*/

const formEl = document.querySelector(".form");
const formNameEl = document.getElementById("name");
const formNameCheckEl = document.querySelector(".name-check");
const formNumberEl = document.getElementById("number");
const formEmailEl = document.getElementById("email");
const formEmailCheckEl = document.querySelector(".email-check");
const formTextEl = document.getElementById("textarea");
const formButtonEl = document.querySelector(".form-button");

// Checkear si el campo está vacío:

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

//Validar el mail:

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
  }
};

const init = () => {
  formNameEl.addEventListener("input", () => checkName(formNameEl));
  formEmailEl.addEventListener("input", () => checkEmail(formEmailEl));
  formNumberEl.addEventListener("input", () => checkPhone(formNumberEl));
  formTextEl.addEventListener("input", () => checkText(formTextEl));
};

init();
