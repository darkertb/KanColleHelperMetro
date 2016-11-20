

//---------------------------------------------------------------------------------------------
//  GameDire_btn : GCScriptComponent
//---------------------------------------------------------------------------------------------
function GameDire_btn()
{
    GCScriptComponent.call(this);
};

//---------------------------------------------------------------------------------------------
GameDire_btn.prototype = Object.create(GCScriptComponent.prototype);
GameDire_btn.prototype.constructor = GameDire_btn;

//-----------------------------------------------------------------------------
GameDire_btn.prototype.Awake = function()
{
	this.registerButton();
};

//---------------------------------------------------------------------------------------------
GameDire_btn.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
GameDire_btn.prototype.Start = function()
{
};

//-----------------------------------------------------------------------------
GameDire_btn.prototype.Update = function(deltaTime)
{
};

GameDire_btn.prototype.OnClick = function(sender)
{
	var direName = this.gameObject.name.replace('_btn', '');
	
	if (playerDire != direName)
		playerDire = direName;
	else if(playerDire == direName)
		playerDire = '';
};    

//---------------------------------------------------------------------------------------------

var script = new GameDire_btn();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
