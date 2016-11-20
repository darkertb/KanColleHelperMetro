

//---------------------------------------------------------------------------------------------
//  GameMsgBtn : GCScriptComponent
//---------------------------------------------------------------------------------------------
function GameMsgBtn()
{
    GCScriptComponent.call(this);
};

//---------------------------------------------------------------------------------------------
GameMsgBtn.prototype = Object.create(GCScriptComponent.prototype);
GameMsgBtn.prototype.constructor = GameMsgBtn;

//-----------------------------------------------------------------------------
GameMsgBtn.prototype.Awake = function()
{
	this.registerButton();
};

//---------------------------------------------------------------------------------------------
GameMsgBtn.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
GameMsgBtn.prototype.Start = function()
{
};

//-----------------------------------------------------------------------------
GameMsgBtn.prototype.Update = function(deltaTime)
{
};

GameMsgBtn.prototype.OnClick = function(sender)
{
	var msg = this.gameObject.name.replace('msg0', '');
	
	var req = {};
	req.player = wwwData.name;
	req.type = 'msg';
	req.msg = msg;
	
	bomClient.send(JSON.stringify(req));
};    

//---------------------------------------------------------------------------------------------

var script = new GameMsgBtn();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
