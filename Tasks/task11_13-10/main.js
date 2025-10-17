let items = [
  { id: 1, name: "Wireless Mouse", price: 25.99 },
  { id: 2, name: "Mechanical Keyboard", price: 89.99 },
  { id: 3, name: "Gaming Monitor", price: 299.99 },
  { id: 4, name: "Smartwatch", price: 150.0 },
  { id: 5, name: "Phone Case", price: 12.49 },
  { id: 6, name: "Graphic Tablet", price: 95.0 },
  { id: 7, name: "Router", price: 59.99 },
  { id: 8, name: "Microphone", price: 70.0 },
  { id: 9, name: "Gaming Chair", price: 199.99 },
  { id: 10, name: "Printer", price: 85.5 },
];

let likedItems = [];
let mainContainer = document.querySelector(".main");
let likedContainer = document.querySelector(".liked");

function createCard(item) {
  let itemDiv = document.createElement("div");
  itemDiv.classList.add("main_item");

  let img = document.createElement("img");
  img.classList.add("main_item_photo");
  img.src = `pics/img${item.id}.jpg`;
  img.alt = item.name;

  let infoDiv = document.createElement("div");
  infoDiv.classList.add("main_item_info");

  let idP = document.createElement("p");
  idP.classList.add("main_item_info_id");
  idP.textContent = `ID: ${item.id}`;

  let nameP = document.createElement("p");
  nameP.classList.add("main_item_info_name");
  nameP.textContent = `Name: ${item.name}`;

  let priceP = document.createElement("p");
  priceP.classList.add("main_item_info_price");
  priceP.textContent = `Price: $${item.price}`;

  infoDiv.appendChild(idP);
  infoDiv.appendChild(nameP);
  infoDiv.appendChild(priceP);
  itemDiv.appendChild(img);
  itemDiv.appendChild(infoDiv);

  let favBtn = document.createElement("img");
  favBtn.classList.add("main_item_button");
  favBtn.src = likedItems.includes(item.id) ? "pics/fav.svg" : "pics/nofav.svg";
  favBtn.alt = "Like";

  favBtn.addEventListener("click", () => {
    let isLiked = likedItems.includes(item.id);

    if (!isLiked) {
      likedItems.push(item.id);
    } else {
      likedItems = likedItems.filter((id) => id !== item.id);
    }

    renderMainItems();
    renderLikedItems();
    console.log("Liked Items:", likedItems);
  });

  itemDiv.appendChild(favBtn);

  return itemDiv;
}

// Left side
function renderMainItems() {
  mainContainer.innerHTML = "";
  items.forEach((item) => {
    const card = createCard(item);
    mainContainer.appendChild(card);
  });
}

// Right side
function renderLikedItems() {
  likedContainer.innerHTML = "";
  likedItems.forEach((id) => {
    const item = items.find((el) => el.id === id);
    if (item) {
      const card = createCard(item);
      likedContainer.appendChild(card);
    }
  });
}

renderMainItems();
renderLikedItems();


// First Version
// let items = [
//   { id: 1, name: "Wireless Mouse", price: 25.99 },
//   { id: 2, name: "Mechanical Keyboard", price: 89.99 },
//   { id: 3, name: "Gaming Monitor", price: 299.99 },
//   { id: 4, name: "Smartwatch", price: 150.0 },
//   { id: 5, name: "Phone Case", price: 12.49 },
//   { id: 6, name: "Graphic Tablet", price: 95.0 },
//   { id: 7, name: "Router", price: 59.99 },
//   { id: 8, name: "Microphone", price: 70.0 },
//   { id: 9, name: "Gaming Chair", price: 199.99 },
//   { id: 10, name: "Printer", price: 85.5 },
// ];
// let likedItems = [];
// let mainContainer = document.querySelector(".main");
// let likedContainer = document.querySelector(".liked");

// for (let i = 0; i < items.length; i++) {
//   let item = items[i];

//   let itemDiv = document.createElement("div");
//   itemDiv.classList.add("main_item");

//   let img = document.createElement("img");
//   img.classList.add("main_item_photo");
//   img.src = "";
//   img.alt = item.name;

//   let infoDiv = document.createElement("div");
//   infoDiv.classList.add("main_item_info");

//   let idP = document.createElement("p");
//   idP.classList.add("main_item_info_id");
//   idP.textContent = `ID: ${item.id}`;

//   let nameP = document.createElement("p");
//   nameP.classList.add("main_item_info_name");
//   nameP.textContent = `Name: ${item.name}`;

//   let priceP = document.createElement("p");
//   priceP.classList.add("main_item_info_price");
//   priceP.textContent = `Price: $${item.price}`;

//   let favBtn = document.createElement("img");
//   favBtn.classList.add("main_item_button");
//   favBtn.src = "pics/nofav.svg";
//   favBtn.alt = "Like";

//   favBtn.addEventListener("click", () => {
//     let isLiked = likedItems.includes(item.id);

//     if (isLiked === false) {
//       likedItems.push(item.id);
//       favBtn.src = "pics/fav.svg";
//     } else {
//       likedItems = likedItems.filter((id) => id !== item.id);
//       favBtn.src = "pics/nofav.svg";
//     }

//     console.log("Liked Items:", likedItems);
//   });

//   infoDiv.appendChild(idP);
//   infoDiv.appendChild(nameP);
//   infoDiv.appendChild(priceP);

//   itemDiv.appendChild(img);
//   itemDiv.appendChild(infoDiv);
//   itemDiv.appendChild(favBtn);

//   mainContainer.appendChild(itemDiv);
// }