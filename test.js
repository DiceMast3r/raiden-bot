/*function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
var arr = [];
for (var i = 0; i < 10; i++){
    arr.push(i)
}
var x = getRandomInt(0, arr.length);
console.log(arr[x]);*/


var prefix = "!"
var msg = '!กินไรดี ข้าวผัด แกงส้ม ข้าวปั้น'
var food = [];
const withoutPrefix = msg.slice(prefix.length);
const split = withoutPrefix.split(/ +/);
const command = split[0];
const args = split.slice(1)
console.log(split);
console.log(args);
for (var i = 0; i < args.length; i++) {
    food.push(args[i])
}
console.log(food);
console.log(args.join(', '))


