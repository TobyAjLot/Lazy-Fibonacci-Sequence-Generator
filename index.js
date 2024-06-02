/* First implementation */
// function fibonacciGenerator() {
//   return function* (number) {
//     let current = 0;
//     let next = 1;

//     if (number >= 0) yield current;
//     if (number >= 1) yield next;

//     for (let i = 2; i <= number; i++) {
//       [current, next] = [next, next + current];
//       yield next;
//     }
//   };
// }

// const fibonacci = fibonacciGenerator();

// console.log([...fibonacci(10)]);

/* Second implementation */
// function fibonacciGenerator() {
//   const cache = new Map();

//   return function* (number) {
//     let key = number.toString();
//     if (cache.has(key)) {
//       console.log('Retrieved from cache: ');
//       yield* cache.get(key);
//       return;
//     }

//     const result = [];

//     let current = 0;
//     let next = 1;

//     for (let i = 0; i <= number; i++) {
//       if (i === 0) {
//         result.push(current);
//         yield current;
//       } else if (i === 1) {
//         result.push(next);
//         yield next;
//       } else {
//         [current, next] = [next, next + current];
//         result.push(next);
//         yield next;
//       }
//     }

//     cache.set(key, result);
//   };
// }

// const fibonacci = fibonacciGenerator();

// const result = fibonacci(10);
// const cachedResult = fibonacci(10);
// console.log([...result]);
// console.log([...cachedResult]);

/* Third implementation */
/** 
The returned function has below parameters
@params start - Optional start index
@params end - The nth sequence from 0
*/
function fibonacciGenerator() {
  const cache = new Map();

  return function* (...args) {
    let start;
    let end;

    if (args.length === 1) {
      start = 0;
      end = args[0];
    } else {
      start = args[0];
      end = args[1];
    }

    if (start > end) throw new Error('first arg must be smaller than second');

    let current = 0;
    let next = 1;
    let currentIndex = 0;

    const rangeKey = args.join(':');
    if (cache.has(rangeKey)) {
      console.log('Retrieved from cache: ');
      yield* cache.get(rangeKey);
      return;
    }

    const result = [];

    while (currentIndex <= end) {
      if (currentIndex === 0) {
        next = 0;
      } else if (currentIndex === 1) {
        next = 1;
      } else {
        [current, next] = [next, next + current];
      }

      if (currentIndex >= start) {
        result.push(next);
        yield next;
      }
      currentIndex++;
    }
    cache.set(rangeKey, result);
  };
}

const fibonacci = fibonacciGenerator();

const result = fibonacci(5, 10);
const result2 = fibonacci(5, 10);
console.log([...result]);
console.log([...result2]);
