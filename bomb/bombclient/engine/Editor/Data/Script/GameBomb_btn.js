

//---------------------------------------------------------------------------------------------
//  GameBomb_btn : GCScriptComponent
//---------------------------------------------------------------------------------------------
function GameBomb_btn()
{
    GCScriptComponent.call(this);
};

//---------------------------------------------------------------------------------------------
GameBomb_btn.prototype = Object.create(GCScriptComponent.prototype);
GameBomb_btn.prototype.constructor = GameBomb_btn;

//-----------------------------------------------------------------------------
GameBomb_btn.prototype.Awake = function()
{
	this.registerButton();
};

//---------------------------------------------------------------------------------------------
GameBomb_btn.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
GameBomb_btn.prototype.Start = function()
{
};

//-----------------------------------------------------------------------------
GameBomb_btn.prototype.Update = function(deltaTime)
{
};

GameBomb_btn.prototype.OnClick = function(sender)
{
	var animation = this.getObjectByName('character0' + playerNo).GetComponent("GCAnimator");
	if (animation != undefined) {
		var oldAniNAme = animation.GetCurAnimationName();
		if (oldAniNAme == undefined)
			oldAniNAme = '';
	
		if (!animation.IsPlaying || oldAniNAme.indexOf('Walk') < 0) {					
			animation.PlayAnimation('BombF');
		}
	}	

	var req = {};
	req.player = wwwData.name;
	req.type = 'bomb';
	
	bomClient.send(JSON.stringify(req));
};  

//---------------------------------------------------------------------------------------------

var script = new GameBomb_btn();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
