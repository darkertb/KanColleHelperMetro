

//---------------------------------------------------------------------------------------------
//  GCBox2dComponent : GCComponent
//---------------------------------------------------------------------------------------------
function GCBox2dComponent(body)
{
    GCComponent.call(this);
    
    this.body = (body) ? body : null;
    this.autoSync = false;
};

//---------------------------------------------------------------------------------------------
GCBox2dComponent.prototype = Object.create(GCComponent.prototype);
GCBox2dComponent.prototype.constructor = GCBox2dComponent;

//---------------------------------------------------------------------------------------------
GCBox2dComponent.prototype.Awake = function()
{
//    if (this.body)
//    {
//        if (this.body.GetType() == b2Body.b2_kinematicBody)
//        {
//            this.autoSync = true;
//        }
//        else
//        {
//            this.autoSync = false;
//        }
//    }
};

//---------------------------------------------------------------------------------------------
GCBox2dComponent.prototype.Terminate = function()
{
    GCComponent.prototype.Terminate.call(this);
    
    if (this.body)
    {
        GCPhysicsBox2d().GetWorld().DestroyBody(this.body);
        this.body = null;
    }
};

//---------------------------------------------------------------------------------------------
GCBox2dComponent.prototype.FixedUpdate = function(deltaTime)
{
    if (this.autoSync)
    {
        this.SyncTransform();
    }
};

//---------------------------------------------------------------------------------------------
GCBox2dComponent.prototype.GetAutoSync = function()
{
    return this.autoSync;
};

//---------------------------------------------------------------------------------------------
GCBox2dComponent.prototype.SetAutoSync = function(bSync)
{
    this.autoSync = bSync;
};

//---------------------------------------------------------------------------------------------
GCBox2dComponent.prototype.SyncTransform = function()
{
//    var root = this.gameObject.root;
//    var pos = root.getPosition();
//    var rot = root.getRotation();
//    
//    if (this.body)
//    {
//        this.body.SetPositionAndAngle(pos, -1*cc.DEGREES_TO_RADIANS(rot));
//    }
};

//---------------------------------------------------------------------------------------------
GCBox2dComponent.prototype.applyForce = function(force, point)
{
    if (this.body)
    {
        this.body.ApplyForce(force, point);
    }
};

//---------------------------------------------------------------------------------------------