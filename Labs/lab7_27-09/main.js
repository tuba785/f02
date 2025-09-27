let body = document.querySelector(".body");
let light = document.querySelector(".modes_light");
let dark = document.querySelector(".modes_dark");

light.style.display = "none";
dark.style.display = "inline";

dark.addEventListener("click", () => {
  light.style.display = "inline";
  dark.style.display = "none";
  body.style.backgroundColor = "black";
  body.style.color = "white";
});

light.addEventListener("click", () => {
  light.style.display = "none";
  dark.style.display = "inline";
  body.style.backgroundColor = "white";
  body.style.color = "black";
});
