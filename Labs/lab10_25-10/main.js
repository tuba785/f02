const products = document.querySelector(".products");
const btnAll = document.querySelector("#btnAll");
const btnEl = document.querySelector("#btnEl");
const btnJew = document.querySelector("#btnJew");
const btnMen = document.querySelector("#btnMen");
const btnWomen = document.querySelector("#btnWomen");
const searchInput = document.querySelector("#searchInput");
let allProductsData = [];

function showProducts(data) {
  products.innerHTML = "";
  data.map((item) => {
    products.innerHTML += `
      <div class="card">
        <img src="${item.image}" alt="Product" />
        <h3>${item.title}</h3>
        <p class="price">$${item.price}</p>
      </div>`;
  });
}

const fDataAll = async () => {
  products.innerHTML = "";
  await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      allProductsData = data;
      //   showProducts(data);
      applySearchProducts();
    })
    .catch((err) => console.log(err));
};

const fDataByCategory = async (categoryName) => {
  products.innerHTML = "";
  await fetch(`https://fakestoreapi.com/products/category/${categoryName}`)
    .then((res) => res.json())
    .then((data) => {
      allProductsData = data;
      //   showProducts(data);
      applySearchProducts();
    })
    .catch((err) => console.log(err));
};

// function searchProducts() {
//   const value = searchInput.value.toLowerCase();
//   const filtered = allProductsData.filter((item) =>
//     item.title.toLowerCase().includes(value)
//   );
//   showProducts(filtered);
// }

function applySearchProducts() {
  const value = searchInput.value.trim().toLowerCase();
  if (value === "") {
    showProducts(allProductsData);
  } else {
    const filtered = allProductsData.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    showProducts(filtered);
  }
}

btnAll.addEventListener("click", fDataAll);
btnEl.addEventListener("click", () => fDataByCategory("electronics"));
btnJew.addEventListener("click", () => fDataByCategory("jewelery"));
btnMen.addEventListener("click", () => fDataByCategory("men's clothing"));
btnWomen.addEventListener("click", () => fDataByCategory("women's clothing"));
// searchInput.addEventListener("input", searchProducts);
searchInput.addEventListener("input", applySearchProducts);
fDataAll();
