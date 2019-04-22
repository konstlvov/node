// https://projecteuler.net/problem=1
// Multiples of 3 and 5
// Problem 1
//
// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
// Find the sum of all the multiples of 3 or 5 below 1000.
//
// This solution is intented to be run with nodejs
//

function sumOfMultiplesOf3or5(max) {
  var acc = 0;
  for (var i = 0; i < max; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      acc += i;
    }
  }
  return acc;
}

console.log(sumOfMultiplesOf3or5(1000)); // 233168 is the answer
