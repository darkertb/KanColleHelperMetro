

//---------------------------------------------------------------------------------------------
//  GCGameObjectManager : GCNameObject
//---------------------------------------------------------------------------------------------
function GCGameObjectManager(layer)
{
    GCNameObject.call(this);
    
    this.gameObjects = [];
    this.layer = layer;
    
    this.__gameObjectsAdded = [];
    this.__gameObjectsRemoved = [];
};

//---------------------------------------------------------------------------------------------
GCGameObjectManager.prototype = Object.create(GCNameObject.prototype);
GCGameObjectManager.prototype.constructor = GCGameObjectManager;

//---------------------------------------------------------------------------------------------
GCGameObjectManager.prototype.Terminate = function()
{
    var array = this.gameObjects;
    for (var i in array)
    {
        var gameObj = array[i];
        gameObj.manager = null;
            
        if (this.layer && gameObj.root && gameObj.root.getParent() == this.layer)
        {
            this.layer.removeChild(gameObj.root, true);
        }
            
        gameObj.Terminate();
    }
    
    array = this.__gameObjectsAdded;
    for (var i in array)
    {
        var gameObj = array[i];
        gameObj.manager = null;
            
        if (this.layer && gameObj.root && gameObj.root.getParent() == this.layer)
        {
            this.layer.removeChild(gameObj.root, true);
        }
            
        gameObj.Terminate();
    }
    
    array = this.__gameObjectsRemoved;
    for (var i in array)
    {
        var gameObj = array[i];
        gameObj.manager = null;
            
        if (this.layer && gameObj.root && gameObj.root.getParent() == this.layer)
        {
            this.layer.removeChild(gameObj.root, true);
        }
            
        gameObj.Terminate();
    }
    
    this.gameObjects = [];
    this.__gameObjectsAdded = [];
    this.__gameObjectsRemoved = [];
};

//---------------------------------------------------------------------------------------------
GCGameObjectManager.prototype.GetGameObjectByName = function(name)
{
    for (var i in this.gameObjects)
    {
        if (this.gameObjects[i].GetName() == name)
        {
            return this.gameObjects[i];
        }
    }
};

//---------------------------------------------------------------------------------------------
GCGameObjectManager.prototype.Add = function(gameObj)
{
    if (!gameObj || !(gameObj instanceof GCGameObject))
    {
        return;
    }
    
    if (this.gameObjects.indexOf(gameObj) == -1 && this.__gameObjectsAdded.indexOf(gameObj) == -1)
    {
        this.__gameObjectsAdded.push(gameObj);
    }
};

//---------------------------------------------------------------------------------------------
GCGameObjectManager.prototype.Remove = function(gameObj)
{
    if (!gameObj || !(gameObj instanceof GCGameObject))
    {
        return;
    }
    
    var index = this.gameObjects.indexOf(gameObj);
    if (index != -1)
    {
        this.__gameObjectsRemoved.push(gameObj);
    }
};

//---------------------------------------------------------------------------------------------
GCGameObjectManager.prototype.Update = function(deltaTime)
{
    var count = 0;
    for (var i in this.__gameObjectsAdded)
    {
        var gameObj = this.__gameObjectsAdded[i];
        if (this.gameObjects.indexOf(gameObj) == -1)
        {
            this.gameObjects.push(gameObj);
            gameObj.manager = this;
            gameObj.Awake();
            
            if (this.layer && gameObj.root && gameObj.root.getParent() == null)
            {
                this.layer.addChild(gameObj.root);
            }
        }
        count++;
    }
    while (count > 0)
    {
        this.__gameObjectsAdded.pop();
        count--;
    }
    
    for (var i in this.gameObjects)
    {
        // 不直接呼叫gameObjects.Update是因為gameObjects要處理Enable、是否為第一次Update等問題.
        this.gameObjects[i].Run(deltaTime);
    }
    
    count = 0;
    for (var i in this.__gameObjectsRemoved)
    {
        var gameObj = this.__gameObjectsRemoved[i];
        var index = this.gameObjects.indexOf(gameObj);
        if (index != -1)
        {
            this.gameObjects.splice(index, 1);
            gameObj.manager = null;
            
            if (this.layer && gameObj.root && gameObj.root.getParent() == this.layer)
            {
                this.layer.removeChild(gameObj.root, true);
            }
            
            gameObj.Terminate();
        }
        count++;
    }
    while (count > 0)
    {
        this.__gameObjectsRemoved.pop();
        count--;
    }
};

//---------------------------------------------------------------------------------------------
GCGameObjectManager.prototype.FixedUpdate = function(deltaTime)
{
    for (var i in this.gameObjects)
    {
        this.gameObjects[i].FixedUpdate(deltaTime);
    }
};

//---------------------------------------------------------------------------------------------