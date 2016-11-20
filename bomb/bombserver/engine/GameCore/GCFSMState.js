

//---------------------------------------------------------------------------------------------
//  GCFSMState : GCComponent
//      改寫State的 DoFirstRun, DoRun, DoLastRun, 不要改寫Start, Update
//---------------------------------------------------------------------------------------------
function GCFSMState(name)
{
    GCComponent.call(this);
    
    this.FSMActor = null;
    this.stateTime = 0;
    this.name = name;
    this.SetEnable(false);
};

//---------------------------------------------------------------------------------------------
GCFSMState.prototype = Object.create(GCComponent.prototype);
GCFSMState.prototype.constructor = GCFSMState;

//---------------------------------------------------------------------------------------------
GCFSMState.prototype.DoFirstRun = function()
{
    //console.log("[%s] DoFirstRun", this.GetName());
};

//---------------------------------------------------------------------------------------------
GCFSMState.prototype.DoRun = function(deltaTime)
{
    //console.log("[%s] DoRun", this.GetName());
    //this.SetState("state1");
};

//---------------------------------------------------------------------------------------------
GCFSMState.prototype.DoLastRun = function()
{
    //console.log("[%s] DoLastRun", this.GetName());
};

//---------------------------------------------------------------------------------------------
GCFSMState.prototype.DoPostLastRun = function()
{
    //console.log("[%s] DoPostLastRun", this.GetName());
};

//---------------------------------------------------------------------------------------------
GCFSMState.prototype.Awake = function()
{
    
};

//---------------------------------------------------------------------------------------------
GCFSMState.prototype.Terminate = function()
{
    GCComponent.prototype.Terminate.call(this);
    
    this.FSMActor = null;
};

//---------------------------------------------------------------------------------------------
GCFSMState.prototype.Start = function()
{
    this.stateTime = 0;
    this.DoFirstRun();
};

//---------------------------------------------------------------------------------------------
GCFSMState.prototype.Update = function(deltaTime)
{
    this.stateTime += deltaTime;
    this.DoRun(deltaTime);
};

//---------------------------------------------------------------------------------------------
GCFSMState.prototype.GetStateByName = function(name)
{
    return this.FSMActor.GetStateByName(name);
};

//---------------------------------------------------------------------------------------------
GCFSMState.prototype.SetState = function(name)
{
    this.FSMActor.SetState(name);
};

//---------------------------------------------------------------------------------------------