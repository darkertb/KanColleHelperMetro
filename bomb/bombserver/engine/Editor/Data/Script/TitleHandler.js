

//---------------------------------------------------------------------------------------------
//  TitleHandler : GCScriptComponent
//---------------------------------------------------------------------------------------------
function TitleHandler()
{
    GCScriptComponent.call(this);
};

//---------------------------------------------------------------------------------------------
TitleHandler.prototype = Object.create(GCScriptComponent.prototype);
TitleHandler.prototype.constructor = TitleHandler;

//-----------------------------------------------------------------------------
TitleHandler.prototype.Awake = function()
{
};

//---------------------------------------------------------------------------------------------
TitleHandler.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
TitleHandler.prototype.Start = function()
{
	console.log('[connect]', wwwData.host, wwwData.port);
	bomClient.connect(wwwData.host, wwwData.port, wwwData.name, wwwData.channel);
	
	// 當玩家發送資料 (包括自己)
	bomClient.on(BOMEVT.DATA, OnMsgReceived);

	// 當玩家進入頻道
	bomClient.on(BOMEVT.PLAYER_IN, OnPlayerEnter);

	// 當玩家離開頻道
	bomClient.on(BOMEVT.PLAYER_OUT, OnPlayerExit);         

	// 當與伺服器斷開連線 (伺服器關閉 || 呼叫disconnect)
	bomClient.on(BOMEVT.DISCONNECT, OnDisconnect);          
};

//-----------------------------------------------------------------------------
TitleHandler.prototype.Update = function(deltaTime)
{
};

//---------------------------------------------------------------------------------------------

var script = new TitleHandler();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
