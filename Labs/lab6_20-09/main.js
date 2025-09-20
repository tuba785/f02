// Better to (num) AsAu instead of num in methods

// Task 1
console.log("Taks 1:");
let task1 = [1, 2, 3, 4];
function timesTwo(arr) {
    return arr.map(num => num * 2);
}
console.log(timesTwo(task1));
console.log("");

// Task 2
console.log("Taks 2:");
let task2 = [1, 2, 3, 4, 5, 6];
function evenNum(arr) {
    return arr.filter(num => num % 2 === 0);
}
console.log(evenNum(task2));
console.log("");

// Task 3
console.log("Taks 3:");
let task3 = [1, 3, -2, 5];
function negativeNum(arr) {
    return arr.some(num => num < 0);
}
console.log(negativeNum(task3));
console.log("");

// Task 4
console.log("Taks 4:");
let task4 = [2, 4, 6];
function allPositive(arr) {
    return arr.every(num => num > 0);
}
console.log(allPositive(task4));
console.log("");

// Task 5
console.log("Taks 5:");
let task5 = [3, 7, 15, 20];
function firstBigNum(arr) {
    return arr.find(num => num > 10);
}
console.log(firstBigNum(task5));
console.log("");

// Task 6
console.log("Taks 6:");
let task6 = ["js", "html", "css"];
function containsWord(arr, word) {
    return arr.includes(word.toLowerCase());
}
console.log(containsWord(task6, "html"));
console.log("");

// Task 7
console.log("Taks 7:");
let task7 = [1, 2, 3, 4];
function reverseArr(arr) {
    return arr.reverse();
}
console.log(reverseArr(task7));
console.log("");

// Task 8
console.log("Taks 8:");
let task8 = [5, 1, 8, 3];
function sortToHigh(arr) {
    return arr.sort((a, b) => a - b);
}
console.log(sortToHigh(task8));
console.log("");

// Task 9
console.log("Taks 9:");
let task9 = ["js", "html"];
function toUpperCaseArray(arr) {
    return arr.map(word => word.toUpperCase());
}
console.log(toUpperCaseArray(task9));
console.log("");

// Task 10
console.log("Taks 10:");
let task10 = ["apple", "banana", "js"];
function onlyLongWords(arr, wordLength) {
    return arr.filter(word => word.length >= wordLength);
}
console.log(onlyLongWords(task10, 5));
console.log("");

// Task 11
console.log("Taks 11:");
let task11 = ["Python", "JavaScript", "C++"];
function containsWord2(arr, word) {
    return arr.includes(word);
}
console.log(containsWord2(task11, "JavaScript"));
console.log("");

// Task 12
console.log("Taks 12:");
let task12 = ["hello", "world", 7];
function letterChecker(arr) {
    return arr.every((word) => typeof word === "string");
}
console.log(letterChecker(task12));
console.log("");

// Task 13
console.log("Taks 13:");
let task13 = [2, 4, 7, 8];
function firstOdd(arr) {
    return arr.find(num => num % 2 !==0);
}
console.log(firstOdd(task13));
console.log("");

// Task 14
console.log("Taks 14:");
let task14 = [1, 2, 3];
function convertFromNumToStr(arr) {
    return arr.map(num => num.toString());
}
console.log(convertFromNumToStr(task14));
console.log("");

// Task 15
console.log("Taks 15:");
let task15 = [1, null, 2, undefined, 3];
function removeAllNullUndef(arr) {
    return arr.filter(item => item !== null && item !== undefined);
}
console.log(removeAllNullUndef(task15));
console.log("");

// Task 16
console.log("Taks 16:");
let task16 = [{name: "Amil", age: 17},{name: "Ramil", age: 20},{name: "Aysel", age: 25}];
function removeAdults(arr) {
    return arr.filter(person => person.age > 18).map(person => person.name);
}
console.log(removeAdults(task16));
console.log("");

// Task 17
console.log("Taks 17:");
let task17 = [10, 3, 45, 6, 22, 100];
function findTopNums(arr, howMuch) {
    return arr.sort((a, b) => b - a).slice(0, howMuch);
}
console.log(findTopNums(task17, 3));
console.log("");

// Task 18
console.log("Taks 18:");
let task18 = ["apple", "hi", "banana"];
function bigWordsAndUpperCase(arr, wordLength) {
    return arr.map(word => word.toUpperCase()).filter(word => word.length >= wordLength);
}
console.log(bigWordsAndUpperCase(task18, 5));
console.log("");

// Task 19
console.log("Taks 19:");
let task19 = [5, 2, 8, 1, 4];
function sortAndEven(arr) {
    return arr.filter(num => num % 2 === 0).sort((a, b) => a - b);
}
console.log(sortAndEven(task19));
console.log("");

// Task 20
console.log("Taks 20:");
const task20 = [{name: "A", active: true}, {name: "B", active: false}, {name: "C", active: true}];
function getActiveNames(arr) {
    return arr.filter(item => item.active === true).map(item => item.name);
}
console.log(getActiveNames(task20));
console.log("");