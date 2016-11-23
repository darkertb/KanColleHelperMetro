

//---------------------------------------------------------------------------------------------
//  GameCharaDisplay : GCScriptComponent
//---------------------------------------------------------------------------------------------
function GameCharaDisplay()
{
    GCScriptComponent.call(this);
};

//---------------------------------------------------------------------------------------------
GameCharaDisplay.prototype = Object.create(GCScriptComponent.prototype);
GameCharaDisplay.prototype.constructor = GameCharaDisplay;

//-----------------------------------------------------------------------------
GameCharaDisplay.prototype.Awake = function()
{
};

//---------------------------------------------------------------------------------------------
GameCharaDisplay.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
GameCharaDisplay.prototype.Start = function()
{
	var chIdx = (playerNo == 1 || playerNo == 3) ? 1 : 2;
	var name = this.gameObject.name;
	
	if (name.indexOf(chIdx) == -1) {
		this.gameObject.root.setVisible(false);
	}
};

//-----------------------------------------------------------------------------
GameCharaDisplay.prototype.Update = function(deltaTime)
{
};

//---------------------------------------------------------------------------------------------

var script = new GameCharaDisplay();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
