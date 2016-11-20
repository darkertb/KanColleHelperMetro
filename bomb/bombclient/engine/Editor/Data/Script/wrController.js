

//---------------------------------------------------------------------------------------------
//  wrController : GCScriptComponent
//---------------------------------------------------------------------------------------------
function wrController()
{
    GCScriptComponent.call(this);
	
	this.isConnect = false;
	this.chara = -1;
	this.scene = -1;
};

//---------------------------------------------------------------------------------------------
wrController.prototype = Object.create(GCScriptComponent.prototype);
wrController.prototype.constructor = wrController;

//-----------------------------------------------------------------------------
wrController.prototype.Awake = function()
{
	console.log(abcc);
};

//---------------------------------------------------------------------------------------------
wrController.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
wrController.prototype.Start = function()
{
};

//-----------------------------------------------------------------------------
wrController.prototype.Update = function(deltaTime)
{
	if (this.isConnect) {
		// show wait room ui
	}	
};

//---------------------------------------------------------------------------------------------

var script = new wrController();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
