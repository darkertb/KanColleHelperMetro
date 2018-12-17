var Utils = module.exports;

Utils.someOneSay = function(sender, msg) {
  console.log(sender + ' : ' + msg + '\n');
}

Utils.narration = function (msg) {
  console.log(msg);
}

Utils.randomNum = function (minNum, maxNum) {
  if (minNum == maxNum)
    return maxNum;
  else
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
};

String.prototype.replaceAll = function (search, replacement) {
  var target = this;

  return target.replace(new RegExp(search, 'g'), replacement);
};