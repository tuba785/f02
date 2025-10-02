const showButton = document.getElementById("showButton");
const overlay = document.getElementById("overlay");

let show = document.querySelector(".reg");
let formWin = document.querySelector(".formWin");
let nameInput = document.querySelector("#input_name");
let btnYes = document.querySelector(".buttonYes");
let btnNo = document.querySelector(".buttonNo");
let btnClose = document.querySelector(".buttonClose");

show.addEventListener("click", () => {
  formWin.style.display = "flex";
});
btnNo.addEventListener("click", () => {
  formWin.style.display = "none";
});
btnClose.addEventListener("click", () => {
  formWin.style.display = "none";
});

btnYes.addEventListener("click", () => {
  let name = String(nameInput.value.trim());
  if (name) {
    alert("Your Name is : " + name);
  } else {
    alert("Please enter your name!");
  }
});
