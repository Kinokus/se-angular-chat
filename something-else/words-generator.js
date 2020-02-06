// const x = ['a', 'b', 'c'];
// const len = x.length;
// let arr = [];
// let s = '';
// let sItog = '';
//
// for (var i = 0; ; i += 1) {
//   s = i.toString(len);
//   if (s.length > len) {    break;  }
//   if (s.length < len) {    s = ('00000000000000' + s).slice(-len);   }
//   arr = s.split('').map(function (v) {    return x[v];  });
//   sItog += arr.join('') + ' ';
// }
// console.log(sItog);


var arrStr = '0123456789abcdefghijklmnopqrstuvwxyz';
var arr = arrStr.split('');

function combinator(matrix) {
  return matrix.reduceRight(function (combination, x) {
    var result = [];
    [...x].forEach(function (a) {
      [...combination].forEach(function (b) {
        result.push(a + b);
      });
    });
    return result;
  });
}


const result = combinator(Array.from({length: 3}, () => arr));
console.log(result.length);

