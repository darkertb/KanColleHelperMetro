let day2Time = 1541919600;

let today = getTimestamp();

let showTimeDate = new Date();
showTimeDate.setHours(15);
showTimeDate.setMinutes(0);
showTimeDate.setSeconds(0);
showTimeDate.setMilliseconds(0);

let showTime = getTimestamp(showTimeDate);

let dayCount = ((showTime - day2Time) / 86400) + 2;
$('#todayIs').text('本日為公演 Day ' + dayCount);

if (today >= showTime) {
  showTimeDate.setDate(showTimeDate.getDate() + 1);

  showTime = getTimestamp(showTimeDate);
}

let countDown = showTime - today;

let countDownString = '下次公演時間：' + dateFormat(showTime, 'yyyy/MM/dd hh:mm:ss') + ' ( 還剩下 ' + toHHMMSS(countDown) + ' )';
$('#countDown').text(countDownString);


function getTimestamp(date) {
  if (!date)
    date = Date.now();

  return Math.round(date / 1000);
};

function toHHMMSS(second) {
  var hours = Math.floor(second / 3600);
  var minutes = Math.floor((second - (hours * 3600)) / 60);
  var seconds = second - (hours * 3600) - (minutes * 60);

  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return hours + '小時 ' + minutes + '分 ' + seconds + '秒';
}

function dateFormat(date, fmt) {
  if (typeof (date) != 'object')
    date = new Date(date * 1000);

  var o = {
    "M+": date.getMonth() + 1,  //月
    "d+": date.getDate(),       //日
    "h+": date.getHours(),      //時
    "m+": date.getMinutes(),    //分
    "s+": date.getSeconds(),    //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  }
  return fmt;
};