

//---------------------------------------------------------------------------------------------
//  GCEventManager
//---------------------------------------------------------------------------------------------
function GCEventManager()
{
    if (GCEventManager.prototype._SingletonInstance)
    {
        return GCEventManager.prototype._SingletonInstance;
    }
    GCEventManager.prototype._SingletonInstance = this;
    
    this.listeners = {};
};

//---------------------------------------------------------------------------------------------
GCEventManager.prototype.constructor = GCEventManager;

//---------------------------------------------------------------------------------------------
GCEventManager.prototype.Terminate = function()
{
    GCEventManager.prototype._SingletonInstance = null;
};

//---------------------------------------------------------------------------------------------
GCEventManager.prototype.AddEventListener = function(type, listener, object, args, useCapture)
{
    for (var index in this.listeners[type])
    {
        var obj = this.listeners[type][index];
        if (obj.func == listener && obj.object == object)
        {
            return;
        }
    }
    
    useCapture = (useCapture == undefined) ? false : useCapture;
    
    switch (type)
    {
        case 'resize':
            window.addEventListener(type, this.EventTransfer, useCapture);
            break;
        default:
            document.addEventListener(type, this.EventTransfer, useCapture);
            break;
    }
    
    if (this.listeners[type] == undefined)
    {
        this.listeners[type] = [];
    }
    
    var obj = {};
    obj.func = listener;
    obj.object = object;
    obj.args = args;
    var i = this.listeners[type].push(obj);
    //console.log("AddEventListener %d", i);
};

//---------------------------------------------------------------------------------------------
GCEventManager.prototype.DispatchEvent = function(event)
{
    var temp = [];
    for (var index in this.listeners[event.type])
    {
        var obj = this.listeners[event.type][index];
        temp.push(obj);
    }
    
    for (var index in temp)
    {
        var obj = temp[index];
        if (obj.object)
        {
            obj.func.call(obj.object, event, obj.args);
        }
        else
        {
            obj.func(event, obj.args);
        }
    }
};

//---------------------------------------------------------------------------------------------
GCEventManager.prototype.RemoveEventListener = function(type, listener, object)
{
    var temp = [];
    for (var index in this.listeners[type])
    {
        var obj = this.listeners[type][index];
        if (obj.func == listener && obj.object == object)
        {
            temp.push(index);
        }
    }
    
    for (var index in temp)
    {
        this.listeners[type].splice(temp[index], 1);
        //console.log("RemoveEventListener %s", temp[index]);
    }
};

//---------------------------------------------------------------------------------------------
GCEventManager.prototype.EventTransfer = function(event)
{
    GCEventManager().DispatchEvent(event);
};

//---------------------------------------------------------------------------------------------