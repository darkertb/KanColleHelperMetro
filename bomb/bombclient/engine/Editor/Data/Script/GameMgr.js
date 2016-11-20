

//---------------------------------------------------------------------------------------------
//  GameMgr : GCScriptComponent
//---------------------------------------------------------------------------------------------
function GameMgr()
{
    GCScriptComponent.call(this);
	
	this.sendTimer = 0.2;
};

//---------------------------------------------------------------------------------------------
GameMgr.prototype = Object.create(GCScriptComponent.prototype);
GameMgr.prototype.constructor = GameMgr;

//-----------------------------------------------------------------------------
GameMgr.prototype.Awake = function()
{
};

//---------------------------------------------------------------------------------------------
GameMgr.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
GameMgr.prototype.Start = function()
{
};

//-----------------------------------------------------------------------------
GameMgr.prototype.Update = function(deltaTime)
{
	this.sendTimer = this.sendTimer - 0.01;
	if (playerDire != '' && this.sendTimer <= 0) {
		var req = {};
		req.player = wwwData.name;
		req.type = 'move';
		req.dire = playerDire;
		
		bomClient.send(JSON.stringify(req));
		
		this.sendTimer = 0.05;
	}
};

//---------------------------------------------------------------------------------------------

var script = new GameMgr();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
