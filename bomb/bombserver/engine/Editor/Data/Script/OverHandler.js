

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
	
	this.getObjectByName('character0' + p + '_dead').root.setVisible(false);
	this.getObjectByName('character0' + (p == 1 ? 2 : 1)).root.setVisible(false);
	
	console.log(pScore[1]);
	console.log(pScore[2]);
	this.SetNum(1, pScore[1]);
	this.SetNum(2, pScore[2]);
};

//-----------------------------------------------------------------------------
OverHandler.prototype.Update = function(deltaTime)
{
};

OverHandler.prototype.SetNum = function(idx, num)
{
	for (var i=0;i<10;i++) {
		this.getObjectByName('t' + idx + '1' + i).root.setVisible(false);
		this.getObjectByName('t' + idx + '2' + i).root.setVisible(false);
		this.getObjectByName('t' + idx + '3' + i).root.setVisible(false);
		this.getObjectByName('t' + idx + '4' + i).root.setVisible(false);
		this.getObjectByName('t' + idx + '5' + i).root.setVisible(false);
	}
	var a = Math.floor(((num - (num % 10000)) / 10000) % 10);
	var b = Math.floor(((num - (num % 1000)) / 1000) % 10);
	var c = Math.floor(((num - (num % 100)) / 100) % 10);
	var d = Math.floor(((num - (num % 10)) / 10) % 10);
	var e = Math.floor(num % 10);
	
	this.getObjectByName('t' + idx + '1' + e).root.setVisible(true);
	this.getObjectByName('t' + idx + '2' + d).root.setVisible(true);
	this.getObjectByName('t' + idx + '3' + c).root.setVisible(true);
	this.getObjectByName('t' + idx + '4' + b).root.setVisible(true);
	this.getObjectByName('t' + idx + '5' + a).root.setVisible(true);
};

//---------------------------------------------------------------------------------------------

var script = new OverHandler();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
