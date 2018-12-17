let ROOT = '../';

let cfgExp = require(ROOT + 'config/exp');

let utils = require(ROOT + 'lib/utils');

let Experience = require(ROOT + 'data/experience');
let Resume = require(ROOT + 'data/resume');

let Girl = function (name, originalName, color, yo, hp, virginity, experience) {
  this.name = name;
  this.originalName = originalName;
  this.color = color;
  this.yo = yo;
  this.hp = hp;
  this.virginity = virginity;
  this.experience = experience;
};

Girl.prototype.updateExp = function (newExps) {
  console.log('');
  for (let expName in newExps) {
    let count = newExps[expName];

    let msg = cfgExp[expName] + '+' + count + ' (';
    msg += this.experience[expName] + ' > ';
    this.experience[expName] += count;
    msg += this.experience[expName] + ')';
    utils.narration(msg);
  }
  console.log('');
}

Girl.parse = function(json) {
  return new Girl(json.name, json.originalName, json.color, json.yo, json.hp, json.virginity, json.experience);
}

module.exports = Girl;