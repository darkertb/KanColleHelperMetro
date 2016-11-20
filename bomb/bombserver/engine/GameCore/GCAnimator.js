

//---------------------------------------------------------------------------------------------
//  animation.xml from AnimationPacker
function GCAnimatorXMLBuilder(root, xml, plistDir, component)
{
    if (component == undefined)
    {
        component = new GCAnimator();
    }
	
	//set src
	component.src = xml;
    
    component.SetRoot(root);
    
    var shareParser = cc.SAXParser.shareParser();
    var text = shareParser.getList(xml);
    var dict = XMLToDict(text);
    
    // load plist
    var plists = dict["plists"][0]["plist"];
    for (var i in plists)
    {
        var plist = plists[i];
        //path = cc.FileUtils.getInstance().fullPathFromRelativePath(plist);
        if (plistDir != undefined)
        {
            cc.SpriteFrameCache.getInstance().addSpriteFrames(plistDir + plist);
        }
        else
        {
            cc.SpriteFrameCache.getInstance().addSpriteFrames(plist);
        }
    }
    
    
    var frameCache = cc.SpriteFrameCache.getInstance();
    
    var animations = dict["animations"][0]["animation"];
    for (var i in animations)
    {
        var animation = animations[i];
        
        var name = animation["name"][0];
        var delay = parseFloat(animation["delay"][0]);
        var flipX = (animation["flipX"][0] == "true");
        var flipY = (animation["flipY"][0] == "true");
        var frames = animation["spriteFrame"];
        
        var arr = [];
        
        for (var j in frames)
        {
            var spriteFrame = frameCache.getSpriteFrame(frames[j]);
            if (!spriteFrame)
            {
                cc.log("cocos2d: cc.AnimationCache: Animation '" + name + "' refers to frame '" + spriteFrameName
                    + "' which is not currently in the cc.SpriteFrameCache. This frame will not be added to the animation.");
                continue;
            }
            var animFrame = new cc.AnimationFrame();
            animFrame.initWithSpriteFrame(spriteFrame, 1, null);
            arr.push(animFrame);
        }
        var ccAnimation = new cc.Animation();
        ccAnimation.initWithAnimationFrames(arr, delay, 1);
        ccAnimation.setRestoreOriginalFrame(false);//true);
        cc.AnimationCache.getInstance().addAnimation(ccAnimation, name);
        
        var action = cc.Animate.create(ccAnimation);
        
        var seq = new GCSequence();
        seq.SetName(name);
        seq.SetTarget(root);
        seq.AddAction(action);
        
        component.AddSequence(seq);
    }
    
    return component;
};

//---------------------------------------------------------------------------------------------
//  animation.plist from self edit??
function GCAnimatorPlistBuilder(root, plists, names, component)
{
    if (component == undefined)
    {
        component = new GCAnimator();
    }
    
    component.SetRoot(root);

    var animCache = cc.AnimationCache.getInstance();
    for (var i in plists)
    {
        animCache.addAnimationsWithFile(plists[i]);
    }
    
    for (var i in names)
    {
        var name = names[i];
        var animation = animCache.getAnimation(name);
        var action = cc.Animate.create(animation);
        
        var seq = new GCSequence();
        seq.SetName(name);
        seq.SetTarget(root);
        seq.AddAction(action);
        
        component.AddSequence(seq);
    }
    
    return component;
};

//---------------------------------------------------------------------------------------------
//  animationInfos format
//      animationInfos.name = animation name
//      animationInfos.delay = frame delay time
//      animationInfos.frames = frame file names
//
//  var animator = GCAnimatorFrameBuilder(root, 
//      [
//          {name:"idle", delay:0.1, frames:["player_idle01.png", "player_idle02.png", "player_idle03.png"]}, 
//          {name:"run", delay:0.1, frames:["player_run01.png", "player_run02.png", "player_run03.png"]}
//      ]);
function GCAnimatorFrameBuilder(root, animationInfos, component)
{
    if (component == undefined)
    {
        component = new GCAnimator();
    }
    
    component.SetRoot(root);

    var animCache = cc.AnimationCache.getInstance();
    
    for (var i in animationInfos)
    {
        var animationInfo = animationInfos[i];
        
        var name = animationInfo.name;
        var delay = (animationInfo.delay != undefined) ? animationInfo.delay : 0.1;
        var frames = animationInfo.frames;
        
        var animation = cc.Animation.create();
        
        for (var j in frames)
        {
            animation.addSpriteFrameWithFileName(frames[j]);
        }
        animation.setDelayPerUnit(delay);
        animation.setRestoreOriginalFrame(true);
        
        var action = cc.Animate.create(animation);
        
        var seq = new GCSequence();
        seq.SetName(name);
        seq.SetTarget(root);
        seq.AddAction(action);
        
        component.AddSequence(seq);
    }
    
    
    return component;
};

//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//  GCAnimator : GCComponent
//---------------------------------------------------------------------------------------------
function GCAnimator()
{
    GCComponent.call(this);
    
    this.root = null;
    this.sequences = [];    // map of GCSequence
    this.curAnimation = null;
    this.curAnimationName = null;
    this.bLoop = false;
	
	//動畫播放完畢時的callback
	this.onAnimationEnd = null;
	
	//紀錄用，為了Clone方便
	this.src = '';
};

//---------------------------------------------------------------------------------------------
GCAnimator.prototype = Object.create(GCComponent.prototype);
GCAnimator.prototype.constructor = GCAnimator;

//---------------------------------------------------------------------------------------------
GCAnimator.prototype.Awake = function()
{
    
};

//---------------------------------------------------------------------------------------------
GCAnimator.prototype.Terminate = function()
{
    GCComponent.prototype.Terminate.call(this);
    
    this.root = null;
    this.sequences = [];    // map of GCSequence
    this.curAnimation = null;
    this.curAnimationName = null;
};

//---------------------------------------------------------------------------------------------
GCAnimator.prototype.Start = function()
{
    //--
    
    this.curAnimationName = null;
    this.curAnimation = null;
    this.sequences = [];

    //map of GCSequence

    //--
};

//---------------------------------------------------------------------------------------------
GCAnimator.prototype.Update = function(deltaTime)
{
    if (this.curAnimation && !this.curAnimation.IsPlaying())
    {
        this.DispatchEvent({type:'EOS', name:this.curAnimationName});
        if (this.bLoop)
        {
            this.PlayAnimation(this.curAnimationName, this.bLoop);
        }
        else
        {
            var name = this.curAnimationName;
			    //動畫播放完畢
            this.StopAnimation();
			
		    if (this.onAnimationEnd && this.onAnimationEnd != null && typeof this.onAnimationEnd != 'undefined') {
			    this.onAnimationEnd(name);
          }
        }
    }
};

//---------------------------------------------------------------------------------------------
GCAnimator.prototype.GetRoot = function()
{
    return this.root;
};

//---------------------------------------------------------------------------------------------
GCAnimator.prototype.SetRoot = function(root)
{
    this.root = root;
};

//---------------------------------------------------------------------------------------------
GCAnimator.prototype.OnAnimationEndListener = function(cb)
{
    this.onAnimationEnd = cb;
};

//---------------------------------------------------------------------------------------------
GCAnimator.prototype.Reset = function()
{
    if (this.root)
    {
        this.root.stopAllActions();
    }
    this.curAnimation = null;
    this.curAnimationName = null;
};

//---------------------------------------------------------------------------------------------
GCAnimator.prototype.IsPlaying = function()
{
    if (this.curAnimation && this.curAnimation.IsPlaying())
    {
        return true;
    }
    
    return false;
};

//---------------------------------------------------------------------------------------------
GCAnimator.prototype.AddSequence = function(seq)
{
    var name = seq.GetName();
    if (name == undefined || name == "" || this.sequences[name] != undefined)
    {
        cc.Assert(false, "AddSequence failed!");
        return;
    }
    
    this.sequences[name] = seq;
};

//---------------------------------------------------------------------------------------------
GCAnimator.prototype.RemoveSequence = function(seq)
{
    var name = seq.GetName();
    delete this.sequences[name];
};

//---------------------------------------------------------------------------------------------
GCAnimator.prototype.RemoveSequences = function()
{
    this.sequences = [];
};

//---------------------------------------------------------------------------------------------
GCAnimator.prototype.GetSequence = function(name)
{
    if (name == undefined || name == "")
    {
        return this.sequences;
    }
    return this.sequences[name];
};

//---------------------------------------------------------------------------------------------
GCAnimator.prototype.GetCurAnimation = function()
{
    return this.curAnimation;
};

//---------------------------------------------------------------------------------------------
GCAnimator.prototype.GetCurAnimationName = function()
{
    return this.curAnimationName;
};

//---------------------------------------------------------------------------------------------
GCAnimator.prototype.PlayAnimation = function(name, bLoop)
{
    var animation = this.GetSequence(name);
    if (!animation)
    {
        console.log("Cannt PlayAnimation %s", name);
        return;
    }
    
    if (this.IsPlaying())
    {
        this.StopAnimation();
    }
    
    this.bLoop = (bLoop == undefined) ? false : bLoop;
    this.curAnimation = animation;
    this.curAnimationName = name;
    this.curAnimation.Play();
};

//---------------------------------------------------------------------------------------------
GCAnimator.prototype.StopAnimation = function()
{
    if (this.curAnimation)
    {
        this.curAnimation.Stop();
        this.curAnimation = null;
        this.curAnimationName = null;
    }
};

////---------------------------------------------------------------------------------------------
//GCAnimator.prototype.clone = function()
//{
//    var component = new GCAnimator();
//    
//    component.name = this.name;
//    
////    component.curAnimation = this.curAnimation;
////    component.curAnimationName = this.curAnimationName;
////    component.bLoop = this.bLoop;
////    
////    component.accumTime = this.accumTime;
////    component.durationTime = this.durationTime;
////    
////    if (this.isMD2Complex)
////    {
////        var character = new THREE.MD2CharacterComplex();
////        character.shareParts(this.character);
////        component.character = character;
////    }
////    else
////    {
////        var character = new THREE.MD2Character();
////        character.shareParts(this.character);
////        component.character = character;
////    }

////    component.isMD2Complex = (component.character instanceof THREE.MD2CharacterComplex) ? true : false;
////    component.scene = component.character.root;

//    return component;
//};

//---------------------------------------------------------------------------------------------