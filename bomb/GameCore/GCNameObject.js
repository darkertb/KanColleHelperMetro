

//---------------------------------------------------------------------------------------------
//  GCNameObject : GCEventTarget
//      
//---------------------------------------------------------------------------------------------
function GCNameObject(name)
{
    GCEventTarget.call(this);
    
    this.name = name;
    
};

//---------------------------------------------------------------------------------------------
GCNameObject.prototype = Object.create(GCEventTarget.prototype);
GCNameObject.prototype.constructor = GCNameObject;

//---------------------------------------------------------------------------------------------
//GCNameObject.prototype = {
//    constructor: GCNameObject,
//    SetName:function(name) 
//    {
//        console.log("SetName = %s", this.name);
//        this.name = name;
//        console.log("SetName = %s", this.name);
//    }
//};

//---------------------------------------------------------------------------------------------
GCNameObject.prototype.SetName = function(name)
{
    this.name = name;
};

//---------------------------------------------------------------------------------------------
GCNameObject.prototype.GetName = function()
{
    return this.name;
};

//---------------------------------------------------------------------------------------------