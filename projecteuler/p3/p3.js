// Largest prime factor
// Problem 3 
// The prime factors of 13195 are 5, 7, 13 and 29.
// 
// What is the largest prime factor of the number 600851475143 ?
//
//
function isSimple(n) {
  if (n === 2) {
    //console.log('2 is simple number');
    return true;
  }
  var r = Math.round(Math.sqrt(n));
  var dividers = [];
  for (var i = 1; i <= r; i++) {
    if (n % i === 0) {
      dividers.push(i);
    }
  }
  //console.log(dividers);
  return dividers.length === 1 && dividers[0] === 1;
}

function p3() {
  var c = 0;
  // 600851475143 
  //var p = 6008514751; // iteration from 1 to this number hangs
  var p = 600851475143;
  var root_p = Math.round(Math.sqrt(p)); // 775146
  var dividers = [];
  for (var i = root_p; i > 0; i--) {
    if (p % i === 0 && isSimple(i)) {
      dividers.push(i);
    }
  }
  console.log('simple dividers of ', p, ' are ', dividers);
}

p3(); // the answer to p3 is 6857

//dividers of  600851475143  are  [ 486847, 104441, 59569, 6857, 1471, 839, 71, 1 ]
//simple dividers of  600851475143  are  [ 6857, 1471, 839, 71, 1 ]

// testing:
//console.log(isSimple(3572));
//[ 486847, 104441, 59569, 6857, 1471, 839, 71, 1 ]
