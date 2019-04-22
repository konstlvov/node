// Largest palindrome product
// Problem 4 
// A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
// 
// Find the largest palindrome made from the product of two 3-digit numbers.

function isPalindrome(s){
  var reversed_s = s.split('').reverse().join(''); // lets use some ES magic...
  return s === reversed_s;
}

function p4(){
  var max = 0;
  for(var i = 1; i < 1000; i++){
    for(var j = 1; j < 1000; j++){
      var p = i * j;
      if (isPalindrome(p.toString()) && max < p) {
        max = p;
      }
    }
  }
  console.log(max); // answer is 906609
}

p4();
