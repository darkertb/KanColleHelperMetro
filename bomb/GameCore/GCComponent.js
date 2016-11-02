

//---------------------------------------------------------------------------------------------
//  GCComponent : GCNameObject
//---------------------------------------------------------------------------------------------
function GCComponent()
{
    GCNameObject.call(this);
    
    this.enabled = true;
    this.firstRun = true;
    this.allowMultiple = true;
    this.gameObject = null;
};

//---------------------------------------------------------------------------------------------
GCComponent.prototype = Object.create(GCNameObject.prototype);
GCComponent.prototype.constructor = GCComponent;

//---------------------------------------------------------------------------------------------
GCComponent.prototype.SetEnable = function(bEnable)
{
    if (!this.enabled && bEnable)
    {
        this.firstRun = true;
    }
    this.enabled = bEnable;
};

//---------------------------------------------------------------------------------------------
GCComponent.prototype.GetEnable = function()
{
    return this.enabled;
};

//---------------------------------------------------------------------------------------------
GCComponent.prototype.Awake = function()
{

};

//---------------------------------------------------------------------------------------------
GCComponent.prototype.Terminate = function()
{
    this.gameObject = null;
};

//---------------------------------------------------------------------------------------------
GCComponent.prototype.Run = function(deltaTime)
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
GCComponent.prototype.Start = function()
{

};

//---------------------------------------------------------------------------------------------
GCComponent.prototype.Update = function(deltaTime)
{

};

//---------------------------------------------------------------------------------------------
GCComponent.prototype.FixedUpdate = function(deltaTime)
{

};

//---------------------------------------------------------------------------------------------
GCComponent.prototype.GetComponent = function(type, index)
{
    return this.gameObject.GetComponent(type, index);
};

//---------------------------------------------------------------------------------------------
GCComponent.prototype.Instantiate = function(obj, pos, rot)
{
    return this.gameObject.Instantiate(obj, pos, rot);
};

//---------------------------------------------------------------------------------------------
GCComponent.prototype.DestroyObject = function(obj)
{
    this.gameObject.DestroyObject(obj);
};

//---------------------------------------------------------------------------------------------