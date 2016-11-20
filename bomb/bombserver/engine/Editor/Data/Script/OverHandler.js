

//---------------------------------------------------------------------------------------------
//  OverHandler : GCScriptComponent
//---------------------------------------------------------------------------------------------
function OverHandler()
{
    GCScriptComponent.call(this);
};

//---------------------------------------------------------------------------------------------
OverHandler.prototype = Object.create(GCScriptComponent.prototype);
OverHandler.prototype.constructor = OverHandler;

//-----------------------------------------------------------------------------
OverHandler.prototype.Awake = function()
{
};

//---------------------------------------------------------------------------------------------
OverHandler.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
OverHandler.prototype.Start = function()
{
	var p = 1;
	if (player2 == winner)
		p = 2;
		
	this.getObjectByName('win' + (p == 1 ? 2 : 1)).root.setVisible(false);
};

//-----------------------------------------------------------------------------
OverHandler.prototype.Update = function(deltaTime)
{
};

//---------------------------------------------------------------------------------------------

var script = new OverHandler();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
