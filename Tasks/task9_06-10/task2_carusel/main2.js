let photo1 = document.querySelector(".photo1");
let photo2 = document.querySelector(".photo2");
let photo3 = document.querySelector(".photo3");

let btnBefore = document.querySelector(".before");
let btnAfter = document.querySelector(".after");

let phArr = [
  "pics2/funny1.jpg",
  "pics2/funny2.jpg",
  "pics2/funny3.jpg",
  "pics2/funny4.jpg",
  "pics2/funny5.jpg",
  "pics2/funny6.jpg",
  "pics2/funny7.jpg",
  "pics2/funny8.jpg",
  "pics2/funny9.jpg",
];
let curr = 0;
let btn1 = document.querySelector(".btn1");
let btn2 = document.querySelector(".btn2");
let btn3 = document.querySelector(".btn3");

function updateImages() {
  photo1.setAttribute("src", phArr[curr]);
  photo2.setAttribute("src", phArr[curr + 1]);
  photo3.setAttribute("src", phArr[curr + 2]);
}

btnBefore.addEventListener("click", () => {
  curr = (curr - 3 + phArr.length) % phArr.length;
  updateImages();
});

btnAfter.addEventListener("click", () => {
  curr = (curr + 3) % phArr.length;
  updateImages();
});

btn1.addEventListener("click", () => {
  curr = 0;
  updateImages();
});

btn2.addEventListener("click", () => {
  curr = 3;
  updateImages();
});

btn3.addEventListener("click", () => {
  curr = 6;
  updateImages();
});