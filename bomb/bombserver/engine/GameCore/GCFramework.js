

//---------------------------------------------------------------------------------------------
//  GCFramework : GCEventTarget
//---------------------------------------------------------------------------------------------
function GCFramework()
{
    if (GCFramework.prototype._SingletonInstance)
    {
        return GCFramework.prototype._SingletonInstance;
    }
    GCFramework.prototype._SingletonInstance = this;
    
    GCEventTarget.call(this);
    
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.FPSLimit = 60;
    this.deltaTime = 0;
    this.autoResize = false;
    
    this.renderViews = [];
    this.gameObjectManagers = [];
};

//---------------------------------------------------------------------------------------------
GCFramework.prototype = Object.create(GCEventTarget.prototype);
GCFramework.prototype.constructor = GCFramework;

//---------------------------------------------------------------------------------------------
GCFramework.prototype.Init = function(width, height)
{
    this.width = width;
    this.height = height;
    
    if (this.Init.arguments.length < 2)
    {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
    
    // Create Singleton Managers
    new GCEventManager();
    new GCResourceManager();
    
//    this.CreateRenderer();
//    this.CreateScene();
    this.CreateGameObject();
};

//---------------------------------------------------------------------------------------------
GCFramework.prototype.Terminate = function()
{
    this.Stop();
    //...
    
    // Terminate Signleton Managers
    GCResourceManager().Terminate();
    GCEventManager().Terminate();
    
    GCFramework.prototype._SingletonInstance = null;
};

////---------------------------------------------------------------------------------------------
//GCFramework.prototype.CreateRenderer = function()
//{

//};

////---------------------------------------------------------------------------------------------
//GCFramework.prototype.CreateScene = function()
//{
////    GCPhysics().CreateScene();
////    var physScene = GCPhysics().scene;
////    
////    var view = new GCRenderView(physScene);
////    view.SetName("Default 3D View");
////    this.AddRenderView(view);
////    
////    var camera = new THREE.OrthographicCamera(-this.width*0.5, this.width*0.5, this.height*0.5, -this.height*0.5, -1000, 1000);
////    view = new GCRenderView(undefined, camera);
////    view.clearColorBuffer = false;
////    view.clearDepthBuffer = true;
////    view.clearStencilBuffer = true;
////    view.SetName("Default 2D View");
////    this.AddRenderView(view);
//};

//---------------------------------------------------------------------------------------------
GCFramework.prototype.CreateGameObject = function()
{
    var manager = new GCGameObjectManager();
    manager.SetName("Default Manager");
    this.AddGameObjectManager(manager);
};

////---------------------------------------------------------------------------------------------
//GCFramework.prototype.AddRenderView = function(view)
//{
//    if (!view || !(view instanceof GCRenderView))
//    {
//        return;
//    }

//    if (this.renderViews.indexOf(view) == -1)
//    {
//        this.renderViews.push(view);
//    }
//};

////---------------------------------------------------------------------------------------------
//GCFramework.prototype.GetRenderViewCount = function()
//{
//    return this.renderViews.length;
//};

////---------------------------------------------------------------------------------------------
//GCFramework.prototype.GetRenderViewAt = function(i)
//{
//    return this.renderViews[i];
//};

////---------------------------------------------------------------------------------------------
//GCFramework.prototype.GetRenderViewByName = function(name)
//{
//    for (var i in this.renderViews)
//    {
//        if (this.renderViews[i].GetName() == name)
//        {
//            return this.renderViews[i];
//        }
//    }
//    
//    return null;
//};

////---------------------------------------------------------------------------------------------
//GCFramework.prototype.RemoveRenderView = function(view)
//{
//    if (!view || !(view instanceof GCRenderView))
//    {
//        return;
//    }
//    
//    var i = this.renderViews.indexOf(view);
//    if (i != -1)
//    {
//        this.renderViews.splice(i, 1);
//    }
//};

//---------------------------------------------------------------------------------------------
GCFramework.prototype.AddGameObjectManager = function(manager)
{
    if (!manager || !(manager instanceof GCGameObjectManager))
    {
        return;
    }
    
    if (this.gameObjectManagers.indexOf(manager) == -1)
    {
        this.gameObjectManagers.push(manager);
    }
};

//---------------------------------------------------------------------------------------------
GCFramework.prototype.GetGameObjectManagerCount = function()
{
    return this.gameObjectManagers.length;
};

//---------------------------------------------------------------------------------------------
GCFramework.prototype.GetGameObjectManagerAt = function(i)
{
    return this.gameObjectManagers[i];
};

//---------------------------------------------------------------------------------------------
GCFramework.prototype.GetGameObjectManagerByName = function(name)
{
    for (var i in this.gameObjectManagers)
    {
        if (this.gameObjectManagers[i].GetName() == name)
        {
            return this.gameObjectManagers[i];
        }
    }
    
    return null;
};

//---------------------------------------------------------------------------------------------
GCFramework.prototype.GetGameScene = function(name)
{
	var manager = this.GetGameObjectManagerByName("Default Manager");

    for (var i in manager.gameObjects[0].components.GameScene)
    {
        if (manager.gameObjects[0].components.GameScene[i].name == name)
        {
            return manager.gameObjects[0].components.GameScene[i];
        }
    }
    
    return null;
};

//---------------------------------------------------------------------------------------------
GCFramework.prototype.RemoveGameObjectManager = function(manager)
{
    if (!manager || !(manager instanceof GCGameObjectManager))
    {
        return;
    }
    
    var i = this.gameObjectManagers.indexOf(manager);
    if (i != -1)
    {
        manager.Terminate();
        this.gameObjectManagers.splice(i, 1);
    }
};

//---------------------------------------------------------------------------------------------
GCFramework.prototype.ShowStatus = function(bShow)
{
    var director = cc.Director.getInstance();
    director.setDisplayStats(bShow);
};

//---------------------------------------------------------------------------------------------
GCFramework.prototype.SetMaxFPS = function(fps)
{
    if (fps <= 0)
    {
        this.FPSLimit = 0;
        var director = cc.Director.getInstance();
        director.setAnimationInterval(0);
    }
    else
    {
        this.FPSLimit = fps;
        var director = cc.Director.getInstance();
        director.setAnimationInterval(1.0/fps);
    }
};

//---------------------------------------------------------------------------------------------
GCFramework.prototype.Run = function()
{
    this.Stop();
    
    this.deltaTime = 0;
    var director = cc.Director.getInstance();
    director.getScheduler().scheduleUpdateForTarget(this, 0, false);
};

//---------------------------------------------------------------------------------------------
GCFramework.prototype.Stop = function()
{
    var director = cc.Director.getInstance();
    director.getScheduler().unscheduleUpdateForTarget(this);
};

//---------------------------------------------------------------------------------------------
GCFramework.prototype.OnIdle = function(deltaTime)
{
    this.deltaTime = deltaTime;
    
    for (var i in this.gameObjectManagers)
    {
        this.gameObjectManagers[i].Update(deltaTime);
        this.gameObjectManagers[i].FixedUpdate(deltaTime);
    }
};

//---------------------------------------------------------------------------------------------
// cc.Scheduler.scheduleUpdateForTarget callback
GCFramework.prototype.update = function(deltaTime)
{
    this.OnIdle(deltaTime);
};

//---------------------------------------------------------------------------------------------
GCFramework.prototype.GetAutoResize = function()
{
    return this.autoResize;
};

//---------------------------------------------------------------------------------------------
GCFramework.prototype.SetAutoResize = function(bAutoResize)
{
    if (this.autoResize != bAutoResize)
    {
        this.autoResize = bAutoResize;
        if (bAutoResize)
        {
            GCEventManager().AddEventListener("resize", this.AdjustSizeForWindow, this);
            this.AdjustSizeForWindow();
        }
        else
        {
            GCEventManager().RemoveEventListener("resize", this.AdjustSizeForWindow, this);
        }
    }
};

//---------------------------------------------------------------------------------------------
GCFramework.prototype.AdjustSizeForWindow = function()
{
    var margin = document.documentElement.clientWidth - document.body.clientWidth;
    if (document.documentElement.clientWidth < cc.originalCanvasSize.width) {
        cc.canvas.width = cc.originalCanvasSize.width;
    } else {
        cc.canvas.width = document.documentElement.clientWidth - margin;
    }
    if (document.documentElement.clientHeight < cc.originalCanvasSize.height) {
        cc.canvas.height = cc.originalCanvasSize.height;
    } else {
        cc.canvas.height = document.documentElement.clientHeight - margin;
    }

    var xScale = cc.canvas.width / cc.originalCanvasSize.width;
    var yScale = cc.canvas.height / cc.originalCanvasSize.height;
    if (xScale > yScale) {
        xScale = yScale;
    }
    cc.canvas.width = cc.originalCanvasSize.width * xScale;
    cc.canvas.height = cc.originalCanvasSize.height * xScale;
    var parentDiv = document.getElementById("Cocos2dGameContainer");
    if (parentDiv) {
        parentDiv.style.width = cc.canvas.width + "px";
        parentDiv.style.height = cc.canvas.height + "px";
    }
    cc.renderContext.translate(0, cc.canvas.height);
    cc.renderContext.scale(xScale, xScale);
    cc.Director.getInstance().setContentScaleFactor(xScale);
};

//---------------------------------------------------------------------------------------------