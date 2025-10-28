let redLight = document.getElementById("red");
let yellowLight = document.getElementById("yellow");
let greenLight = document.getElementById("green");

function turnOn(light) {
  light.style.opacity = 1;
}
function turnOff(light) {
  light.style.opacity = 0.2;
}

function changeLight() {
  turnOn(redLight);
  turnOff(yellowLight);
  turnOff(greenLight);
  setTimeout(() => {
    turnOff(redLight);
    turnOn(yellowLight);
    setTimeout(() => {
      turnOff(yellowLight);
      turnOn(greenLight);
      setTimeout(() => {
        turnOff(greenLight);
        changeLight();
      }, 3000);
    }, 1000);
  }, 3000);
}

changeLight();
