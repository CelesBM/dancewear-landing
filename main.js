const navListEl = document.querySelector(".navbar__list"); //contiene los links de products, about y contact
const toggleEl = document.querySelector(".navbar__toggle"); //capturo el menú hamburguesa
const aboutButtonEl = document.querySelector(".about__button"); //botón "about us"
const aboutContainerEl = document.querySelector(".about__container"); //contenedor del about us, donde irá el texto
const productsContainerEl = document.querySelector(".container-cards"); //acá es donde voy a renderizar mis productos
const buttonSeeMoreEl = document.querySelector(".more"); //botón de see more, en la sección products
const buttonsContainerEl = document.querySelector(".container-buttons"); //contenedor de los botones de las categorias
const categoriesList = document.querySelectorAll(".category"); //categoría de producto
const shopEl = document.querySelector(".fa-shopping-cart"); //carrito de compras
const shopContainerEl = document.querySelector(".shop-container"); //container del carrito de compras
console.log(shopContainerEl);
const shopAddEl = document.querySelector(".shop-add"); //contenedor de los productos que agrego al carrito
const totalEl = document.querySelector(".total"); // acá capturo el total de lo que suma los precios del carrito
const buyEl = document.querySelector(".buy"); //botón comprar
const deleteEl = document.querySelector(".delete"); //botón para vaciar carrito
const shopQuantityEl = document.querySelector(".shop-quantity"); //cantidad de unidades añadidas al carrito

//Traigo los productos del localStorage o creo array vacío si no hay productos:

let productLS = JSON.parse(localStorage.getItem("products")) || [];

//Guardo los productos en localStorage:

const saveProductsToLocalStorage = () => {
  localStorage.setItem("products", JSON.stringify(productLS));
};

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

//Función principal del menú hamburguesa:

const hamburguerMenu = () => {
  toggleEl.addEventListener("click", showMenu);
  window.addEventListener("scroll", closeNavOnScroll);
  window.addEventListener("resize", closeNavbarMobile);
};

//Para que con about us al hacer click desaparezca el botón:

const hiddenButtonAboutAndShowText = () => {
  aboutButtonEl.classList.toggle("display-none");
  aboutContainerEl.innerHTML = `<p>
  We are a leading company in the manufacture of clothing for ballet dancers for more than 20 years. We focus on the comfort and quality of our garments, so that you can give your best version both in classes and on stage.</p> `;
  aboutContainerEl.classList.toggle("about-p");
};

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
    <button class="button-add"
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

//Ver más productos al tocar "see more":

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

//Cambiar el estado de los botones de categorías:

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

//Mostrar u ocultar botón "see more":

const seeMoreOptions = () => {
  if (!state.activeFilter) {
    buttonSeeMoreEl.classList.remove("display-none");
    return;
  }
  buttonSeeMoreEl.classList.add("display-none");
};

//Activar un botón al tocar la categoría:

const changeFilterState = (button) => {
  state.activeFilter = button.dataset.category;
  changeButtonState(state.activeFilter);
  seeMoreOptions();
};

//Renderizar los productos filtrados:

const renderProductsFiltered = () => {
  const filteredProducts = productsInfo.filter(
    (product) => product.category === state.activeFilter
  );
  renderProducts(filteredProducts);
};

//Filtrar por categorías:

const filterByCategories = ({ target }) => {
  if (!noFiltrerButton(target)) return;
  changeFilterState(target);
  productsContainerEl.innerHTML = "";
  if (state.activeFilter) {
    renderProductsFiltered();
    state.index = 0;
    return;
  }
  renderProducts(state.products[0]);
};

//Función init de los productos:

const initProducts = () => {
  renderProducts(state.products[0]);
  buttonSeeMoreEl.addEventListener("click", showMoreProducts);
  buttonsContainerEl.addEventListener("click", filterByCategories);
};

//Para abrir carrito y cerrar navbar:

const toggleCart = () => {
  shopContainerEl.classList.toggle("show-shop");
  navListEl.classList.remove("show-navbar"); //con esto cuando toco el carrito se cierra el navbar
  if (shopContainerEl.classList.contains("show-shop")) {
    shopContainerEl.classList.remove("shop-container");
  } else {
    shopContainerEl.classList.add("shop-container");
  }
};

//Cerrar el carrito de compras al hacer scroll:

const closeShopOnScroll = () => {
  //así estaba antes:
  //if (!shopContainerEl.classList.contains("show-shop")) {
  //  return;
  //}
  //shopContainerEl.classList.remove("show-shop");
  //shopContainerEl.classList.add("shop-container");

  //probando arreglar el error:
  if (!shopContainerEl.classList.contains("show-shop")) {
    return;
  }
  // Agregar un manejador de eventos para evitar el cierre cuando el mouse está sobre el elemento
  shopContainerEl.addEventListener("mouseenter", () => {
    // No hagas nada cuando el mouse entra en el elemento
  });

  shopContainerEl.addEventListener("mouseleave", () => {
    // Cuando el mouse sale del elemento, cierra el contenedor
    shopContainerEl.classList.remove("show-shop");
    shopContainerEl.classList.add("shop-container");
  });
};

//PROBANDO ERROR DEL TP

const noCloseOnScroll = () => {
  shopContainerEl.classList.add("show-shop");
};

//Se crea un producto por individual para el carrito, para que luego se rendericen todos:

const createShopProduct = (product) => {
  const { id, name, price, img, quantity } = product;
  console.log(product);
  return `
  <div class="shopcard-container">
    <div class="shopcard-principal">
       <h5>${name}</h5>
       <img src=${img} alt=${name}/>
    </div>
    <div class="shopcard-total">
        <div class="shopcard-price">
          <p class="p-price">Price:</p>
          <p>$ ${price}</p>
        </div>
        <div class="shopcard-quantity">
          <span class="quantity-handler down" data-id=${id}>-</span>
          <span class="item-quantity">${quantity}</span>
          <span class="quantity-handler up" data-id=${id}>+</span>
        </div>
    </div>
  </div> `;
};

//Si no hay productos en el carrito, debe decir que "está vacío":

const renderShop = () => {
  if (!productLS.length) {
    shopAddEl.innerHTML = `<p class="empty-cart">The cart is empty</p>`;
    return;
  }
  shopAddEl.innerHTML = productLS.map(createShopProduct).join("");
};

//Tener el total de lo agregado al carrito:

const shopTotal = () => {
  totalEl.innerHTML = `$ ${showTotal()}`;
};

//Ver el total de lo agregado al carrito:

const showTotal = () => {
  return productLS.reduce(
    (acc, cur) => acc + Number(cur.price) * cur.quantity,
    0
  );
};

//Desestructuro el producto del carrito:

const destructureProduct = (product) => {
  const { id, name, price, img } = product;
  return { id, name, price, img };
};

//Saber si ya está el producto agregado al carrito:

const existShopProduct = (product) => {
  return productLS.find((item) => item.id === product.id);
};

//Agego una unidad más al producto ya agregado al carrito:

const addExistShopProduct = (product) => {
  productLS = productLS.map((shopProduct) =>
    shopProduct.id === product.id
      ? { ...shopProduct, quantity: shopProduct.quantity + 1 }
      : shopProduct
  );
};

//Creo un objeto con la información del producto a agregar:

const createShopObjectProduct = (product) => {
  productLS = [...productLS, { ...product, quantity: 1 }];
};

//Habilitar o deshabilitar la opcion de "buy" o "empty cart":

const shopButton = (button) => {
  if (!productLS.length) {
    button.classList.add("disabled");
  } else {
    button.classList.remove("disabled");
  }
};

//Sumar unidades al logo del carrito:

const shopQuantity = () => {
  shopQuantityEl.textContent = productLS.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);
};

//Eliminar un producto del carrito:

const removeShopProduct = (existingProduct) => {
  productLS = productLS.filter((product) => product.id !== existingProduct.id);
  updateShopState();
};

//Restar una unidad al producto del carrito:

const decreaseShopProduct = (existingProduct) => {
  productLS = productLS.map((product) => {
    return product.id === existingProduct.id
      ? { ...product, quantity: Number(product.quantity) - 1 }
      : product;
  });
};

//Disminuir una unidad del producto dentro del carrito:

const handleQuantitydecrease = (id) => {
  const existingProduct = productLS.find((item) => item.id === id);
  // Si se toco en un item con uno solo de cantidad
  if (existingProduct.quantity === 1) {
    removeShopProduct(existingProduct);

    return;
  }
  decreaseShopProduct(existingProduct);
};

//Aumentar una unidad del producto dentro del carrito:

const handleQuantityincrease = (id) => {
  const existingProduct = productLS.find((item) => item.id === id);
  addExistShopProduct(existingProduct);
};

//Manejar cantidades de productos dentro del carrito:

const handleQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    handleQuantitydecrease(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    handleQuantityincrease(e.target.dataset.id);
  }
  updateShopState();
};

//Actualizo el carrito:

const updateShopState = () => {
  saveProductsToLocalStorage();
  renderShop();
  shopTotal();
  shopButton(buyEl);
  shopButton(deleteEl);
  shopQuantity();
};

//Agregar al carrito:

const addProduct = (e) => {
  if (!e.target.classList.contains("button-add")) {
    return;
  }

  const product = destructureProduct(e.target.dataset);

  if (existShopProduct(product)) {
    addExistShopProduct(product);
    alert("Product added successfully!");
  } else {
    createShopObjectProduct(product);
    alert("Product added successfully!");
  }
  updateShopState();
};

//Compra satisfactoria:

const successBuy = () => {
  if (!productLS.length) return;
  if (productLS.length) {
    alert("Your order was successfully completed!");
  }
};

//Eliminar el carrito:

const resetShop = () => {
  productLS = [];
  updateShopState;
};

//Vaciar el carrito:

const deleteShop = () => {
  if (!productLS.length) return;
  if (productLS.length) {
    resetShop();
    alert("Your cart has been emptied.");
  }
};

//FUNCION PRINCIPAL

const init = () => {
  hamburguerMenu();
  aboutButtonEl.addEventListener("click", hiddenButtonAboutAndShowText);
  initProducts();
  initContact();
  shopEl.addEventListener("click", toggleCart);
  window.addEventListener("scroll", closeShopOnScroll);
  document.addEventListener("DOMContentLoaded", renderShop);
  document.addEventListener("DOMContentLoaded", showTotal);
  shopButton(buyEl);
  shopButton(deleteEl);
  shopQuantity(productLS);
  productsContainerEl.addEventListener("click", addProduct);
  shopContainerEl.addEventListener("click", handleQuantity);
  buyEl.addEventListener("click", successBuy);
  deleteEl.addEventListener("click", deleteShop);
};

init();
