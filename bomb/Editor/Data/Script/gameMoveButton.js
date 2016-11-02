

//---------------------------------------------------------------------------------------------
//  gameMoveButton : GCScriptComponent
//---------------------------------------------------------------------------------------------
function gameMoveButton()
{
    GCScriptComponent.call(this);
	
	this.playerComp = null;
};

//---------------------------------------------------------------------------------------------
gameMoveButton.prototype = Object.create(GCScriptComponent.prototype);
gameMoveButton.prototype.constructor = gameMoveButton;

//-----------------------------------------------------------------------------
gameMoveButton.prototype.Awake = function()
{
	this.registerButton();
};

//---------------------------------------------------------------------------------------------
gameMoveButton.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
gameMoveButton.prototype.Start = function()
{
};

//-----------------------------------------------------------------------------
gameMoveButton.prototype.Update = function(deltaTime)
{
	if (this.playerComp == null) {
		var player = this.getObjectByName("Player");
		this.playerComp = player.GetComponent("GCScriptComponent").script;
	}
};

gameMoveButton.prototype.OnClick = function(sender)
{
	var btnName = this.gameObject.name;
	
	if (btnName.indexOf('up') >= 0) {
		this.playerComp.move('up');
	}
	if (btnName.indexOf('down') >= 0) {
		this.playerComp.move('down');
	}
	if (btnName.indexOf('left') >= 0) {
		this.playerComp.move('left');
	}
	if (btnName.indexOf('right') >= 0) {
		this.playerComp.move('right');
	}
	if (btnName.indexOf('bomb') >= 0) {
		/*
		console.log('bomb');
		
		var sceneName = EditorParser().GetNowScene();	
		var gameScene = GCFramework().GetGameScene(sceneName);
		
		var tObj = new GCGameObject();
		
		var textField = new cc.TextFieldTTF();
		textField.initWithPlaceHolder("12357", cc.size(120, 330), cc.TEXT_ALIGNMENT_LEFT, "Arial", 32);
		textField.setDimensions(cc.size(0, 0))
		textField.setFontSize(32);
		textField.setColor(cc.c4(255, 255, 255, 255));
		textField.setPosition(cc.p(parseInt(120), parseInt(330)));  
		
		
		tObj.root = textField;
		textField.attachWithIME();
		console.log(tObj);
		
		
		gameScene.manager.Add(tObj);
		*/
		this.playerComp.move('bomb');
	}
	if (btnName.indexOf('gameOver') >= 0) {
		this.changeScene('Over');
	}
};   

//---------------------------------------------------------------------------------------------

var script = new gameMoveButton();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
