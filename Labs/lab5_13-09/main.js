// Task 1
console.log("Taks 1:");
function findLength(str) {
  let result = str.length;
  return result;
}
console.log(findLength("hello"));
console.log("");

// Task 2
console.log("Taks 2:");
function allToUpperCase(str) {
  let result = str.toUpperCase();
  return result;
}
console.log(allToUpperCase("hello"));
console.log("");

// Task 3
console.log("Taks 3:");
function allToLowerCase(str) {
  let result = str.toLowerCase();
  return result;
}
console.log(allToLowerCase("HELLO"));
console.log("");

// Task 4
console.log("Taks 4:");
function firstLetterToLowercase(str) {
  let result = str.charAt(0).toUpperCase() + str.slice(1);
  return result;
}
console.log(firstLetterToLowercase("python"));
console.log("");

// Task 5
console.log("Taks 5:");
function collumnString(str) {
  for (let i = 0; i < str.length; i++) {
    console.log(str[i]);
  }
}
collumnString("salam");
console.log("");

// Task 6
console.log("Taks 6:");
function findIndex(str, find) {
  let result = str.indexOf(find);
  return result;
}
console.log(findIndex("banana", "a"));
console.log("");

// Task 7
console.log("Taks 7:");
function replaceAllSpaces(str) {
  let result = str.replaceAll(" ", "-");
  return result;
}
console.log(replaceAllSpaces("hello world"));
console.log("");

// Task 8
console.log("Taks 8:");
function firstAndLastLetters(str) {
  let result = str[0] + "-" + str[str.length - 1];
  return result;
}
console.log(firstAndLastLetters("javascript"));
console.log("");

// Task 9
console.log("Taks 9:");
function lastLetters(str) {
  let result = str.slice(-2);
  return result;
}
console.log(lastLetters("hello"));
console.log("");

// Task 10
console.log("Taks 10:");
function isWordStart(str, word) {
  let result = str.toLowerCase().startsWith(word);
  return result;
}
console.log(isWordStart("hello world", "hell"));
console.log("");

// Task 11
console.log("Taks 11:");
function isWordThere(str, word) {
  let result = str.toLowerCase().includes(word);
  return result;
}
console.log(isWordThere("i love js", "js"));
console.log("");

// Task 12
console.log("Taks 12:");
function someFirstLetters(str, howMuch) {
  let result = str.slice(0, howMuch);
  return result;
}
console.log(someFirstLetters("javascript", 4));
console.log("");

// Task 13
console.log("Taks 13:");
function concateWords(str1 = "", str2, space = " ") {
  let result = str1.concat(space, str2);
  return result;
}
console.log(concateWords("hello", "world"));
console.log("");

// Task 14
console.log("Taks 14:");
function reverce(str) {
  let result = str.split("").reverse().join("");
  return result;
}
console.log(reverce("salam"));
console.log("");

// Task 15
console.log("Taks 15:");
function howManyTimes(str, letter) {
  let result = str.split(letter).length - 1;
  return result;
}
console.log(howManyTimes("alma", "a"));
console.log("");

// Task 16 (Bonus)
console.log("Taks 16 (Bonus):");
function palindrome(str) {
  let result = str.toLowerCase();
  if (result == str.split("").reverse().join("")) {
    result = true;
  } else {
    result = false;
  }
  return result;
}
console.log(palindrome("level"));
console.log("");

// Task 14 (Without Methods)
console.log("Taks 14 (Without Methods):");
function reverce2(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}
console.log(reverce2("salam"));
console.log("");

// Task 16 (Bonus) (Without Methods)
console.log("Taks 16 (Bonus) (Without Methods):");
function palindrome2(str) {
  let result = str.toLowerCase();
  let leftLetter = 0;
  let rightLetter = str.length - 1;
  while (leftLetter < rightLetter) {
    if (str[leftLetter] != str[rightLetter]) {
      result = false;
      break;
    } else {
      leftLetter++;
      rightLetter--;
    }
    result = true;
  }
  return result;
}
console.log(palindrome2("level"));
console.log("");
