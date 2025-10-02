let btnMenu = document.querySelector(".menu_icon");
let btnClose = document.querySelector(".close_img");
let menu = document.querySelector(".menu_box");

btnMenu.addEventListener("click", () => {
  menu.classList.add("class_hide");
});

btnClose.addEventListener("click", () => {
  menu.classList.remove("class_hide");
});
