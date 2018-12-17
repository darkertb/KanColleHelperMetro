let ROOT = '../'

let colors = require('colors');
let readline = require('readline-sync');

let utils = require(ROOT + 'lib/utils');

let Messager = function (messages, girls, targets) {
  this.messages = messages;
  this.girls = girls;
  this.targets = targets;
};

Messager.prototype.print = function (paragraph) {
  console.log('');
  for (let i = 0; i < this.messages[paragraph].length; i++) {
    let element = this.messages[paragraph][i];

    for (let y = 0; y < this.girls.length; y++) {
      let girl = this.girls[y];

      let searchWord = '%gname' + y + '%';
      let replaceWord = girl.name;
      element = element.replaceAll(searchWord, colors[girl.color](replaceWord));
    }

    for (let y = 0; y < this.targets.length; y++) {
      let target = this.targets[y];

      let searchWord = '%tname' + y + '%';
      let replaceWord = target.name;
      element = element.replaceAll(searchWord, colors[target.color](replaceWord));
    }

    readline.question(element);
    // utils.narration(element);
  }
  console.log('');
};

module.exports = Messager;