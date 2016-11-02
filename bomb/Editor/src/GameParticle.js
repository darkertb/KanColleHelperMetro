//---------------------------------------------------------------------------------------------
//  GameParticle
//---------------------------------------------------------------------------------------------
function GameParticle()
{
    if (GameParticle.prototype._SingletonInstance)
    {
        return GameParticle.prototype._SingletonInstance;
    }
    GameParticle.prototype._SingletonInstance = this;
    
    this.gameObjects = [];
};

//---------------------------------------------------------------------------------------------
GameParticle.prototype.Terminate = function()
{
    GameParticle.prototype._SingletonInstance = null;
};

//---------------------------------------------------------------------------------------------
GameParticle.prototype.PlayParticle = function(gameObj)
{
    this.gameObjects.push(gameObj);
};

//---------------------------------------------------------------------------------------------
GameParticle.prototype.Update = function(deltaTime)
{
    var temp = [];
    for (var i in this.gameObjects)
    {
        if (!this.gameObjects[i].root.isActive() && this.gameObjects[i].root.getParticleCount() == 0)
        {
            temp.push(this.gameObjects[i]);
        }
    }
    for (var i in temp)
    {
        this.gameObjects.splice(temp[i], 1);
        temp[i].DestroyObject();
    }
};

//---------------------------------------------------------------------------------------------
