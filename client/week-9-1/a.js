"use strict";
// let x: number = 1;
// console.log(x);
const greet = (fristName, lastName) => {
    console.log("Hello " + fristName + " " + lastName);
};
greet("santosh", "");
const sumOfNumber = (a, b) => {
    return a + b;
};
sumOfNumber(1, 2);
const isLegal = (age) => {
    if (age > 18)
        return true;
    else
        return false;
};
let x = isLegal(20);
const runAfter = (fs) => {
    return setTimeout(() => {
        return fs();
    }, 1000);
};
runAfter(() => {
    console.log("Hi ther");
});
