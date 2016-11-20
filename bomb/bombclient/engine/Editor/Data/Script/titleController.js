//---------------------------------------------------------------------------------------------
//  titleController : GCScriptComponent
//---------------------------------------------------------------------------------------------
function titleController()
{
    GCScriptComponent.call(this);
};

//---------------------------------------------------------------------------------------------
titleController.prototype = Object.create(GCScriptComponent.prototype);
titleController.prototype.constructor = titleController;

//-----------------------------------------------------------------------------
titleController.prototype.Awake = function()
{
	this.registerButton();
};

//---------------------------------------------------------------------------------------------
titleController.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
titleController.prototype.Start = function()
{
};

//-----------------------------------------------------------------------------
titleController.prototype.Update = function(deltaTime)
{
};

titleController.prototype.OnClick = function(sender)
{
	console.log('[connect]', wwwData.host, wwwData.port);
	bomClient.connect(wwwData.host, wwwData.port, wwwData.name, wwwData.channel);
	
	// 當玩家發送資料 (包括自己)
	bomClient.on(BOMEVT.DATA, OnMsgReceived);

	// 當玩家進入頻道
	bomClient.on(BOMEVT.PLAYER_IN, function(data) {
		onsole.log('PLAYER_IN', data);
	});

	// 當玩家離開頻道
	bomClient.on(BOMEVT.PLAYER_OUT, function(data) {
		console.log('PLAYER_OUT', data);
	});         

	// 當與伺服器斷開連線 (伺服器關閉 || 呼叫disconnect)
	bomClient.on(BOMEVT.DISCONNECT, function(data) {
		console.log('DISCONNECT', data);
	});          
	  
	wwwData.data = 'connected';
	bomClient.send(wwwData);
	
	
	// ==============
};    

//---------------------------------------------------------------------------------------------

var script = new titleController();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
