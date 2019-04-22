// Smallest multiple
// Problem 5 
// 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
// 
// What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

//
// first I solved this without any programming, just by typing in Chrome console
// 2520 % 11 = 1
// 2520 % 12 = 0
// 2520 % 13 = 11
// 2520 % 14 = 0
// 2520 % 15 = 0
// 2520 % 16 = 8
// 2520 % 17 = 4
// 2520 % 18 = 0
// 2520 % 19 = 12
// 2520 % 20 = 0

// division by 12, 14, 15, 18, 20 gives us remainder 0, so we have nothing to do with these numbers
// division by simple numbers 11, 13, 17, 19 gives us non-zero remainder, so only thing we can do
// here is to multiply 2520 by them and check remainders again
// 2520 * 11* 13* 17* 19 % [11..20]
// ...
// all zeroes, except 16, which gives us remainder 8
// let multiply it again by powers of simple numbers, starting with 2^1
// 2520 * 11* 13* 17* 19 * 2 % [11..20] ... checking ... all zeroes!
// 232792560, which is the answer
//
// but now let's implement factorization algorithm based on logarithm function
const lib = require('../lib/lib');


//lib.printPrimes(100);

