

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
	/*
	console.log(isWinner);
	if (!isWinner){
		this.getObjectByName('win1').root.setVisible(false);
		this.getObjectByName('character02_0' + (playerNo == 1 ? 2 : 1) + '_dead').root.setVisible(false);
		this.getObjectByName('character01_0' + playerNo).root.setVisible(false);
	}
	else {
		this.getObjectByName('win2').root.setVisible(false);
		this.getObjectByName('character02_0' + (playerNo == 1 ? 2 : 1)).root.setVisible(false);
		this.getObjectByName('character01_0' + playerNo + '_dead').root.setVisible(false);
	}

	this.getObjectByName('character01_0' + (playerNo == 1 ? 2 : 1)).root.setVisible(false);	
	this.getObjectByName('character01_0' + (playerNo == 1 ? 2 : 1) + '_dead').root.setVisible(false);	
	this.getObjectByName('character02_0' + playerNo).root.setVisible(false);
	this.getObjectByName('character02_0' + playerNo + '_dead').root.setVisible(false);
	
	*/
	console.log(HP);
	var chIdx = (playerNo == 1 || playerNo == 3) ? 1 : 2;
	this.getObjectByName('character01_01').root.setVisible(false);
	this.getObjectByName('character01_02').root.setVisible(false);
	this.getObjectByName('character01_01_dead').root.setVisible(false);
	this.getObjectByName('character01_02_dead').root.setVisible(false);
	
	if (HP <= 0) {
		this.getObjectByName('win1').root.setVisible(false);
		this.getObjectByName('character01_0' + chIdx + '_dead').root.setVisible(true);
	}
	else {
		this.getObjectByName('character01_0' + chIdx).root.setVisible(true);
	}
};

//-----------------------------------------------------------------------------
OverHandler.prototype.Update = function(deltaTime)
{
};

//---------------------------------------------------------------------------------------------

var script = new OverHandler();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
