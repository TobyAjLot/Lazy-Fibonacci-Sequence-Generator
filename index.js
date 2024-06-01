/* First implementation */
// function fibonacciGenerator() {
//   return function* (number) {
//     let num1 = 0;
//     let num2 = 1;

//     if (number >= 0) yield num1;
//     if (number >= 1) yield num2;

//     for (let i = 2; i <= number; i++) {
//       let nextNum = num1 + num2;
//       yield nextNum;
//       num1 = num2;
//       num2 = nextNum;
//     }
//   };
// }

// const fibonacci = fibonacciGenerator();

// console.log([...fibonacci(10)]);

/* Second implementation */
// function fibonacciGenerator() {
//   const cache = {};

//   return function* (number) {
//     if (number.toString() in cache) {
//       yield* cache[number.toString()];
//       return;
//     }

//     const result = [];

//     let num1 = 0;
//     let num2 = 1;

//     for (let i = 0; i < number; i++) {
//       if (i === 0) {
//         result.push(num1);
//         yield num1;
//       } else if (i === 1) {
//         result.push(num2);
//         yield num2;
//       } else {
//         let nextNum = num1 + num2;
//         result.push(nextNum);
//         yield nextNum;
//         num1 = num2;
//         num2 = nextNum;
//       }
//     }

//     cache[number.toString()] = result;
//   };
// }

// const fibonacci = fibonacciGenerator();

// const result = fibonacci(10);
// const cachedResult = fibonacci(10);
// console.log([...result]);
// console.log([...cachedResult]);

/* Third implementation */
function fibonacciGenerator() {
  const cache = {};

  return function* (start, end) {
    let num1 = 0;
    let num2 = 1;
    let currentIndex = 0;

    const rangeKey = `${start},${end}`;
    if (rangeKey in cache) {
      yield* cache[rangeKey];
      return;
    }

    const result = [];

    while (currentIndex <= end) {
      let nextNum;
      if (currentIndex === 0) {
        nextNum = num1;
      } else if (currentIndex === 1) {
        nextNum = num2;
      } else {
        nextNum = num1 + num2;
        num1 = num2;
        num2 = nextNum;
      }

      if (currentIndex >= start) {
        result.push(nextNum);
        yield nextNum;
      }
      currentIndex++;
    }
    cache[rangeKey] = result;
  };
}

const fibonacci = fibonacciGenerator();

const result = fibonacci(4, 5);
console.log([...result]);
