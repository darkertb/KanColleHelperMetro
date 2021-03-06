

var wwwData = {
	host: '54.249.81.168',
	port: '3050',
	name : "Lin",
	channel: "01",
	data : "TEST_DATA",
};

var nowScene = "";

var isConnected = false;
var playerNo = -1;

var playerCount = 0;

var playerDire = '';

var isWinner = false;

var damageAniTime = 0;
var damageAniState = true;

var HP = 3;

var msgTarget = 0;

var gScript;

function OnMsgReceived (data) {
	var msg = JSON.parse(data.msg);
	console.log(msg);
	
	if (msg.target != 'all' && msg.target != wwwData.name)
		return;
	
	if (msg.type == 'disconnect')
		bomClient.disconnect();
		
	if (nowScene == 'Waiting') {
		// 連線成功
		if (msg.type == 'connected') {
			playerNo = msg.playerNo;
			
			playerCount = msg.count;
			
			isConnected = true;
		}
		
		// 玩家進入
		if (msg.type == 'playerEnter' && msg.newPlayer != wwwData.name) {
			playerCount++;
		}
		// 玩家離開
		if (msg.type == 'playerExit' && msg.exitPlayer != wwwData.name) {
			playerCount--;
		}
		
		// 開始遊戲
		if (msg.type == 'startGame') {
			ChangeSC('Game');
		}
	}
	
	if (nowScene == 'Game') {
		var msgText = [];
		msgText[1] = '你好!';
		msgText[2] = '謝謝!';
		msgText[3] = '玩得不錯!';
		msgText[4] = '等我一下';
		msgText[5] = '好';
		
		if (msg.type == 'pMsg') {
			gScript.getObjectByName('Label Object').GetComponent("GCLabel").SetText('P' + msg.sender + ':' + msgText[msg.msg]);
			
			setTimeout(function() {
				gScript.getObjectByName('Label Object').GetComponent("GCLabel").SetText('');
			}, 3000);
		}
		if (msg.type == 'addItem') {
			var label = gScript.getObjectByName('prop0' + msg.itemType + '_txt').GetComponent("GCLabel");
			
			label.SetText(msg.itemCount);
		}
		
		if (msg.type == 'damage') {
			HP = msg.heartCount;
			
			var heart = [];
			
			for (var i = 1; i < 4; i++){
				heart[i] = gScript.getObjectByName('heart' + i);
				
				heart[i].root.setVisible(false);
			}
			
			for (var i = 1; i <= msg.heartCount; i++){
				heart[i] = gScript.getObjectByName('heart' + i);
				
				heart[i].root.setVisible(true);
			}
			
			if (HP <= 0){
				ChangeSC('Over');
				return;
			}
			
			damageAniTime = 6;
		}
		
		// 遊戲結束
		if (msg.type == 'gameOver') {
			if (msg.winner == wwwData.name)
				isWinner = true;
		
			setTimeout(function() {
				ChangeSC('Over');
			}, 200);
		}
	}
}

function OnPlayerEnter (data) {
	console.log('enter');
}

function OnPlayerExit (data) {
	console.log('exit');
}

function OnDisconnect (data) {
	playerCount = 0;
	isConnected = false;
	playerNo = -1;
	
	ChangeSC('Title');
}

function ChangeSC (scName) {
	nowScene = scName;
	console.log('next sc: ' + nowScene);
	gScript.changeScene(scName);
}

//---------------------------------------------------------------------------------------------
//  wwwcontroller : GCScriptComponent
//---------------------------------------------------------------------------------------------
function wwwcontroller()
{
    GCScriptComponent.call(this);
};

//---------------------------------------------------------------------------------------------
wwwcontroller.prototype = Object.create(GCScriptComponent.prototype);
wwwcontroller.prototype.constructor = wwwcontroller;

//-----------------------------------------------------------------------------
wwwcontroller.prototype.Awake = function()
{
	gScript = this;
	
	nowScene = EditorParser().GetNowScene()
	wwwData.name = 'player-' + new Date().getTime();
	
	console.log(wwwData.name);
};

//---------------------------------------------------------------------------------------------
wwwcontroller.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
wwwcontroller.prototype.Start = function()
{
};

//-----------------------------------------------------------------------------
wwwcontroller.prototype.Update = function(deltaTime)
{
};

//---------------------------------------------------------------------------------------------

var script = new wwwcontroller();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
