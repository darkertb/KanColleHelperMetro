

//---------------------------------------------------------------------------------------------
//  GameCreater : GCScriptComponent
//---------------------------------------------------------------------------------------------
function GameCreater()
{
    GCScriptComponent.call(this);
};

//---------------------------------------------------------------------------------------------
GameCreater.prototype = Object.create(GCScriptComponent.prototype);
GameCreater.prototype.constructor = GameCreater;

//-----------------------------------------------------------------------------
GameCreater.prototype.Awake = function()
{
};

//---------------------------------------------------------------------------------------------
GameCreater.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
GameCreater.prototype.Start = function()
{
	
	if (player1 == '')
		this.getObjectByName('character01').root.setVisible(false);
	if (player2 == '')
		this.getObjectByName('character02').root.setVisible(false);
	if (player3 == '')
		this.getObjectByName('character03').root.setVisible(false);
	if (player4 == '')
		this.getObjectByName('character04').root.setVisible(false);

	var SC = nowSCState;
	
	for (var i = 0; i < 10; i++)  {
		for (var y = 0; y < 10; y++)  {
			var cubeState = SC[i][y];
			
			var cubeType;
			
			var cube;
			
			if (i == playerPos[1].x && y == playerPos[1].y) {
				cube = this.getObjectByName('character01');	
				cubeType = 1;
			}
			else if (i == playerPos[2].x && y == playerPos[2].y) {
				cube = this.getObjectByName('character02');	
				cubeType = 2;
			}
			else if (i == playerPos[3].x && y == playerPos[3].y) {
				cube = this.getObjectByName('character03');	
				cubeType = 3;
			}
			else if (i == playerPos[4].x && y == playerPos[4].y) {
				cube = this.getObjectByName('character04');	
				cubeType = 4;
			}
			else if (cubeState == 0)
				continue;
			
			/*
			if (cubeState == 1 || cubeState == 2) {
				cube = this.getObjectByName('character0' + cubeState);		
			}
			*/			
			
			if (cubeState > 10 && cubeState < 20) {
				cube = this.getObjectByName('sceneMaterial_0' + (cubeState - 10)).clone();		
				cube.name = 'cube_' + i + '-' + y;
				cubeType = cubeState;
			}					
			
			var pos = GetRealPosition(i, y, cubeType);			
			cube.SetPosition(pos.x, pos.y);
			if (cubeType >= 1 && cubeType <= 4 && playerHp[cubeType] > 0) {
				this.getObjectByName('text0' + cubeType).SetPosition(pos.x + 35, pos.y + 65);	
			}
		}
	}
};

//-----------------------------------------------------------------------------
GameCreater.prototype.Update = function(deltaTime)
{
};

//---------------------------------------------------------------------------------------------

var script = new GameCreater();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
