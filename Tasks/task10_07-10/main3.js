let txt1 = document.querySelector("#txt1");
let txt2 = document.querySelector("#txt2");
let txt3 = document.querySelector("#txt3");
let txt4 = document.querySelector("#txt4");
let box1 = document.querySelector("#acc1");
let box2 = document.querySelector("#acc2");
let box3 = document.querySelector("#acc3");
let box4 = document.querySelector("#acc4");
let arrow1 = document.querySelector("#arrow1");
let arrow2 = document.querySelector("#arrow2");
let arrow3 = document.querySelector("#arrow3");
let arrow4 = document.querySelector("#arrow4");

box1.addEventListener("click", () => {
  txt1.classList.toggle("show");
  arrow1.classList.toggle("rotate");
//   arrow1.src = txt1.classList.contains("show")
//     ? "pics3/up.svg"
//     : "pics3/down.svg";
});

box2.addEventListener("click", () => {
  txt2.classList.toggle("show");
  arrow2.classList.toggle("rotate");
});

box3.addEventListener("click", () => {
  txt3.classList.toggle("show");
  arrow3.classList.toggle("rotate");
});

box4.addEventListener("click", () => {
  txt4.classList.toggle("show");
  arrow4.classList.toggle("rotate");
});
