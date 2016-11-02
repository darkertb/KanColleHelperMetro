

////---------------------------------------------------------------------------------------------
//function GCAnimatorColladaBuilder(component, collada)
//{
//    if (component == undefined)
//    {
//        component = new GCAnimatorCollada();
//    }
//    
//    component.scene = collada.scene;
//    component.collada = collada;
//    
//    for (var i in collada.skins)
//    {
//        component.skins[i] = collada.skins[i];
//    }
//    
//    var animHandler = THREE.AnimationHandler;
//    for (var i in collada.animations)
//    {
//        var animation = collada.animations[i];
//        if (!animation.initialized)
//        {
//            animHandler.add(animation);
//        }
//        
//        var kfAnimation = new THREE.KeyFrameAnimation(animation.node, animation.name);
//        kfAnimation.timeScale = 1;
//        component.animations[kfAnimation.data.name] = kfAnimation;
//    }
//    
//    return component;
//};

////---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//  GCSequence : GCNameObject
//---------------------------------------------------------------------------------------------
function GCSequence()
{
    GCNameObject.call(this);
    
    this.actions = [];
    this.target = null;
};

//---------------------------------------------------------------------------------------------
GCSequence.prototype = Object.create(GCNameObject.prototype);
GCSequence.prototype.constructor = GCSequence;

//---------------------------------------------------------------------------------------------
GCSequence.prototype.GetTarget = function()
{
    return this.target;
};

//---------------------------------------------------------------------------------------------
GCSequence.prototype.SetTarget = function(target)
{
    this.target = target;
};

//---------------------------------------------------------------------------------------------
GCSequence.prototype.AddAction = function(action)
{
    this.actions.push(action);
};

//---------------------------------------------------------------------------------------------
GCSequence.prototype.RemoveAction = function(action)
{
    var i = this.actions.indexOf(action);
    if (i != -1)
    {
        this.actions.splice(i, 1);
    }
};

//---------------------------------------------------------------------------------------------
GCSequence.prototype.RemoveAllActions = function()
{
    this.actions = [];
};

//---------------------------------------------------------------------------------------------
GCSequence.prototype.GetActionCount = function()
{
    return this.actions.length;
};

//---------------------------------------------------------------------------------------------
GCSequence.prototype.GetActionAt = function(i)
{
    return this.actions[i];
};

//---------------------------------------------------------------------------------------------
GCSequence.prototype.Play = function()
{
    if (!this.target)
    {
        return;
    }
    
    for (var i in this.actions)
    {
        var action = this.actions[i];
        if (action)
        {
            this.target.runAction(action);
        }
    }
};

//---------------------------------------------------------------------------------------------
GCSequence.prototype.Stop = function()
{
    if (!this.target)
    {
        return;
    }
    
    for (var i in this.actions)
    {
        var action = this.actions[i];
        if (action && !action.isDone())
        {
            this.target.stopAction(action);
        }
    }
};

//---------------------------------------------------------------------------------------------
GCSequence.prototype.IsPlaying = function()
{
    for (var i in this.actions)
    {
        var action = this.actions[i];
        if (action && !action.isDone())
        {
            return true;
        }
    }
    
    return false;
};

//---------------------------------------------------------------------------------------------