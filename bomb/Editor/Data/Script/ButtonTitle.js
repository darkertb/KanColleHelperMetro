

//---------------------------------------------------------------------------------------------
//  ButtonTitle : GCScriptComponent
//---------------------------------------------------------------------------------------------
function ButtonTitle()
{
    GCScriptComponent.call(this);
};

//---------------------------------------------------------------------------------------------
ButtonTitle.prototype = Object.create(GCScriptComponent.prototype);
ButtonTitle.prototype.constructor = ButtonTitle;

//-----------------------------------------------------------------------------
ButtonTitle.prototype.Awake = function()
{
	this.registerButton();
};

//---------------------------------------------------------------------------------------------
ButtonTitle.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
ButtonTitle.prototype.Start = function()
{
};

//-----------------------------------------------------------------------------
ButtonTitle.prototype.Update = function(deltaTime)
{
};

ButtonTitle.prototype.OnClick = function(sender)
{
    this.changeScene("waitingRoom");
};    

//---------------------------------------------------------------------------------------------

var script = new ButtonTitle();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
