// Task 1
console.log("Taks 1:");
let task1 = [1, 2, 3, 4, 5];
function getElementByIndex(arr, index) {
    return arr[index];
}
console.log(getElementByIndex(task1, 3));
console.log("");

// Task 2
console.log("Taks 2:");
let task2 = [1, 2, 3, 4, 5, 6];
function removeFromArr(arr, num) {
  return arr.slice(num);
}
console.log(removeFromArr(task2, 3));
console.log("");


// Task 3
console.log("Taks 3:");
let task3 = [1, 2, 3];
function removeElement(arr, el) {
  return arr.filter(element => element !== el);
}
console.log(removeElement(task3, 2));
console.log("");

// Task 4
console.log("Taks 4:");
let task4 = [1, -2, 2, -4];
function getNegativeNumbers(arr) {
  return arr.filter(num => num < 0);
}
console.log(getNegativeNumbers(task4));
console.log("");

// Task 5
console.log("Taks 5:");
let task5 = [10, 100, 40];
function getAvg(arr) {
  sum = arr.reduce((acc, num) => acc + num, 0);
  return sum / arr.length;
}
console.log(getAvg(task5));
console.log("");