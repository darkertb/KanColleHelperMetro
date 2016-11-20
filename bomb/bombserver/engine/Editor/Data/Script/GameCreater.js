

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
