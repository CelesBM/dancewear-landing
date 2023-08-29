const productsInfo = [
  {
    id: 1,
    name: "Leotard Tokyo",
    price: 4000,
    category: "leotards",
    productImg:
      "https://www.cocodancewear.com/uploads/1/2/6/8/126849458/s844278926702445406_p3238_i1_w800.jpeg",
  },
  {
    id: 2,
    name: "Leotard Rie",
    price: 5300,
    category: "leotards",
    productImg:
      "https://i.pinimg.com/170x/bb/3e/fd/bb3efd79f2c21d25d712a110642e51c8.jpg",
  },
  {
    id: 3,
    name: "Leotard Margot",
    price: 4920,
    category: "leotards",
    productImg:
      "https://i.pinimg.com/170x/7e/d0/a7/7ed0a786a2aa7df319edda8fa5634181.jpg",
  },
  {
    id: 4,
    name: "Skirt Sonyc",
    price: 2080,
    category: "skirts",
    productImg:
      "https://images-na.ssl-images-amazon.com/images/I/51WNajuncUL._AC_UX679_.jpg",
  },
  {
    id: 5,
    name: "Skirt Malibu",
    price: 2610,
    category: "skirts",
    productImg:
      "https://m.media-amazon.com/images/I/51bIRSYvbML._AC_SL1301_.jpg",
  },
  {
    id: 6,
    name: "Unisex convertible pink",
    price: 1050,
    category: "stocking",
    productImg:
      "https://www.balletandyou.com/788-large_default/medias-de-ballet-rosa-sin-pie.jpg",
  },
  {
    id: 7,
    name: "Split sole canvas shoes",
    price: 2100,
    category: "canvas-shoes",
    productImg: "https://sodancalatina.com/wp-content/uploads/2020/10/F-43.jpg",
  },
  {
    id: 8,
    name: "Pointe shoes",
    price: 8000,
    category: "pointes-shoes",
    productImg:
      "https://mundance.com/blog/wp-content/uploads/2016/02/punta-ballet-tmt-31l-bloch.jpg",
  },
];

//Dividir los productos, para que no los muestre todos al cargar la página y que puedan tocar "ver mas":

const divideProducts = (number) => {
  let productsArray = [];
  for (let i = 0; i < productsInfo.length; i += number)
    productsArray.push(productsInfo.slice(i, i + number));
  return productsArray;
};

const state = {
  products: divideProducts(3),
  index: 0,
  limit: divideProducts(3).length,
  activeFilter: null,
};
