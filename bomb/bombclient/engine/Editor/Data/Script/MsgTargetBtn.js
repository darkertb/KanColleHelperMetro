

//---------------------------------------------------------------------------------------------
//  MsgTargetBtn : GCScriptComponent
//---------------------------------------------------------------------------------------------
function MsgTargetBtn()
{
    GCScriptComponent.call(this);
};

//---------------------------------------------------------------------------------------------
MsgTargetBtn.prototype = Object.create(GCScriptComponent.prototype);
MsgTargetBtn.prototype.constructor = MsgTargetBtn;

//-----------------------------------------------------------------------------
MsgTargetBtn.prototype.Awake = function()
{
	this.registerButton();
};

//---------------------------------------------------------------------------------------------
MsgTargetBtn.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
MsgTargetBtn.prototype.Start = function()
{
};

//-----------------------------------------------------------------------------
MsgTargetBtn.prototype.Update = function(deltaTime)
{
};

MsgTargetBtn.prototype.OnClick = function(sender)
{		
	this.getObjectByName('character_head0' + msgTarget).root.setVisible(false);
	if (msgTarget != 0)
		this.getObjectByName('toTxt0' + msgTarget).root.setVisible(false);
	
	msgTarget++;
	
	if (msgTarget > 4)
		msgTarget = 0;		
		
	this.getObjectByName('character_head0' + msgTarget).root.setVisible(true);
	if (msgTarget != 0)
		this.getObjectByName('toTxt0' + msgTarget).root.setVisible(true);
};  

//---------------------------------------------------------------------------------------------

var script = new MsgTargetBtn();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
