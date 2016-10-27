

//---------------------------------------------------------------------------------------------
//  GCGameObject : GCNameObject
//---------------------------------------------------------------------------------------------
function GCGameObject()
{
    GCNameObject.call(this);
    
    this.enabled = true;
    this.firstRun = true;
    this.root = null;   // root must be pointer to a cc.Node
    this.components = {};
    this.manager = null;
	
	//紀錄物件類型，方便Clone用
	this.gameObjectType = '';
};

//---------------------------------------------------------------------------------------------
GCGameObject.prototype = Object.create(GCNameObject.prototype);
GCGameObject.prototype.constructor = GCGameObject;

//---------------------------------------------------------------------------------------------
GCGameObject.prototype.GetRoot = function()
{
    return this.root;
};

//---------------------------------------------------------------------------------------------
GCGameObject.prototype.SetRoot = function(root)
{
    this.root = root;
};

//GCGameObject.SetPosition(position: cc.Point);
//GCGameObject.SetPosition(x: float, y: float);
GCGameObject.prototype.SetPosition = function(pos, y)
{
	var tPos = null;
	if (y != undefined) {
		tPos = new cc.Point(pos, y);
	}
	else {
		tPos = pos;
	}
	
	this.root.setPosition(tPos);
};

GCGameObject.prototype.GetPosition = function()
{
	return this.root.getPosition();
};

//移動gameobject
//GCGameObject.Translate(movement: cc.Point);
//GCGameObject.Translate(x: float, y: float);
GCGameObject.prototype.Translate = function(pos, y)
{
	var objPos = this.root.getPosition();
	
	if (y != undefined) {
		objPos.x += pos;
		objPos.y += y;
	}
	else {
		objPos.x += pos.x;
		objPos.y += pos.y;
	}
	
	this.root.setPosition(objPos);
};

//旋轉gameobject
//GCGameObject.Translate(angle: float);
GCGameObject.prototype.Rotate = function(angle) {
	var objRot = this.root.getRotation();
	
	objRot += angle;
	
	this.root.setRotation(objRot);
}

//---------------------------------------------------------------------------------------------
GCGameObject.prototype.SetEnable = function(bEnable)
{
    if (!this.enabled && bEnable)
    {
        this.firstRun = true;
    }
    this.enabled = bEnable;
};

//---------------------------------------------------------------------------------------------
GCGameObject.prototype.Awake = function()
{
    for (var type in this.components)
    {
        for (var index in this.components[type])
        {
            var component = this.components[type][index];
            component.gameObject = this;
            component.Awake();
        }
    }
};

//---------------------------------------------------------------------------------------------
GCGameObject.prototype.Terminate = function()
{
    for (var type in this.components)
    {
        for (var index in this.components[type])
        {
            var component = this.components[type][index];
            component.Terminate();
        }
    }
    
    this.root = null;
    this.components = {};
    this.manager = null;
};

//---------------------------------------------------------------------------------------------
GCGameObject.prototype.Run = function(deltaTime)
{
    if (!this.enabled)
    {
        return;
    }
    
    if (this.firstRun)
    {
        this.Start();
        this.firstRun = false;
    }
    
    this.Update(deltaTime);
};

//---------------------------------------------------------------------------------------------
GCGameObject.prototype.Start = function()
{

};

//---------------------------------------------------------------------------------------------
GCGameObject.prototype.Update = function(deltaTime)
{
    for (var type in this.components)
    {
        for (var index in this.components[type])
        {
            // 不直接呼叫Component.Update是因為Component要處理Enable、是否為第一次Update等問題.
            this.components[type][index].Run(deltaTime);
        }
    }
};

//---------------------------------------------------------------------------------------------
GCGameObject.prototype.FixedUpdate = function(deltaTime)
{
    if (!this.enabled)
    {
        return;
    }
    
    for (var type in this.components)
    {
        for (var index in this.components[type])
        {
            if (this.components[type][index].enabled)
            {
                this.components[type][index].FixedUpdate(deltaTime);
            }
        }
    }
};

//---------------------------------------------------------------------------------------------
GCGameObject.prototype.AddComponent = function(component)
{
    var type = component.ClassName();
    if (!type)
    {
        return;
    }
    
    if (!this.components[type])
    {
        this.components[type] = [];
    }
    
    this.components[type].push(component);
    component.gameObject = this;
    
};

//---------------------------------------------------------------------------------------------
GCGameObject.prototype.RemoveComponent = function(component)
{
    var type = component.ClassName();
    if (!type)
    {
        return;
    }
    
    if (!this.components[type])
    {
        return;
    }
    
    var index = this.components[type].indexOf(component);
    if (index != -1)
    {
        this.components[type].splice(index, 1);
        component.Terminate();
    }
};

//---------------------------------------------------------------------------------------------
GCGameObject.prototype.GetComponent = function(type, index)
{
    if (!index)
    {
        index = 0;
    }
    
    if (typeof(type) == "function")
    {
        type = GetFuncName(type);
    }
    
    if (this.components[type])
    {
        return this.components[type][index];
    }
    
    //console.log("cant find %s", type);
    return undefined;
};

//---------------------------------------------------------------------------------------------
GCGameObject.prototype.Instantiate = function(obj, pos, rot)
{
    if (obj.root)
    {
        if (pos)
        {
            obj.root.setPosition(pos.x, pos.y);
        }
        if (rot)
        {
            obj.root.setRotation(rot);
        }
    }
    
    this.manager.Add(obj);
    return obj;
};

//---------------------------------------------------------------------------------------------
GCGameObject.prototype.DestroyObject = function(obj)
{
    if (obj == undefined)
    {
        obj = this;
    }
    
    if (obj.manager == null)
    {
        console.log("manager == null %s", obj.GetName());
        return;
    }
    
    //console.log("remove from manager %s", obj.GetName());
    obj.manager.Remove(obj);
};

//---------------------------------------------------------------------------------------------
GCGameObject.prototype.clone = function()
{
  var obj = new GCGameObject();

  obj.name = this.name + '-Clone';

  //取得Scene
  var sceneName = EditorParser().GetNowScene();	
  var gameScene = GCFramework().GetGameScene(sceneName);

  var data = {};

  //對Clone物件添加Script
  for(var comp in this.components.GCScriptComponent) {
    CreateScript(obj, this.components.GCScriptComponent[comp]);
  }

  //依照GameObject的類型創建物件的Root
  if (this.gameObjectType == "Label") {
    data.r = this.root._color.r;
    data.g = this.root._color.g;
    data.b = this.root._color.b;
    data.a = this.root._opacity;

    data.fontSize = this.root._fontSize;

    data.posX = this.root._position.x;
    data.posY = this.root._position.y;
    data.posZ = this.root._zOrder * -1;

    data.scaleX = this.root._scaleX;
    data.scaleY = this.root._scaleY;

    data.rotate = 0;

    data.text = '';

    for (var idx in this.root._string)
    {
        data.text += this.root._string[idx];
    }
    CreateLabel(obj, data);
  }
  else if (this.gameObjectType == "Sprite") {
    var sSrc = this.root._texture.src;
    data.src = sSrc.substr(sSrc.indexOf('Data'));

    data.posX = this.root._position.x;
    data.posY = this.root._position.y;
    data.posZ = this.root._zOrder * -1;

    data.scaleX = this.root._scaleX;
    data.scaleY = this.root._scaleY;

    if (this.root._rotation)
    data.rotate = this.root._rotation;

    CreateSprite(obj, data);
  }
  else if (this.gameObjectType == "Button") {
    var nSrc = this.root._children[0]._normalImage._texture.src;
    data.normalImage = nSrc.substr(nSrc.indexOf('Data'));

    var sSrc = this.root._children[0]._selectedImage._texture.src;
    data.selectImage = sSrc.substr(sSrc.indexOf('Data'));

    data.posX = this.root._children[0]._position.x;
    data.posY = this.root._children[0]._position.y;
    data.posZ = this.root._zOrder * -1;

    data.scaleX = this.root._children[0]._scaleX;
    data.scaleY = this.root._children[0]._scaleY;

    if (this.root._rotation)
    data.rotate = this.root._rotation;

    CreateButton(obj, data);
  }
  else if (this.gameObjectType == "Particle") {
    data = this.components.GCParticleComponent[0].particleData;
    CreateParticle(obj, data);
  }
  else if (this.gameObjectType == "Animation") {
	//sprite的部分
	var sSrc = this.root._texture.src;
    data.src = sSrc.substr(sSrc.indexOf('Data'));

    data.posX = this.root._position.x;
    data.posY = this.root._position.y;
    data.posZ = this.root._zOrder * -1;

    data.scaleX = this.root._scaleX;
    data.scaleY = this.root._scaleY;

    if (this.root._rotation)
    data.rotate = this.root._rotation;
  
	//animation的部分
    var aniData = {};
	aniData.src = this.components.GCAnimator[0].src;
	
    CreateSprite(obj, data);
    CreateAnimation(obj, aniData);
  }

  gameScene.manager.Add(obj);
  return obj;
};

//---------------------------------------------------------------------------------------------