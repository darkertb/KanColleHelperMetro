

//---------------------------------------------------------------------------------------------
//  WaitingHandler : GCScriptComponent
//---------------------------------------------------------------------------------------------
function WaitingHandler()
{
    GCScriptComponent.call(this);
	
	this.player1Show = true;
	this.player2Show = true;
};

//---------------------------------------------------------------------------------------------
WaitingHandler.prototype = Object.create(GCScriptComponent.prototype);
WaitingHandler.prototype.constructor = WaitingHandler;

//-----------------------------------------------------------------------------
WaitingHandler.prototype.Awake = function()
{
};

//---------------------------------------------------------------------------------------------
WaitingHandler.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
WaitingHandler.prototype.Start = function()
{
};

//-----------------------------------------------------------------------------
WaitingHandler.prototype.Update = function(deltaTime)
{
	if (player1 != ''){
		if (!this.player1Show){
			this.player1Show = true;
			this.getObjectByName('character01').root.setVisible(true);
		}
	}
	else {
		if (this.player1Show){
			this.player1Show = false;
			this.getObjectByName('character01').root.setVisible(false);
		}
	}
	
	if (player2 != ''){
		if (!this.player2Show){
			this.player2Show = true;
			this.getObjectByName('character02').root.setVisible(true);
		}
	}
	else {
		if (this.player2Show){
			this.player2Show = false;
			this.getObjectByName('character02').root.setVisible(false);
		}
	}
};

//---------------------------------------------------------------------------------------------

var script = new WaitingHandler();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
