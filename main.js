const navListEl = document.querySelector(".navbar__list"); //contiene los links de products, about y contact
const toggleEl = document.querySelector(".navbar__toggle"); //capturo el menú hamburguesa
const aboutButtonEl = document.querySelector(".about__button"); //botón "about us"
const aboutContainerEl = document.querySelector(".about__container"); //contenedor del about us, donde irá el texto
const productsContainerEl = document.querySelector(".container-cards"); //acá es donde voy a renderizar mis productos.
const buttonSeeMoreEl = document.querySelector(".more"); //botón de see more, en la sección products
const buttonsContainerEl = document.querySelector(".container-buttons"); //contenedor de los botones de las categorias
const categoriesList = document.querySelectorAll(".category"); //categoría de producto
const shopEl = document.querySelector(".fa-shopping-cart"); //carrito de compras
const shopContainerEl = document.querySelector(".shop-container"); //container del carrito de compras

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//LOCALSTORAGE

//Traigo los mensajes del localStorage o creo array vacío si no hay mensajes:

const productsLS = JSON.parse(localStorage.getItem("products")) || [];

//Guardo los mensajes en localStorage:

const saveProductsToLocalStorage = () => {
  localStorage.setItem("products", JSON.stringify(productsLS));
};

//         FUNCIONES AUXILIARES DEL MENU HAMBURGUESA: SHOWMENU, CLOSENAVONSCROLL Y CLOSENAVBARMOBILE          //

//Para desplegar la navbar en la versión mobile:

const showMenu = () => {
  navListEl.classList.toggle("show-navbar");
  shopContainerEl.classList.remove("show-shop");
  if (navListEl.classList.contains("show-navbar")) {
    shopContainerEl.classList.add("shop-container");
  }
};

//Para que desaparezca el menú desplegado en mobile al scrollear:

const closeNavOnScroll = () => {
  if (!navListEl.classList.contains("show-navbar")) {
    return;
  }
  navListEl.classList.remove("show-navbar");
};

//Para que desaparezca la navbar de mobile cuando agrando la pantalla:

const closeNavbarMobile = () => {
  if (window.innerWidth > 768) {
    navListEl.classList.remove("show-navbar");
  }
};

//         FUNCION PRINCIPAL DEL MENU HAMBURGUESA: HAMBURGUERMENU (SE EJECUTA EN EL INIT)          //

const hamburguerMenu = () => {
  toggleEl.addEventListener("click", showMenu);
  window.addEventListener("scroll", closeNavOnScroll);
  window.addEventListener("resize", closeNavbarMobile);
};

//         FUNCIONES RELACIONADAS A LA SECCION ABOUT US          //

//Para que con about us al hacer click desaparezca el botón:

const hiddenButtonAboutAndShowText = () => {
  aboutButtonEl.classList.toggle("display-none");
  aboutContainerEl.innerHTML = `<p>
  We are a leading company in the manufacture of clothing for ballet dancers for more than 20 years. We focus on the comfort and quality of our garments, so that you can give your best version both in classes and on stage.</p> `;
  aboutContainerEl.classList.toggle("about-p");
};

//         FUNCIONES AUXILIARES DE LA SECCION PRODUCTS          //

//Se crea un producto por individual, para que luego se rendericen todos:

const createProduct = (product) => {
  const { id, name, price, productImg } = product;
  return `
  <div class="container-card">
    <h5>${name}</h5>
    <img src=${productImg} alt=${name}/>
    <div class="container-price">
      <p>Price:</p>
      <p>${price}</p>
    </div>
    <button
     data-id= '${id}'
     data-name= '${name}'
     data-price= '${price}'
     data-img= '${productImg}'>Add
    </button>
  </div> `;
};

//Renderizar lista de productos:

const renderProducts = (products) => {
  productsContainerEl.innerHTML += products.map(createProduct).join("");
};

const isLastIndexOf = () => {
  return state.index === state.limit - 1;
};

const showMoreProducts = () => {
  state.index += 1;
  let { products, index } = state;
  renderProducts(products[index]);
  if (isLastIndexOf()) {
    buttonSeeMoreEl.classList.add("display-none");
  }
};

const noFiltrerButton = (button) => {
  return (
    button.classList.contains("category") &&
    !button.classList.contains("active")
  );
};

//función para cambiar el estado de los botones de categorías
const changeButtonState = (chosenCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryButton) => {
    if (categoryButton.dataset.category !== chosenCategory) {
      categoryButton.classList.remove("active");
      return;
    }
    categoryButton.classList.add("active");
  });
};

//función para mostrar u ocultar el botón de "ver más" según corresponsa
const seeMoreOptions = () => {
  if (!state.activeFilter) {
    buttonSeeMoreEl.classList.remove("display-none");
    return;
  }
  buttonSeeMoreEl.classList.add("display-none");
};

const changeFilterState = (button) => {
  state.activeFilter = button.dataset.category;
  changeButtonState(state.activeFilter);
  seeMoreOptions();
};

//renderizar los productos filtrados
const renderProductsFiltered = () => {
  const filteredProducts = productsInfo.filter(
    (product) => product.category === state.activeFilter
  );
  renderProducts(filteredProducts);
};

const filterByCategories = ({ target }) => {
  if (!noFiltrerButton(target)) return;
  changeFilterState(target);
  //si vamos a mostrar cosas filtradas tengo que limpiar el div
  productsContainerEl.innerHTML = "";
  if (state.activeFilter) {
    renderProductsFiltered();
    state.index = 0;
    return;
  }
  renderProducts(state.products[0]);
};

const initProducts = () => {
  renderProducts(state.products[0]);
  buttonSeeMoreEl.addEventListener("click", showMoreProducts);
  buttonsContainerEl.addEventListener("click", filterByCategories);
};
/////////////////////////////////////////////////////////////////////////////

const toggleCart = () => {
  //cuando haga click en el carrito abra el menú del carrito y cierro la navbar
  //shopContainerEl.classList.remove("shopcart-container");
  shopContainerEl.classList.toggle("show-shop");
  navListEl.classList.remove("show-navbar"); //con esto cuando toco el carrito se cierra el navbar
  if (shopContainerEl.classList.contains("show-shop")) {
    shopContainerEl.classList.remove("shop-container");
  } else {
    shopContainerEl.classList.add("shop-container");
  }
};

const closeShopOnScroll = () => {
  if (!shopContainerEl.classList.contains("show-shop")) {
    return;
  }
  shopContainerEl.classList.remove("show-shop");
  shopContainerEl.classList.add("shop-container");
};

const init = () => {
  hamburguerMenu();
  aboutButtonEl.addEventListener("click", hiddenButtonAboutAndShowText);
  initProducts();
  initContact();
  shopEl.addEventListener("click", toggleCart);
  window.addEventListener("scroll", closeShopOnScroll);
};

init();
