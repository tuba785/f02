// Task 1.1
console.log("Taks 1.1:");
let numString = "42";
let boolString = "true";
let mixedArray = ["123", "456", "789"];
let nullValue = null;
function typeConversion() {
  let num = Number(numString);
  console.log("numString -> number:", num);

  let bool = boolString === "true";
  console.log("boolString -> boolean:", bool);

  let convertedArray = mixedArray.map((item) => Number(item));
  console.log("mixedArray -> number:", convertedArray);

  let nullToBool = Boolean(nullValue);
  console.log("nullValue -> boolean:", nullToBool);
}
typeConversion();
console.log("");

// Task 1.2
console.log("Taks 1.2:");
let sample1 = NaN;
let sample2 = [1, 2, 3];
let sample3 = "";
let sample4 = 0;
let sample5 = { name: "John" };
function checkDataTypes() {
  console.log("sample1 (NaN):", typeof sample1);
  console.log("sample2 (array):", typeof sample2);
  console.log("sample3 (''):", typeof sample3);
  console.log("sample4 (0):", typeof sample4);
  console.log("sample5 (object):", typeof sample5);

  console.log("sample2 (array) instanceof Array:", sample2 instanceof Array);
  console.log("sample5 (object) instanceof Object:", sample5 instanceof Object);

  console.log("sample2 (array) isArray:", Array.isArray(sample2));
}
checkDataTypes();
console.log("");

// Task 2.1
console.log("Taks 2.1:");
let task1 = " JavaScript is awesome ";
function changeText(str) {
  console.log(str.trim());
  console.log(str.toUpperCase());
  console.log(str.replace("is", "was"));
  console.log(str.split(" "));
  console.log(str.length);
}
changeText(task1);
console.log("");

// Task 2.2
console.log("Taks 2.2:");
let user = {
  firstName: "Ali",
  lastName: "Mammadov",
  age: 25,
  email: "ali@example.com",
};
function userİnfo(user) {
  console.log(
    "Hörmətli " +
      user.firstName +
      " " +
      user.lastName +
      ", sizin " +
      user.age +
      " yaşınız var."
  );

  console.log("First Name:", user.firstName);
  console.log("Last Name:", user.lastName);
  console.log("Age:", user.age);
  console.log("Email:", user.email);

  let newEmail = user.email.replace("@", " ");
  console.log("New Email:", newEmail);
}
userİnfo(user);
console.log("");

// Task 3.1
console.log("Taks 3.1:");
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let fruits = ["apple", "pear", "banana", "cherry", "grape"];
function arrayOperations(num, str) {
  const evenNumbers = num.filter((num) => num % 2 === 0);
  console.log(evenNumbers);

  const cubes = numbers.map((num) => num ** 3);
  console.log(cubes);

  const sum = numbers.reduce((acc, num) => acc + num, 0);
  console.log(sum);

  const sorted = fruits.sort();
  console.log(sorted);

  // fruits.push("orange");
  // fruits.pop();
  // fruits.unshift("pineapple");
  // fruits.shift();
}
arrayOperations(numbers, fruits);
console.log("");

// Task 3.2
console.log("Taks 3.2:");
let students = [
  { id: 1, name: "Aygün", grades: [85, 90, 92] },
  { id: 2, name: "Elçin", grades: [75, 85, 88] },
  { id: 3, name: "Nigar", grades: [95, 88, 91] },
  { id: 4, name: "Orxan", grades: [70, 65, 72] },
];
function studentOperations(students) {
  students.forEach((student) => {
    student.avg =
      student.grades.reduce((sum, grade) => sum + grade, 0) /
      student.grades.length;
  });
  console.log(students);

  const highAvg = students.filter((student) => student.avg > 85);
  console.log(highAvg);

  const sortByAvg = students.sort((a, b) => b.avg - a.avg);
  console.log(sortByAvg);

  const totalAvg =
    students.reduce((sum, student) => sum + student.avg, 0) / students.length;
  console.log(totalAvg);
}
studentOperations(students);
console.log("");

// Task 4.1 Functions
console.log("Taks 4.1:");
function calcFactorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
console.log(calcFactorial(5));

const square = (x) => x * x;
console.log(square(4));

const filtNum = [1, 2, 3, 4, 5, 6];
function filterArr(arr) {
  return arr.filter((num) => num % 2 === 0);
}
console.log(filterArr(filtNum));
console.log("");

// Task 4.2 Objects
console.log("Taks 4.2:");
let bankAcc = {
  accNum: "123456789",
  ownerFullName: "Ali Mamedov",
  balance: 1000,
  transactions: [],
};
checkBalance();
function deposit(amount) {
  bankAcc.balance += amount;
  bankAcc.transactions.push("Deposit $" + amount);
}
deposit(200);
checkBalance();

function withdraw(amount) {
  if (amount <= bankAcc.balance) {
    bankAcc.balance -= amount;
    bankAcc.transactions.push("Withdrawal $" + amount);
  } else {
    console.log("Insufficient funds");
  }
}
withdraw(100);
checkBalance();

function checkBalance() {
  console.log("Balance: $" + bankAcc.balance);
}
checkBalance();

function transactionHistory() {
  console.log("Transaction history:");
  for (let i = 0; i < bankAcc.transactions.length; i++) {
    console.log(bankAcc.transactions[i]);
  }
  // console.log(bankAcc.transactions);
}
transactionHistory();
console.log("");

// Task 5.1
console.log("Taks 5.1:");
function checkEvenOdd(number) {
  if (number % 2 === 0) {
    console.log(number + " - even");
  } else {
    console.log(number + " - odd");
  }
}
checkEvenOdd(1);
checkEvenOdd(2);

let task51 = [11, 24, 8, 100];
function findMax(arr) {
  let maxNum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > maxNum) {
      maxNum = arr[i];
    }
  }
  console.log(maxNum + " is the largest number");
}
findMax(task51);

function getSeason(month) {
  if (month === 12 || month === 1 || month === 2) {
    console.log("Winter");
  } else if (month >= 3 && month <= 5) {
    console.log("Spring");
  } else if (month >= 6 && month <= 8) {
    console.log("Summer");
  } else if (month >= 9 && month <= 11) {
    console.log("Autumn");
  } else {
    console.log("Wrong Number");
  }
}
getSeason(1);
getSeason(4);
getSeason(7);
getSeason(10);
getSeason(13);

// func simpleCalc(){}
// ???
console.log("");

// Task 5.2
console.log("Taks 5.2:");
function fibonacci(n) {
  let a = 0;
  let b = 1;
  let fib = 0;
  for (let i = 1; i < n; i++) {
    fib = a + b;
    console.log("Fibonacci's " + i + "iteration is: " + fib);
    a = b;
    b = fib;
  }
  console.log("Final fibonacci is: " + fib);
}
fibonacci(6);

let rArr = [1, 2, 3, 4, 5];
function reverseArr(arr) {
  let i = arr.length - 1;
  let newArr = [];
  while (i >= 0) {
    newArr.push(arr[i]);
    i--;
  }
  console.log(newArr);
}
reverseArr(rArr);

// function simpleNum(untilNum) {}
// ???

function printTriangle(n) {
  let str = "";
  for (let i = 1; i <= n; i++) {
    str += "*";
    console.log(str);
  }
}
printTriangle(5);

console.log("");