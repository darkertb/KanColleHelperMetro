//---------------------------------------------------------------------------------------------
//  WaitingHandler : GCScriptComponent
//---------------------------------------------------------------------------------------------
function WaitingHandler()
{
    GCScriptComponent.call(this);
	
	this.readySet = false;
	this.playerSet = false;
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
	this.getObjectByName('Ready_btn').root.setVisible(false);
};

//-----------------------------------------------------------------------------
WaitingHandler.prototype.Update = function(deltaTime)
{
	if (isConnected) {
		/*
		if (!this.playerSet) {
			console.log(playerNo);
			
			var player = this.getObjectByName('character0' + playerNo);			
			player.SetPosition(190, 150);
			
			this.getObjectByName('loading_txt').SetPosition(1300, 800);
			
			this.playerSet = true;
		}
		
		if (!this.readySet && playerCount = 2) {
			var otherPlayerName = this.getObjectByName('character0' + (playerNo == 1 ? 2 : 1));
			otherPlayerName.SetPosition(820, 150);
			
			if (playerNo == 1) 
				this.getObjectByName('Ready_btn').root.setVisible(true);
			
			this.readySet = true;
		}
		else if (this.readySet && playerCount < 2) {
			var otherPlayerName = this.getObjectByName('character0' + (playerNo == 1 ? 2 : 1));
			otherPlayerName.SetPosition(1300, 800);
						
			if (playerNo == 1) 
				this.getObjectByName('Ready_btn').root.setVisible(false);
			
			this.readySet = false;
		}
		*/
		
		var chName = 'character0';
		
		if (playerNo == 1 || playerNo == 3)
			chName += '2';
		else
			chName += '1';
			
		this.getObjectByName(chName).root.setVisible(false);
		
		for (var i=1; i<5; i++) {
			if (playerNo != i)
				this.getObjectByName('text0' + i).root.setVisible(false);
		}
		
		if (playerCount > 1 && playerNo == 1) {
			this.getObjectByName('Ready_btn').root.setVisible(true);
		}
	}
};

//---------------------------------------------------------------------------------------------

var script = new WaitingHandler();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
