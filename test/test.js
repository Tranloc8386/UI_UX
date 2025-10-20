const arrs = [1, 2, 3, 4, 5];
const chan = arrs
.filter((n) => {
  return (n % 2 === 0);
})
.map(n=>n*2)
.reduce((a,b)=>a+b,0)
console.log(chan)