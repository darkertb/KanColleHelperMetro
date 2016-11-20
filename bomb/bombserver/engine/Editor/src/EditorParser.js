

//---------------------------------------------------------------------------------------------
//  EditorParser
//---------------------------------------------------------------------------------------------
function EditorParser()
{
    if (EditorParser.prototype._SingletonInstance)
    {
        return EditorParser.prototype._SingletonInstance;
    }
    EditorParser.prototype._SingletonInstance = this;
    
    this.jsons = [];
    this.sceneJsons = {};
    this.gameObject = null;
    this.sceneCount = 0;
    this.loadedSceneCount = 0;
	
	this.nowScene = '';
};

//---------------------------------------------------------------------------------------------
EditorParser.prototype.Init = function(jsons)
{
    this.jsons = jsons;
    this.sceneCount = this.jsons.scene.length;
    console.log('Start LoadScene!');
    for (var i=0;i<this.sceneCount;i++)
    {
        var data = this.jsons.scene[i];
        this.LoadScene(data.name, data.src);
    }
};

//---------------------------------------------------------------------------------------------
EditorParser.prototype.Get = function()
{
    return this.jsons;
};

//---------------------------------------------------------------------------------------------
EditorParser.prototype.LoadScene = function(name, fileName)
{
    var _this = this;
    var _ressources = 
    [
        {type:"plist", src:fileName}
    ];
    cc.Loader.shareLoader().resourceCount = 0;
    cc.Loader.shareLoader().loadedResourceCount = 0;
    cc.Loader.shareLoader().onloading = function ()
    {
        cc.LoaderScene.shareLoaderScene().draw();
    };
    cc.Loader.shareLoader().onload = function ()
    {
        var shareParser = cc.SAXParser.shareParser();
        shareParser.preloadPlist(fileName);
        var text = shareParser.getList(fileName);
        _this.sceneJsons[name] = JSON.parse(text);
		console.log(fileName + ':' + text);
        
        _this.loadedSceneCount = _this.loadedSceneCount + 1;
        if (_this.loadedSceneCount >= _this.sceneCount)
        {
            _this.InitScene();
        }
    };
    cc.Loader.shareLoader().preload(_ressources);
};

//---------------------------------------------------------------------------------------------
EditorParser.prototype.GetSceneByName = function(name)
{
    return this.sceneJsons[name];
};

//---------------------------------------------------------------------------------------------
EditorParser.prototype.InitScene = function()
{
	console.log(this.sceneJsons);
    this.gameObject = new GCGameObject();
    var actor = new GCFSMActor();
    this.gameObject.AddComponent(actor);

    for (var type in this.sceneJsons)
    {
        var state = new GameScene(type);
        actor.AddState(state);
        this.gameObject.AddComponent(state);
    }
    
    var defaultScene = this.jsons.prop.scene;
    this.ChangeScene(defaultScene);
        
    // add to Default Manager
    var manager = GCFramework().GetGameObjectManagerByName("Default Manager");
    manager.Add(this.gameObject);

    console.log('InitScene complete!');
};

//---------------------------------------------------------------------------------------------
EditorParser.prototype.ChangeScene = function(name)
{
    var actor = this.gameObject.GetComponent("GCFSMActor");
    var state = actor.GetStateByName(name);
    state.levelKeyword = name;
    actor.SetState(name);
	
	this.nowScene = name;
};

//---------------------------------------------------------------------------------------------
EditorParser.prototype.GetNowScene = function(name)
{
	return this.nowScene;
};

//---------------------------------------------------------------------------------------------
