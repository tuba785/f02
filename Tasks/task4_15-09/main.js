// Task 1
console.log("Taks 1:");
function addToEnd(arr, num) {
  arr.push(num);
  return arr;
}
console.log(addToEnd([1, 2, 3], 4));
console.log("");

// Task 2
console.log("Taks 2:");
function addToStart(arr, num) {
  arr.unshift(num);
  return arr;
}
console.log(addToStart([2, 3], 1));
console.log("");

// Task 3
console.log("Taks 3:");
function removeLastElement(arr) {
  arr.pop();
  return arr;
}
console.log(removeLastElement([1, 2, 3]));
console.log("");

// Task 4
console.log("Taks 4:");
function removeFirstElement(arr) {
  arr.shift();
  return arr;
}
console.log(removeFirstElement([1, 2, 3]));
console.log("");

// Task 5
console.log("Taks 5:");
function getMiddleElements(arr, start, end) {
  return arr.slice(start, end);
}
console.log(getMiddleElements([1, 2, 3, 4, 5], 1, 4));
console.log("");

// Task 6
console.log("Taks 6:");
function containsNumber(arr, num) {
  return arr.includes(num);
}
console.log(containsNumber([1, 2, 3], 2));
console.log("");

// Task 7
console.log("Taks 7:");
function findIndex(arr, num) {
  return arr.indexOf(num);
}
console.log(findIndex([1, 2, 3], 3));
console.log("");

// Task 8
console.log("Taks 8:");
function countOccurrences(arr, num) {
  return arr.filter((el) => el === num).length;
}
console.log(countOccurrences([1, 2, 2, 3, 2], 2));

// Task 9
console.log("Taks 9:");
function mergeArrays(arr1, arr2) {
  return arr1.concat(arr2);
}
console.log(mergeArrays([1, 2], [3, 4]));
console.log("");

// Task 10
console.log("Taks 10:");
function joinWithDash(arr) {
  return arr.join("-");
}
console.log(joinWithDash(["a", "b", "c"]));
console.log("");

// Task 11
console.log("Taks 11:");
function reverseArray(arr) {
  return arr.reverse();
}
console.log(reverseArray([1, 2, 3]));
console.log("");

// Task 12
console.log("Taks 12:");
function doubleElements(arr) {
  return arr.map((el) => el * 2);
}
console.log(doubleElements([1, 2, 3]));
console.log("");

// Task 13
console.log("Taks 13:");
function getEvenNumbers(arr) {
  return arr.filter((el) => el % 2 === 0);
}
console.log(getEvenNumbers([1, 2, 3, 4]));
console.log("");

// Task 14
console.log("Taks 14:");
let user14 = { name: "Ali", age: 20 };
function updateUserAge(userObj, newAge) {
  userObj.age = newAge;
  return userObj;
}
console.log(updateUserAge(user14, 25));
console.log("");

// Task 15
console.log("Taks 15:");
let user15 = { name: "Aysel" };
function addUserEmail(userObj, email) {
  userObj.email = email;
  return userObj;
}
console.log(addUserEmail(user15, "aysel@mail.com"));
console.log("");

// Var1 func a {return b;}; console.log(func());
// Var2 func a {console.log(b)}; func();