//---------------------------------------------------------------------------------------------
//  GameScene : GCFSMState
//---------------------------------------------------------------------------------------------
function GameScene(fileName)
{
    GCFSMState.call(this, fileName);
    
    this.bLoading = false;
    this.bCreate = false;
    this.layer = null;
    this.manager = null;
    this.fileName = fileName;
    this.sceneJson = [];
    this.bFirst = true;
    this.particleManager = null;
};

//---------------------------------------------------------------------------------------------
GameScene.prototype = Object.create(GCFSMState.prototype);
GameScene.prototype.constructor = GameScene;

//---------------------------------------------------------------------------------------------
GameScene.prototype.DoFirstRun = function()
{
    this.sceneJson = EditorParser().GetSceneByName(this.fileName);
    var _ressources = [];
    var index = 0;
    var size = this.sceneJson.res.length;
    for (var i=0;i<size;i++)
    {
        var data = this.sceneJson.res[i];
        _ressources[index] = {};
        _ressources[index].type = data.type;
        _ressources[index].src = data.src;
        index++;
    }
    
    size = this.sceneJson.anim.length;
    for (var i=0;i<size;i++)
    {
        var data = this.sceneJson.anim[i];
        _ressources[index] = {};
        _ressources[index].type = data.type;
        _ressources[index].src = data.src;
        index++;
    }
    
    size = this.sceneJson.sound.length;
    for (var i=0;i<size;i++)
    {
        var data = this.sceneJson.sound[i];
        _ressources[index] = {};
        _ressources[index].type = data.type;
        _ressources[index].src = data.src.split(".")[0];
        index++;
    }
    
    size = this.sceneJson.js.length;
    var d = document;
    for (var i=0;i<size;i++)
    {
        var data = this.sceneJson.js[i];
        var s = d.createElement('script');
        s.async = false;
        s.src = data.src;
        d.body.appendChild(s);
    }

    var _this = this;
    cc.Loader.shareLoader().resourceCount = 0;
    cc.Loader.shareLoader().loadedResourceCount = 0;
    cc.Loader.shareLoader().onloading = function ()
    {
        cc.LoaderScene.shareLoaderScene().draw();
    };
    cc.Loader.shareLoader().onload = function ()
    {
      cc.Loader.shareLoader().onload = null;
      cc.Loader.shareLoader().onloading = null;
      _this.CreateObjects();
    };
    cc.Loader.shareLoader().preload(_ressources);

    // create layer
    this.layer = cc.Layer.create();

    // create GameObjectManager
    this.manager = new GCGameObjectManager(this.layer);
    this.manager.SetName("Scene Manager");
    GCFramework().AddGameObjectManager(this.manager);
    
    this.particleManager = new GameParticle();
};

//---------------------------------------------------------------------------------------------
GameScene.prototype.DoRun = function(deltaTime)
{
    if (this.bFirst === true)
    {
        GCPhysicsBox2d().StartSimulate();
        this.bFirst = false;
    }
    this.particleManager.Update(deltaTime);
};

//---------------------------------------------------------------------------------------------
GameScene.prototype.CreateObjects = function()
{
    var size = this.sceneJson.obj.length;
    for (var i=0;i<size;i++)
    {
        var data = this.sceneJson.obj[i];
        if (data.name === "Sound" || data.enable === 0)
            continue;
        
        var obj = new GCGameObject();
        obj.name = data.name;
        if (data.hasOwnProperty("component"))
        {
            var c_size = data.component.length;
            for (var j=0;j<c_size;j++)
            {
                var c_data = data.component[j];
                switch (c_data.type) 
                {
                    case "Sprite":
                        this.CreateSprite(obj, c_data);
                        break;
                    case "Button":
                        this.CreateButton(obj, c_data);
                        break;
                    case "Animation":
                        this.CreateAnimation(obj, c_data);
                        break;
                    case "Script":
                        this.CreateScript(obj, c_data);
                        break;
                    case "PhysicsBox2D":
                        this.CreateBox2D(obj, c_data);
                        break;
                    case "Particle":
                        this.CreateParticle(obj, c_data);
                        break;
                    case "Label":
                        this.CreateLabel(obj, c_data);
                        break;
                }
            }
        }
        this.manager.Add(obj);
    }
    
    this.manager.Update();
    
    for (var i=0;i<size;i++)
    {
        var data = this.sceneJson.obj[i];
        if (data.name === "Sound" || data.enable === 0)
            continue;
        
        if (data.parent === null || data.parent === "")
            continue;
        
        var obj = this.manager.GetGameObjectByName(data.name);
        obj.root.getParent().removeChild(obj.root, false);

        var parent = this.manager.GetGameObjectByName(data.parent);
        parent.root.addChild(obj.root);

        var objPos = obj.root.getPosition();
        var newPos = cc.p(parseInt(objPos.x), -parseInt(objPos.y));
        obj.root.setPosition(newPos);
    }

    var director = cc.Director.getInstance();
    var scene = director.getRunningScene();
    cc.Assert(scene !== null, "scene != NULL");
    scene.addChild(this.layer);
};

//---------------------------------------------------------------------------------------------
GameScene.prototype.CreateSprite = function(obj, data)
{
    var sprite = cc.Sprite.create(data.src);
    sprite.setAnchorPoint(cc.PointZero());
    sprite.setPosition(cc.p(data.posX, data.posY));
    var zOrder = parseInt(data.posZ) * -1;
    sprite.setZOrder(zOrder);
    sprite.setRotation(data.rotate);
    sprite.setScale(data.scaleX, data.scaleY);
    obj.root = sprite;
	
	obj.gameObjectType = 'Sprite';
};

//---------------------------------------------------------------------------------------------
GameScene.prototype.CreateButton = function(obj, data)
{
    var btn = cc.MenuItemImage.create(data.normalImage, data.selectImage, null, null);
    btn.setAnchorPoint(cc.PointZero());
    btn.setPosition(cc.p(parseInt(data.posX), parseInt(data.posY)));
    var zOrder = parseInt(data.posZ) * -1;
    btn.setZOrder(zOrder);
    btn.setRotation(data.rotate);
    btn.setScale(data.scaleX, data.scaleY);
    var mesh = cc.Menu.create(btn);
    mesh.setPosition(cc.PointZero());
    mesh.setRotation(data.rotate);
	mesh.setZOrder(zOrder);
    obj.root = mesh;
	
	obj.gameObjectType = 'Button';
};

//---------------------------------------------------------------------------------------------
GameScene.prototype.CreateScript = function(obj, data)
{
    var script = new GCScriptComponent();
    script.Init(data.src);
    obj.AddComponent(script);
	
	script.src = data.src;
};

//---------------------------------------------------------------------------------------------
GameScene.prototype.CreateAnimation = function(obj, data)
{
    var anim = GCAnimatorXMLBuilder(obj.root, data.src, "Data/Animation/");
    obj.AddComponent(anim);
    
    var animator = obj.GetComponent("GCAnimator");
    animator.PlayAnimation("Idle", true);	
	
	obj.gameObjectType = 'Animation';
};

//---------------------------------------------------------------------------------------------
GameScene.prototype.CreateBox2D = function(obj, data)
{
    var bodyDef = new b2BodyDef();
    switch (data.bodyType) 
    {
        case "kinematic":
            bodyDef.type = b2Body.b2_kinematicBody;
            break;
        case "dynamic":
            bodyDef.type = b2Body.b2_dynamicBody;
            break;
        case "static":
            bodyDef.type = b2Body.b2_staticBody;
            break;
    }
    var root = obj.root;
    var width = parseInt(data.width) / 2;
    var height = parseInt(data.height) / 2;
    if (data.shapeType === "circle")
    {
        height = width;
    }
    
    var posX = parseInt(root.getPosition().x) + parseInt(data.posX) + width;
    var posY = parseInt(root.getPosition().y) + parseInt(data.posY) + height;
    bodyDef.position.Set(posX, posY);
    bodyDef.angle = -1 * cc.DEGREES_TO_RADIANS(data.rotate);
    bodyDef.userData = new GCPhysicsUserData(obj, obj.root, width, height);
    var body = GCPhysicsBox2d().GetWorld().CreateBody(bodyDef);
    
    // Define another box shape for our dynamic body.
    var dynamicBox;
    if (data.shapeType === "circle")
    {
        dynamicBox = new b2CircleShape(width);
    }
    else
    {
        dynamicBox = new b2PolygonShape();
        dynamicBox.SetAsBox(width, height);
    }
    
    // Define the dynamic body fixture.
    var fixtureDef = new b2FixtureDef();
    fixtureDef.shape = dynamicBox;
    fixtureDef.density = 1.0;
    fixtureDef.friction = 0.3;
//    fixtureDef.filter.categoryBits = CollisionFlag.ENEMY;
//    fixtureDef.filter.maskBits = CollisionFlag.SCENE|CollisionFlag.PLAYER|CollisionFlag.OBJECT;
    body.CreateFixture(fixtureDef);
    
    var box2DComponent = new GCBox2dComponent(body);
    obj.AddComponent(box2DComponent);
};

//---------------------------------------------------------------------------------------------
GameScene.prototype.CreateParticle = function(obj, data)
{
    var particleComponent = new GCParticleComponent(data);
    obj.AddComponent(particleComponent);
	
	obj.gameObjectType = 'Particle';
};

//---------------------------------------------------------------------------------------------
GameScene.prototype.CreateLabel = function(obj, data)
{

	var label1 = cc.LabelTTF.create(data.text, "Microsoft Yahei", data.fontSize);  
	label1.setPosition(cc.p(parseInt(data.posX), parseInt(data.posY)));  
	
	var zOrder = parseInt(data.posZ) * -1;
    label1.setZOrder(zOrder);
	
	label1.setColor(cc.c4(data.r, data.g, data.b, data.a));
	
    label1.setRotation(data.rotate);
	
    label1.setScale(data.scaleX, data.scaleY);
	
	obj.root = label1;
		
	var gcLabel = new GCLabel(label1);
	obj.AddComponent(gcLabel);
	
	obj.gameObjectType = 'Label';
};

//---------------------------------------------------------------------------------------------
GameScene.prototype.DoPostLastRun = function()
{
    cc.AudioEngine.getInstance().stopBackgroundMusic(true);
    this.particleManager.Terminate();
    GCPhysicsBox2d().StopSimulate();

    if (this.layer.getParent())
    {
        this.layer.removeFromParentAndCleanup(true);
    }
    this.layer = null;
    
    GCFramework().RemoveGameObjectManager(this.manager);
    this.manager = null;
};

//---------------------------------------------------------------------------------------------
