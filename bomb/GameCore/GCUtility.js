

//// 會導致THREE.min.js裡面發生一個錯誤, 原因不明..., 改到GCEventTarget裡面
//// Ref : http://stackoverflow.com/questions/332422/how-do-i-get-the-name-of-an-objects-type-in-javascript
//Object.prototype.ClassName = function()
//{ 
//    var funcNameRegex = /function (.{1,})\(/;
//    var results = (funcNameRegex).exec((this).constructor.toString());
//    return (results && results.length > 1) ? results[1] : "";
//};

//---------------------------------------------------------------------------------------------
function GetFuncName(func)
{
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec(func.toString());
    return (results && results.length > 1) ? results[1] : alert("undefined ClassName check Constructor");
};

//---------------------------------------------------------------------------------------------
//  "textures/terrain/grasslight-big.jpg" => "jpg"
function GetFileExt(filepath)
{
    return filepath.split('.').pop(); // or var isCompressed = sourceFile.toLowerCase().endsWith( ".dds" );
};

//---------------------------------------------------------------------------------------------
//  "textures/terrain/grasslight-big.jpg" => "grasslight-big.jpg"
function GetFileName(filepath)
{
    return filepath.replace(/^.*[\\\/]/, '');
};

//---------------------------------------------------------------------------------------------
//  "textures/terrain/grasslight-big.jpg" => "grasslight-big"
function GetFileTitle(filepath)
{
    return GetFileName(filepath).split('.')[0];
};

//---------------------------------------------------------------------------------------------
//  "textures/terrain/grasslight-big.jpg" => "textures/terrain/"
function GetFilePath(filepath)
{
    return filepath.split(GetFileName(filepath))[0];
};

////---------------------------------------------------------------------------------------------
//function Sleep(ms)
//{
//    var cur = Date.now();
//    while (Date.now() - cur < ms)
//    {
//    }
//};

//---------------------------------------------------------------------------------------------
function LogOnScreen(text, args)
{
    for (var i = 1; i < LogOnScreen.arguments.length; i++)
    {
        text += LogOnScreen.arguments[i];
    }
    //http://www.diveintojavascript.com/projects/javascript-sprintf
    //text = sprintf.apply(this, [format].concat(args));

    var e = document.getElementById("log");
    e.innerHTML = text + "<br/>" + e.innerHTML;
};

//---------------------------------------------------------------------------------------------
function ProfileOnScreen(text, args)
{
    for (var i = 1; i < ProfileOnScreen.arguments.length; i++)
    {
        text += ProfileOnScreen.arguments[i];
    }
    
    var e = document.getElementById("profile");
    e.innerHTML = text;
};

//---------------------------------------------------------------------------------------------
function LogOnScreenClear()
{
    var e = document.getElementById("log");
    e.innerHTML = "";
};

//---------------------------------------------------------------------------------------------
// Ref : http://bytes.com/topic/javascript/insights/718427-deep-cloning-js-objects
//  此方法不保證所有clone出來的東西都沒有問題...
//      THREE.Geometry clone會有問題...
//  **** important ****
//  Alan改良過, 可避免Object互相Reference導致無限迴圈
//  此方法Clone出來的物件會和原本的物件完全獨立
//  使用時不需傳入objName和prototypes這個參數
function CloneObject(obj)
{
    var prototypes = [];
    var clone = CloneObjectEx(obj, prototypes);
    
    for (var i in prototypes)
    {
        delete prototypes[i].__cloneObject__;
    }
    
    return clone;
};

//---------------------------------------------------------------------------------------------
function CloneObjectEx(obj, prototypes)
{
    if (typeof(obj) != 'object' || obj == null)
    {
        return obj;
    }
    
    if (typeof(obj.clone) == 'function')
    {
        // 貼圖和材質用這種方式clone會有問題, 改呼叫THREE內部的clone
        if (obj instanceof GCEventTarget)
        {
            return obj.clone();
        }
        else
        {
            return cc.clone(obj);
        }
    }
    
    // 比對Object, 避免互相Reference導致無限迴圈
    if (obj.__cloneObject__)
    {
        return obj.__cloneObject__;
    }
    
    var c = (obj instanceof Array) ? [] : {};
    // http://stackoverflow.com/questions/2449254/what-is-the-instanceof-operator-in-javascript
    // 讓object繼承關係正常, 可使用instanceof檢查型別
    c.__proto__ = obj.__proto__;

    var bRecord = false;
    for (var i in obj)
    {
        // 紀錄clone物件
        if (bRecord == false)
        {
            obj.__cloneObject__ = c;
            prototypes.push(obj);
            bRecord = true;
        }
    
        var prop = obj[i];

        if (prop == null || typeof(prop) != 'object')
        {
            c[i] = prop;
        }
        else
        {
            c[i] = CloneObjectEx(prop, prototypes);
        }
    }
    
    return c;
};

//---------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------
// Provides requestAnimationFrame in a cross browser way.
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
//---------------------------------------------------------------------------------------------
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


//---------------------------------------------------------------------------------------------
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
//---------------------------------------------------------------------------------------------
function CSVToArray(strData, strDelimiter)
{
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
        // Delimiters.
        "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

        // Quoted fields.
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

        // Standard fields.
        "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );
    
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData ))
    {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];
        
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length &&
            strMatchedDelimiter != strDelimiter)
        {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2])
        {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(
                new RegExp( "\"\"", "g" ),
                "\""
            );
        }
        else
        {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];
        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }

    // Return the parsed data.
    return (arrData);
};


//---------------------------------------------------------------------------------------------
function XMLToDict(textxml)
{
    var xmlDoc = null;
    // get a reference to the requested corresponding xml file
    if (window.DOMParser)
    {
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(textxml, "text/xml");
    }
    else // Internet Explorer (untested!)
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(textxml);
    }
    if (xmlDoc == null)
    {
        cc.log("xml " + xmlDoc + " not found!");
    }
    
    var plist = xmlDoc.documentElement;
    
    _parseNode = function(node, dict)
    {
        var bParse = false;
        
        for (var i = 0, len = node.childNodes.length; i < len; i++)
        {
            var child = node.childNodes[i];
            if (child.nodeType != 1)
            {
                continue;
            }
            
            if (dict[child.tagName] == undefined)
            {
                dict[child.tagName] = [];
            }
            
            var data = [];
            data = this._parseNode(child, data);
            dict[child.tagName].push(data);
            bParse = true;
        }
        
        if (!bParse)
        {
            dict = node.firstChild.nodeValue;
        }
        
        return dict;
    };
    
    var dict = [];
    _parseNode(plist, dict);
    
    return dict;
};

//---------------------------------------------------------------------------------------------
function GetRect(obj)
{
    var root = obj;
    if (obj instanceof GCGameObject)
    {
        root = obj.root;
    }
    
    if (!root)
    {
        return cc.rect();
    }
    
    var rc = cc.rect();
    
    rc.origin = root.getPosition();
    rc.size = root.getContentSize();
    
    var ap = root.getAnchorPoint();
    //rc.origin.x -= (0.5 - ap.x)*rc.size.width;
    //rc.origin.y -= (0.5 - ap.y)*rc.size.height;
    rc.origin.x -= ap.x*rc.size.width;
    rc.origin.y -= ap.y*rc.size.height;
    
    return rc;
};

//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
function CreateSprite (obj, data)
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
function CreateButton (obj, data)
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
function CreateParticle (obj, data)
{
  var particleComponent = new GCParticleComponent(data);
  obj.AddComponent(particleComponent);
	
	obj.gameObjectType = 'Particle';
};

//---------------------------------------------------------------------------------------------
function CreateLabel (obj, data)
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
function CreateScript(obj, data)
{
  var script = new GCScriptComponent();
  script.Init(data.src);
  obj.AddComponent(script);

  script.src = data.src;
};

//---------------------------------------------------------------------------------------------
function CreateAnimation(obj, data)
{
	var anim = GCAnimatorXMLBuilder(obj.root, data.src, "Data/Animation/");
    obj.AddComponent(anim);
    
    var animator = obj.GetComponent("GCAnimator");
    animator.PlayAnimation("Idle", true);
	
	obj.gameObjectType = 'Animation';
};
