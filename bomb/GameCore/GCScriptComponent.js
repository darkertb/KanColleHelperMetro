

//---------------------------------------------------------------------------------------------
//  GCScriptComponent : GCComponent
//---------------------------------------------------------------------------------------------
function GCScriptComponent()
{
    GCComponent.call(this);
};

//---------------------------------------------------------------------------------------------
GCScriptComponent.prototype = Object.create(GCComponent.prototype);
GCScriptComponent.prototype.constructor = GCScriptComponent;

//---------------------------------------------------------------------------------------------
GCScriptComponent.prototype.Init = function(name)
{
    this.script = GCScriptManager().getScript(name);
    this.keyDelegate = false;
    this.touchDelegate = false;
};

//---------------------------------------------------------------------------------------------
GCScriptComponent.prototype.Awake = function()
{
    if (typeof(this.script) === "undefined")
        return;
    
    this.script.gameObject = this.gameObject;
    this.script.Awake();
    
    var director = cc.Director.getInstance();
    if (this.script.keyDelegate === true)
    {
        director.getKeyboardDispatcher().addDelegate(this);
    }
    if (this.script.touchDelegate === true)
    {
        director.getTouchDispatcher().addTargetedDelegate(this, 0);
    }
};

//---------------------------------------------------------------------------------------------
GCScriptComponent.prototype.Terminate = function()
{
    var director = cc.Director.getInstance();
    if (this.script.keyDelegate === true)
    {
        director.getKeyboardDispatcher().removeDelegate(this);
        this.script.keyDelegate = false;
    }
    if (this.script.touchDelegate === true)
    {
        director.getTouchDispatcher().removeDelegate(this);
        this.script.touchDelegate = false;
    }
    GCComponent.prototype.Terminate.call(this);
};

//---------------------------------------------------------------------------------------------
GCScriptComponent.prototype.Start = function()
{
    if (typeof(this.script) === "undefined")
        return;
    
    this.script.Start();
};

//---------------------------------------------------------------------------------------------
GCScriptComponent.prototype.Update = function(deltaTime)
{
    if (typeof(this.script) === "undefined")
        return;

    this.script.Update(deltaTime);
};

//---------------------------------------------------------------------------------------------
GCScriptComponent.prototype.onKeyDown = function(keycode)
{
    if (typeof(this.script) === "undefined")
        return;

    this.script.onKeyDown(keycode);
};

//---------------------------------------------------------------------------------------------
GCScriptComponent.prototype.onKeyUp = function(keycode)
{
    if (typeof(this.script) === "undefined")
        return;

    this.script.onKeyUp(keycode);
};

//---------------------------------------------------------------------------------------------
GCScriptComponent.prototype.onTouchBegan = function(touch, event)
{
    if (typeof(this.script) === "undefined")
        return false;
    
    return this.script.onTouchBegan(touch, event);
};

//---------------------------------------------------------------------------------------------
GCScriptComponent.prototype.onTouchMoved = function(touch, event)
{
    if (typeof(this.script) === "undefined")
        return;

    this.script.onTouchMoved(touch, event);
};

//---------------------------------------------------------------------------------------------
GCScriptComponent.prototype.onTouchEnded = function(touch, event)
{
    if (typeof(this.script) === "undefined")
        return;

    this.script.onTouchEnded(touch, event);
};

//---------------------------------------------------------------------------------------------
GCScriptComponent.prototype.onTouchCancelled = function(touch, event)
{
    if (typeof(this.script) === "undefined")
        return;

    this.script.onTouchCancelled(touch, event);
};

//---------------------------------------------------------------------------------------------
GCScriptComponent.prototype.OnClick = function(sender)
{
};

//---------------------------------------------------------------------------------------------
GCScriptComponent.prototype.registerKey = function()
{
    this.keyDelegate = true;
};

//---------------------------------------------------------------------------------------------
GCScriptComponent.prototype.registerTouch = function()
{
    this.touchDelegate = true;
};

//---------------------------------------------------------------------------------------------
GCScriptComponent.prototype.registerButton = function()
{
    var mesh = this.gameObject.root;
    if (mesh instanceof cc.Menu === false)
        return;
    
    var children = mesh.getChildren();    
    var btn = children[0];
    btn.initWithCallback(this, this.OnClick);
    btn.setAnchorPoint(cc.PointZero());
};

//---------------------------------------------------------------------------------------------

GCScriptComponent.prototype.checkOnTouch = function(location, obj)
{
    var rc = GetRect(obj);
    var pos = cc.p(-rc.size.width/2, -rc.size.height/2);
    rc.origin = cc.pAdd(rc.origin, pos);
    return cc.Rect.CCRectContainsPoint(rc, location);
};


//---------------------------------------------------------------------------------------------

GCScriptComponent.prototype.getObjectByName = function(name)
{
    var objManager = GCFramework().GetGameObjectManagerByName("Scene Manager");
    var targetObj = objManager.GetGameObjectByName(name);
    return targetObj;
};

//---------------------------------------------------------------------------------------------

GCScriptComponent.prototype.playSound = function(name, isloop)
{
    var fullPath = "Data/BGM/" + name;
    cc.AudioEngine.getInstance().playBackgroundMusic(fullPath, isloop);
};

//---------------------------------------------------------------------------------------------

GCScriptComponent.prototype.stopSound = function(isRelease)
{
    cc.AudioEngine.getInstance().stopBackgroundMusic(isRelease);
};

//---------------------------------------------------------------------------------------------

GCScriptComponent.prototype.playParticle = function(pos)
{
    var emitter = this.gameObject.GetComponent("GCParticleComponent");
    if (emitter === null)
        return;
    
    emitter.playParticle(pos);
};

//---------------------------------------------------------------------------------------------

GCScriptComponent.prototype.changeScene = function(nextScene)
{
    EditorParser().ChangeScene(nextScene);
};

//---------------------------------------------------------------------------------------------

GCScriptComponent.prototype.moveScene = function(x, y)
{
    var director = cc.Director.getInstance();
    var scene = director.getRunningScene();
    if (scene === null)
        return;
    
    var pos = scene.getPosition();
    pos.x += x;
    pos.y += y;
    scene.setPosition(pos);
};

//---------------------------------------------------------------------------------------------
