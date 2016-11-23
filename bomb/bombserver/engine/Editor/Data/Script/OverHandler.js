var aa = false;

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
	if (player3 == winner) {
		p = 3;
	}
	if (player4 == winner) {
		p = 4;
	}
	
	console.log(p);
	
	for (var i=1; i<5; i++) {
		if (i > playerCount) {
			this.getObjectByName('character0' + i).root.setVisible(false);
			this.getObjectByName('win' + i).root.setVisible(false);
			this.getObjectByName('character0' + i + '_dead').root.setVisible(false);
		}
	
		if (i == p)
			this.getObjectByName('character0' + i + '_dead').root.setVisible(false);
			
		if (i != p){
			this.getObjectByName('character0' + i).root.setVisible(false);
			this.getObjectByName('win' + i).root.setVisible(false);
		}
	}
	
	console.log(pScore[1]);
	for (var i=1; i<playerCount+1; i++) {
		this.SetNum(i, pScore[i]);
	}
	console.log(pScore[2]);
	
	this.playSound('over_bgm', true);
};

//-----------------------------------------------------------------------------
OverHandler.prototype.Update = function(deltaTime)
{
};

OverHandler.prototype.SetNum = function(idx, num)
{
	var fPos = [];
	fPos[1] = {x: 330, y:360};
	fPos[2] = {x: 530, y:360};
	fPos[3] = {x: 330, y:0};
	fPos[4] = {x: 530, y:0};

	var a = Math.floor(((num - (num % 10000)) / 10000) % 10);
	var b = Math.floor(((num - (num % 1000)) / 1000) % 10);
	var c = Math.floor(((num - (num % 100)) / 100) % 10);
	var d = Math.floor(((num - (num % 10)) / 10) % 10);
	var e = Math.floor(num % 10);
	
	this.getObjectByName('txt1' + e).clone().SetPosition(fPos[idx].x, fPos[idx].y);
	this.getObjectByName('txt1' + d).clone().SetPosition(fPos[idx].x - 26, fPos[idx].y);
	this.getObjectByName('txt1' + c).clone().SetPosition(fPos[idx].x - 52, fPos[idx].y);
	this.getObjectByName('txt1' + b).clone().SetPosition(fPos[idx].x - 78, fPos[idx].y);
	this.getObjectByName('txt1' + a).clone().SetPosition(fPos[idx].x - 104, fPos[idx].y);
};

//---------------------------------------------------------------------------------------------

var script = new OverHandler();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
