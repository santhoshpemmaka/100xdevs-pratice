// let x: number = 1;
// console.log(x);


const greet = (fristName:string, lastName:string):void => {
    console.log("Hello " + fristName + " " + lastName);
}

greet("santosh", "")

const sumOfNumber = (a: number, b: number): number => {
    return a + b;
}

sumOfNumber(1, 2);

const isLegal = (age: number): boolean => {
    if (age > 18)
        return true;
    else
        return false;
}

let x = isLegal(20);


const runAfter = (fs: () => void) => {
    return setTimeout(() => {
        return fs();
    }, 1000);
}


runAfter(() => {
    console.log("Hi ther");
})