// Task 1
let colorbox = document.querySelector(".colorbox");
let buttonRed = document.querySelector(".button_color_red");
let buttonGreen = document.querySelector(".button_color_green");
let buttonBlue = document.querySelector(".button_color_blue");
buttonRed.addEventListener("click", () => {
  colorbox.style.backgroundColor = "red";
  colorbox.innerHTML = "red";
});
buttonGreen.addEventListener("click", () => {
  colorbox.style.backgroundColor = "green";
  colorbox.innerHTML = "green";
});
buttonBlue.addEventListener("click", () => {
  colorbox.style.backgroundColor = "blue";
  colorbox.innerHTML = "blue";
});

// Task 2
let textbox = document.querySelector(".textbox");
let buttonHideShow = document.querySelector(".button_hideandshow");
// Saving text inside with textContent
let savedText = textbox.textContent;
let canSeeText = true;
buttonHideShow.addEventListener("click", () => {
  if (canSeeText) {
    textbox.innerHTML = "";
    buttonHideShow.innerHTML = "Show";
  } else {
    textbox.innerHTML = savedText;
    buttonHideShow.innerHTML = "Hide";
  }

  canSeeText = !canSeeText;
});

// Task 3
let balloonbox = document.querySelector(".balloonbox");
let buttonInflate = document.querySelector(".button_balloon");
let balloonSize = 20;
buttonInflate.addEventListener("click", () => {
  if (balloonSize < 150) {
    balloonSize += 5;
    balloonbox.style.fontSize = balloonSize + "px";
  }
});

// Task 4
let numberbox = document.querySelector(".numberbox");
let plus = document.querySelector(".button_plus");
let minus = document.querySelector(".button_minus");
let numberInBox = Number(numberbox.textContent);
plus.addEventListener("click", () => {
  numberInBox += 1;
  numberbox.innerHTML = numberInBox;
});
minus.addEventListener("click", () => {
  numberInBox -= 1;
  numberbox.innerHTML = numberInBox;
});

// Task 5
let square = document.querySelector(".square");
let buttonLeft = document.querySelector(".button_left");
let buttonRight = document.querySelector(".button_right");
let marginLeftSquare = 0;
let marginRightSquare = 0;
// Left and right margins divide the area in half
buttonLeft.addEventListener("click", () => {
  if (marginLeftSquare > -700 && marginLeftSquare + marginRightSquare > -700 && marginLeftSquare + marginRightSquare < 700) {
    marginLeftSquare -= 50;
    marginRightSquare += 50;
    square.style.marginLeft = marginLeftSquare + "px";
    square.style.marginRight = marginRightSquare + "px";
  }
});
buttonRight.addEventListener("click", () => {
  if (marginRightSquare > -700) {
    marginRightSquare -= 50;
    marginLeftSquare += 50;
    square.style.marginLeft = marginLeftSquare + "px";
    square.style.marginRight = marginRightSquare + "px";
  }
});
