let photo = document.querySelector(".photo");
let btnBefore = document.querySelector(".before");
let btnAfter = document.querySelector(".after");
let phArr = [
  "pics/funny1.jpg",
  "pics/funny2.jpg",
  "pics/funny3.jpg",
  "pics/funny4.jpg",
];
let curr = 0;

function updateImage() {
  photo.src = images[curr];
}

btnBefore.addEventListener("click", () => {
  curr = (curr - 1 + phArr.length) % phArr.length;
  photo.setAttribute("src", phArr[curr]);
});

btnAfter.addEventListener("click", () => {
  curr = (curr + 1) % phArr.length;
  photo.setAttribute("src", phArr[curr]);
});