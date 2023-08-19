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
