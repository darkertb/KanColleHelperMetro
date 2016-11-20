

//---------------------------------------------------------------------------------------------
//  GCResourceManager : GCEventTarget
//---------------------------------------------------------------------------------------------
function GCResourceManager()
{
    if (GCResourceManager.prototype._SingletonInstance)
    {
        return GCResourceManager.prototype._SingletonInstance;
    }
    GCResourceManager.prototype._SingletonInstance = this;
    
    GCEventTarget.call(this);
    
    this.resources = [];
    this.loadCallback = null;
    this.progressCallback = null;
    this.tempAnimatorCollada = null;
    this.loadCount = 0;
};

//---------------------------------------------------------------------------------------------
GCResourceManager.prototype = Object.create(GCEventTarget.prototype);
GCResourceManager.prototype.constructor = GCResourceManager;

//---------------------------------------------------------------------------------------------
GCResourceManager.prototype.Terminate = function()
{
    GCResourceManager.prototype._SingletonInstance = null;
};

////---------------------------------------------------------------------------------------------
//GCResourceManager.prototype.Load = function(filepath, name, onload, onprogress)
//{
//    if (!name)
//    {
//        name = filepath;
//    }
//    
//    if (this.resources[name])
//    {
//        if (onload)
//        {
//            onload(this.resources[name]);
//        }
//        return this.resources[name];
//    }
//    
//    var ext = GetFileExt(filepath).toLowerCase();
//    var object = undefined;
//    
//    switch (ext)
//    {
//        case "bmp":
//        case "jpg":
//        case "png":
//        {
//            this.loadCount++;
//            
//            object = THREE.ImageUtils.loadTexture(filepath, undefined, 
//                function(texture) 
//                {
//                    if (onload)
//                    {
//                        onload(texture);
//                    }
//                    GCResourceManager().loadCount--;
//                }, 
//                function(message)
//                {
//                    console.log("Load texture error! message = %s", message);
//                    GCResourceManager().loadCount--;
//                });
//            
//        }
//            break;
//        case "dds":
//        {
//            this.loadCount++;
//            
//            object = THREE.ImageUtils.loadCompressedTexture(filepath, undefined, 
//                function(texture) 
//                {
//                    if (onload)
//                    {
//                        onload(texture);
//                    }
//                    GCResourceManager().loadCount--;
//                }, 
//                function(message)
//                {
//                    console.log("Load texture error! message = %s", message);
//                    GCResourceManager().loadCount--;
//                });
//        }
//            break;
//        case "dae": //  need ColladaLoader.js
//        {
//            this.loadCount++;
//            object = new GCGameObject();
//            var animator = new GCAnimatorCollada();
//            
//            object.AddComponent(animator);
//            
//            var loader = new THREE.ColladaLoader();
//            loader.options.convertUpAxis = true;
//            
//            loader.load(filepath, 
//                function(collada) 
//                {
//                    animator = GCAnimatorColladaBuilder(animator, collada);
//                    object.root = animator.scene;
//                    if (onload)
//                    {
//                        onload(object, animator);
//                    }
//                    GCResourceManager().loadCount--;
//                }, 
//                function(args) 
//                {
//                    if (onprogress)
//                    {
//                        args.filepath = filepath;
//                        onprogress(args);
//                    }
//                });
//            
//        }
//            break;
//        case "obj":
//        {
//            this.loadCount++;
//            object = new GCGameObject();
//            
//            var loader = new THREE.OBJLoader();
//            loader.addEventListener('load', 
//                function(event)
//                {
//                    object.root = event.content;
//                    if (onload)
//                    {
//                        onload(object, object.root);
//                    }
//                    GCResourceManager().loadCount--;
//                });
//            
//            loader.load(filepath);
//        }
//            break;
//        case "js":
//        {
//            //var loader = new THREE.JSONLoader(); //THREE.BinaryLoader( true );
//            //loader.load(filepath, callback);
//            alert("GCResourceManager use LoadJSON or LoadBinary to load [" + filepath + "]!");
//        }
//            break;
//        default:
//            break;
//    }
//    
//    if (!object)
//    {
//        alert("GCResourceManager Load [" + filepath + "] failed!");
//        return undefined;
//    }
//    
//    this.resources[name] = object;
//    return object;
//};

////---------------------------------------------------------------------------------------------
//GCResourceManager.prototype.Unload = function(name)
//{
//    var obj = this.resources[name];
//    if (!obj)
//    {
//        alert("GCResourceManager cannt Unload [" + name + "].");
//        return;
//    }
//    
//    delete this.resources[name];
//};

//---------------------------------------------------------------------------------------------
GCResourceManager.prototype.AddPrefab = function(object, name)
{
    if (!name)
    {
        if (object instanceof GCNameObject)
        {
            name = object.GetName();
        }
        else
        {
            alert("GCResourceManager AddPrefab failed! unknow Name.");
            return;
        }
    }
    
    this.resources[name] = object;
};

//---------------------------------------------------------------------------------------------
GCResourceManager.prototype.GetData = function(name, bClone)
{
    var obj = this.resources[name];
    if (!obj)
    {
        //alert("GCResourceManager cannt get data [" + name + "].");
        return undefined;
    }
    
    if (bClone)
    {
        if (obj instanceof GCGameObject)
        {
            var cloneObj = obj.clone();
            //cloneObj.root = CloneObject(obj.root);    // clone cocos2d的物件會有問題...
            
            return cloneObj;
        }
        else
        {
            return CloneObject(obj);
        }
    }
    
    return obj;
};

//---------------------------------------------------------------------------------------------
GCResourceManager.prototype.IsLoading = function()
{
    return (this.loadCount > 0);
};

//---------------------------------------------------------------------------------------------