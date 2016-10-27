

//---------------------------------------------------------------------------------------------
//  GCFSMActor : GCComponent
//---------------------------------------------------------------------------------------------
function GCFSMActor()
{
    GCComponent.call(this);
    
    this.states = [];
    this.initState = null;
    this.curState = null;
    this.lastState = null;
    
    this.switchCurStateEnabled = false;
};

//---------------------------------------------------------------------------------------------
GCFSMActor.prototype = Object.create(GCComponent.prototype);
GCFSMActor.prototype.constructor = GCFSMActor;

//---------------------------------------------------------------------------------------------
GCFSMActor.prototype.Awake = function()
{
    for (var i in this.states)
    {
        this.states[i].FSMActor = this;
    }
};

//---------------------------------------------------------------------------------------------
GCFSMActor.prototype.Terminate = function()
{
    GCComponent.prototype.Terminate.call(this);
    
    this.states = [];
    this.initState = null;
    this.curState = null;
    this.lastState = null;
};

//---------------------------------------------------------------------------------------------
GCFSMActor.prototype.Start = function()
{
    if (!this.curState && this.initState)
    {
        this.SetState(this.initState.GetName());
    }
};

//---------------------------------------------------------------------------------------------
GCFSMActor.prototype.Update = function(deltaTime)
{
    if (this.switchCurStateEnabled)
    {
        if (this.lastState)
        {
            this.lastState.DoPostLastRun();
        }
        
        this.curState.SetEnable(true);
        this.switchCurStateEnabled = false;
    }
};

//---------------------------------------------------------------------------------------------
GCFSMActor.prototype.AddState = function(state)
{
    var name = state.GetName();
    if (!name)
    {
        alert("undefined State Name!");
        return;
    }
    
    if (!this.GetStateByName(name))
    {
        this.states[name] = state;
        
        if (!this.initState)
        {
            this.initState = state;
        }
    }
    else
    {
        alert("State [" + name + "] already added!");
    }
};

//---------------------------------------------------------------------------------------------
GCFSMActor.prototype.GetStateByName = function(name)
{
    return this.states[name];
};

//---------------------------------------------------------------------------------------------
GCFSMActor.prototype.SetState = function(name)
{
    var state = this.GetStateByName(name);
    if (!state)
    {
        alert("No State [" + name + "] at GameObject [" + this.gameObject.GetName() + "]!");
        return;
    }
    
    if (this.curState)
    {
        this.curState.SetEnable(false);
        this.curState.DoLastRun();
        this.lastState = this.curState;
    }
    
    this.curState = state;
    // 不直接在此enable state, 是因為GameObject還在Component Loop中,
    // 可能會導致同一個Frame就Update State
    //this.curState.SetEnable(true);
    this.switchCurStateEnabled = true;
};

//---------------------------------------------------------------------------------------------