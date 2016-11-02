

//---------------------------------------------------------------------------------------------
//  waitingRoomConButton : GCScriptComponent
//---------------------------------------------------------------------------------------------
function waitingRoomConButton()
{
    GCScriptComponent.call(this);
	
	this.waitToChangeSC = false;
	this.timer = 0;
};

//---------------------------------------------------------------------------------------------
waitingRoomConButton.prototype = Object.create(GCScriptComponent.prototype);
waitingRoomConButton.prototype.constructor = waitingRoomConButton;

//-----------------------------------------------------------------------------
waitingRoomConButton.prototype.Awake = function()
{
	this.registerButton();
};

//---------------------------------------------------------------------------------------------
waitingRoomConButton.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
waitingRoomConButton.prototype.Start = function()
{
};

//-----------------------------------------------------------------------------
waitingRoomConButton.prototype.Update = function(deltaTime)
{
	if (this.waitToChangeSC) {
		this.timer += deltaTime;
		console.log(this.timer);
		
		if (this.timer >= 2)
			this.changeScene('gameSC');
			
	}
};

waitingRoomConButton.prototype.OnClick = function(sender)
{
    //this.changeScene("waitingRoom");
	
	var objA = this.getObjectByName("btn_character_slt_right");
	var objB = this.getObjectByName("btn_character_slt_left");
	
	objA.root.setVisible(false);
	objB.root.setVisible(false);
	
	this.waitToChangeSC = true;
};    

//---------------------------------------------------------------------------------------------

var script = new waitingRoomConButton();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
