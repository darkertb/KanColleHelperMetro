/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var cocos2dApp = cc.Application.extend({
    config:document.querySelector('#cocos2d-html5')['c'],
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        
        this.fileName = "Data/Save/Setting.txt";
        var _ressources = 
        [
           {type:"plist", src:this.fileName}
        ];
        var _this = this;
               
        var _shareParser = cc.SAXParser.shareParser();
        _shareParser.preloadPlist(_this.fileName);
        var text = _shareParser.getList(_this.fileName);
        var jsons = JSON.parse(text);

        this.fileName = jsons.proj;
        _ressources[0].src = jsons.proj;
               
        cc.Loader.shareLoader().onloading = function()
        {
            //cc.LoaderScene.shareLoaderScene().draw();
            console.log('onloading');
        };
        cc.Loader.shareLoader().onload = function()
        {
            _shareParser.preloadPlist(_this.fileName);
            var text = _shareParser.getList(_this.fileName);
            var jsons = JSON.parse(text);

            var parser = new EditorParser();
            parser.Init(jsons);

            new GCScriptManager();

            var propJson = jsons.prop;
            var tag = _this.config['tag'];
            var element = cc.$(tag) || cc.$('#' + tag);
            element.width = propJson.width;
            element.height = propJson.height;            
            cc.setup(tag);

            cc.AudioEngine.getInstance().init("mp3,ogg");

            // create GCFramework for AI/GameLoop Logic
            var director = cc.Director.getInstance();
            new GCFramework();
            GCFramework().Init(director.getWinSize().width, director.getWinSize().height);

            cc.AppController.shareAppController().didFinishLaunchingWithOptions();
        };
       cc.Loader.shareLoader().resourceCount = 0;
       cc.Loader.shareLoader().loadedResourceCount = 0;
       cc.Loader.shareLoader().preload(_ressources);
    },
    applicationDidFinishLaunching:function () {
        // initialize director
        var director = cc.Director.getInstance();
        
        // create a scene. it's an autorelease object
        
        // run
        director.runWithScene(new this.startScene());
        
        GCFramework().SetMaxFPS(this.config['frameRate']);
        GCFramework().ShowStatus(this.config['showFPS']);
        GCFramework().SetAutoResize(this.config['autoResize']);
        
        GCFramework().Run();
        
        if (this.config['box2d'])
        {
            new GCPhysicsBox2d();
            GCPhysicsBox2d().CreateWorld(new b2Vec2(0, -196*1.5));	// setup gravity
            GCPhysicsBox2d().GetWorld().SetContactListener(new GameContactListener());
        }
		
        console.log('applicationDidFinishLaunching!');
        
        return true;
    }
});


var myApp = new cocos2dApp(cc.Scene);
