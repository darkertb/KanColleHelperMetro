

//---------------------------------------------------------------------------------------------
//  waitingRoomBackButton : GCScriptComponent
//---------------------------------------------------------------------------------------------
function waitingRoomBackButton()
{
    GCScriptComponent.call(this);
};

//---------------------------------------------------------------------------------------------
waitingRoomBackButton.prototype = Object.create(GCScriptComponent.prototype);
waitingRoomBackButton.prototype.constructor = waitingRoomBackButton;

//-----------------------------------------------------------------------------
waitingRoomBackButton.prototype.Awake = function()
{
	this.registerButton();
};

//---------------------------------------------------------------------------------------------
waitingRoomBackButton.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
waitingRoomBackButton.prototype.Start = function()
{
};

//-----------------------------------------------------------------------------
waitingRoomBackButton.prototype.Update = function(deltaTime)
{
};

waitingRoomBackButton.prototype.OnClick = function(sender)
{
    this.changeScene("Title");
};    

//---------------------------------------------------------------------------------------------

var script = new waitingRoomBackButton();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
