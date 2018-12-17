let ROOT = '../../'

let utils = require(ROOT + 'lib/utils');
let Messager = require(ROOT + 'data/messager');

var EventNormal = module.exports;

EventNormal.normaFuckCondom = function (girl, target) {
  // ************** 前置設定 **************
  if (!Array.isArray(girl))
    girl = [girl];
  if (!Array.isArray(target))
    target = [target];

  let messageList = require(ROOT + 'config/message/' + girl[0].originalName).normaFuckCondom;
  let messageIndex = utils.randomNum(0, messageList.length - 1);
  let messager = new Messager(messageList[messageIndex], girl, target);
  // ************** 前置設定 **************

  messager.print(0);

  girl[0].updateExp({
    sexualExp: 1,
    vaginalExp: 1,
    condomExp: 1
  });

  messager.print(1);

  girl[0].updateExp({
    condomdashiExp: 1
  });

}

let Girl = require(ROOT + 'data/girl');
let _girl = Girl.parse(require(ROOT + 'config/girl/PanYiChing'));
EventNormal.normaFuckCondom(_girl, { name: '林家德', color: 'cyan' });