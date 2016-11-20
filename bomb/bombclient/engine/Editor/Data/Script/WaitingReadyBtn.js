

//---------------------------------------------------------------------------------------------
//  WaitingReadyBtn : GCScriptComponent
//---------------------------------------------------------------------------------------------
function WaitingReadyBtn()
{
    GCScriptComponent.call(this);
};

//---------------------------------------------------------------------------------------------
WaitingReadyBtn.prototype = Object.create(GCScriptComponent.prototype);
WaitingReadyBtn.prototype.constructor = WaitingReadyBtn;

//-----------------------------------------------------------------------------
WaitingReadyBtn.prototype.Awake = function()
{
	this.registerButton();
};

//---------------------------------------------------------------------------------------------
WaitingReadyBtn.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
WaitingReadyBtn.prototype.Start = function()
{
};

//-----------------------------------------------------------------------------
WaitingReadyBtn.prototype.Update = function(deltaTime)
{
};

WaitingReadyBtn.prototype.OnClick = function(sender)
{
	var req = {};
	req.type = 'ready';
	
	bomClient.send(JSON.stringify(req));
};    

//---------------------------------------------------------------------------------------------

var script = new WaitingReadyBtn();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
