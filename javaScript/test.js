document.getElementById("demo").innerHTML =
  "ori".constructor +
  "<br/>" +
  (5).constructor +
  "<br/>" +
  false.constructor +
  "<br/>" +
  { name: "ham" }.constructor +
  "<br/>" +
  ["ham", "cheese"].constructor +
  "<br/>";

const num = "225.232r";
document.getElementById("demo2").innerHTML =
  parseInt(num) + "<br/>" + parseFloat(num) + "<br/>" + Number(num);

const numb = 1.523;
// number = numb.toString();

document.getElementById("demo3").innerHTML =
  typeof numb.toString() + "<br/>" + numb.toFixed(4);

const d = new Date();

console.log("date to number:", Number(d));
console.table("date to string", d.toString());
