

//---------------------------------------------------------------------------------------------
//  GameItem_btn : GCScriptComponent
//---------------------------------------------------------------------------------------------
function GameItem_btn()
{
    GCScriptComponent.call(this);
};

//---------------------------------------------------------------------------------------------
GameItem_btn.prototype = Object.create(GCScriptComponent.prototype);
GameItem_btn.prototype.constructor = GameItem_btn;

//-----------------------------------------------------------------------------
GameItem_btn.prototype.Awake = function()
{
	this.registerButton();
};

//---------------------------------------------------------------------------------------------
GameItem_btn.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
GameItem_btn.prototype.Start = function()
{
};

//-----------------------------------------------------------------------------
GameItem_btn.prototype.Update = function(deltaTime)
{
};

GameItem_btn.prototype.OnClick = function(sender)
{
	var itemType = this.gameObject.name.replace('prop0', '');
	
	var req = {};
	req.player = wwwData.name;
	req.type = 'item';
	req.itemType = itemType;
	
	bomClient.send(JSON.stringify(req));
};  

//---------------------------------------------------------------------------------------------

var script = new GameItem_btn();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
