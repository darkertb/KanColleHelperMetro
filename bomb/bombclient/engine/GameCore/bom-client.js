var pomelo = window.pomelo;
var LOGIN_ERROR = "There is no bomClient to log in, please wait.";
var LENGTH_ERROR = "Name/Channel is too long or too short. 20 character max.";
var NAME_ERROR = "Bad character in Name/Channel. Can only have letters, numbers, Chinese characters, and '_'";
var DUPLICATE_ERROR = "Please change your name to login.";


var bomClient = {};


// DATA:        當玩家發送資料 (包括自己)
// PLAYER_IN:   當玩家進入頻道
// PLAYER_OUT:  當玩家離開頻道
// DISCONNECT:  當與伺服器斷開連線 (伺服器關閉 || 呼叫disconnect)
var BOMEVT = {
  DATA: 'onChat',
  PLAYER_IN: 'onAdd',
  PLAYER_OUT: 'onLeave',
  DISCONNECT: 'disconnect' 
};

bomClient.on = pomelo.on.bind(pomelo);

bomClient.debuglog = function () {
  // var a = Array.prototype.unshift.call(arguments, '[BOM-CLI]');
  // console.log(a, typeof(a));
  // console.log.apply(null, );
  // console.log.apply(null, arguments);
};

bomClient.onError = function (err) {
  console.log(err);
};

// 建立連線
bomClient.connect = function (host, port, username, channel, callback) {
  if (pomelo.isConnect()) {
		bomClient.disconnect();
  }

	var route = 'connector.entryHandler.enter';
  var initMsg = {
		host: host,
		port: port,
		log: true
	};

	pomelo.init(initMsg, function() {
    var enterMsg = {
      username: username,
      rid: channel
    };

		pomelo.request(route, enterMsg, function(data) {
			if(data.code === 500) {
				bomClient.onError(LOGIN_ERROR);
				return;
			}

      bomClient.debuglog(data);

      if (callback)
			  callback(data.host, data.port);
		});
	});
};

// 斷線
bomClient.disconnect = function () {
  pomelo.disconnect();
};

bomClient.removeAllListeners = pomelo.removeAllListeners.bind(pomelo);
bomClient.removeListener = pomelo.removeListener.bind(pomelo);

// 傳送資料
bomClient.send = function (sendMsg, callback) {
  var route = "chat.chatHandler.send";
  var msg = {
    content: sendMsg,
    target : "*"
  };

  pomelo.request(route, msg, function(data) {
    bomClient.debuglog(data);
    if (callback)
      callback(data);
  });
};