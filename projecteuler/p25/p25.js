// 1000-digit Fibonacci number
// Problem 25 
// The Fibonacci sequence is defined by the recurrence relation:
// 
// Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.
// Hence the first 12 terms will be:
// 
// F1 = 1
// F2 = 1
// F3 = 2
// F4 = 3
// F5 = 5
// F6 = 8
// F7 = 13
// F8 = 21
// F9 = 34
// F10 = 55
// F11 = 89
// F12 = 144
// The 12th term, F12, is the first term to contain three digits.
// 
// What is the index of the first term in the Fibonacci sequence to contain 1000 digits?


// adds two natural numbers represented as strings, the result is also string
function strAdd(s1, s2) {
  var result = '';
  if (s1.length > s2.length) {
    var lenDiff = s1.length - s2.length;
    s2 = s2.padStart(s1.length, '0');
  } else {
    var lenDiff = s2.length - s2.length;
    s1 = s1.padStart(s2.length, '0');
  }
  var pishem = 0;
  var vUme = 0;
  for (var i = s1.length - 1; i > -1; i--) {
    var a = parseInt(s1.charAt(i));
    var b = parseInt(s2.charAt(i));
    var s = a + b + vUme;
    var ss = s.toString();
    if (ss.length == 1) {
      pishem = parseInt(ss);
      vUme = 0;
    } else if (ss.length == 2){
      pishem = parseInt(ss.charAt(1));
      vUme = parseInt(ss.charAt(0));
    }
    result = pishem.toString() + result;
  }
  if (vUme > 0) {
    result = vUme.toString() + result;
  }
  return result;
}

function p25() {
  var fibs = [];
  fibs.push('1');
  fibs.push('1');
  while(true){
    var next = strAdd(fibs[fibs.length - 1], fibs[fibs.length - 2]);
    fibs.push(next);
    if (next.length == 1000) {
      break;
    }
  }
  console.log(fibs.length); // the answer is 4782
}

p25();

// some testing:
// console.log(strAdd('34133433454323345420987687482309348', '34394893234323323'));

