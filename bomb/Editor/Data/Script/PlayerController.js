//---------------------------------------------------------------------------------------------
//  PlayerController : GCScriptComponent
//---------------------------------------------------------------------------------------------
function PlayerController()
{
    GCScriptComponent.call(this);
	
    this.onKeyPress = false;
    this.pressKeyCode = 0;
	this.speed = 150;
	
	this.needUp = false;
	this.needDown = false;
	this.needLeft = false;
	this.needRight = false;
};

//---------------------------------------------------------------------------------------------
PlayerController.prototype = Object.create(GCScriptComponent.prototype);
PlayerController.prototype.constructor = PlayerController;

//-----------------------------------------------------------------------------
PlayerController.prototype.Awake = function()
{
    this.registerKey();
};

//---------------------------------------------------------------------------------------------
PlayerController.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
PlayerController.prototype.Start = function()
{
	this.gameObject.root.setColor(cc.c4(255, 0, 0, 125));
};

//-----------------------------------------------------------------------------
PlayerController.prototype.Update = function(deltaTime)
{
	var pos = this.gameObject.root.getPosition();
	var needMove = false;
	
	if (this.needUp) {
		pos.y = pos.y + this.speed * deltaTime;
		needMove = true;
	}
	if (this.needDown) {
		pos.y = pos.y - this.speed * deltaTime;
		needMove = true;
	}
	if (this.needLeft) {
		pos.x = pos.x - this.speed * deltaTime;
		needMove = true;
	}
	if (this.needRight) {
		pos.x = pos.x + this.speed * deltaTime;
		needMove = true;
	}
				
	if (needMove) {
		if (pos.x > 700) pos.x = 700;
		if (pos.x < 0) pos.x = 0;
		if (pos.y > 400) pos.y = 400;
		if (pos.y < 0) pos.y = 0;
		
		this.gameObject.root.setPosition(pos);
	}

	/*	
	if (this.onKeyPress === true)
    {
        var pos = this.gameObject.root.getPosition();
		var needMove = false;
        switch (this.pressKeyCode)
        {
            case cc.KEY['left']:
                pos.x = pos.x - this.speed * deltaTime;
                needMove = true;
                break;
            case cc.KEY['right']:
                pos.x = pos.x + this.speed * deltaTime;
                needMove = true;
                break;
            case cc.KEY['down']:
                pos.y = pos.y - this.speed * deltaTime;
                needMove = true;
                break;
            case cc.KEY['up']:
				if (this.needUp) {
					pos.y = pos.y + this.speed * deltaTime;
					needMove = true;
				}
                break;
        }
    }
	*/
};

PlayerController.prototype.move = function(dire)
{	
	if (dire == 'bomb') {
		this.gameObject.Rotate(10);
		
		return;
	}
	var needArray = {up: false, down: false, left: false, right: false};
	
	console.log(dire);
	if (dire == 'up') {
		needArray['up'] = !this.needUp;
	}
	if (dire == 'down') {
		needArray['down'] = !this.needDown;
	}
	if (dire == 'left') {
		needArray['left'] = !this.needLeft;
	}
	if (dire == 'right') {
		needArray['right'] = !this.needRight;
	}
	
	this.needUp = needArray['up'];
	this.needDown = needArray['down'];
	this.needLeft = needArray['left'];
	this.needRight = needArray['right'];
};

PlayerController.prototype.onKeyDown = function(keycode)
{
    this.onKeyPress = true;
    this.pressKeyCode = keycode;
};

//---------------------------------------------------------------------------------------------
PlayerController.prototype.onKeyUp = function(keycode)
{
    this.onKeyPress = false;
    this.pressKeyCode = 0;
};

//---------------------------------------------------------------------------------------------

var script = new PlayerController();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
