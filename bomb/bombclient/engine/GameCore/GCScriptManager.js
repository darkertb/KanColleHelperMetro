//---------------------------------------------------------------------------------------------
//  GCScriptManager
//---------------------------------------------------------------------------------------------
function GCScriptManager()
{
    if (GCScriptManager.prototype._SingletonInstance)
    {
        return GCScriptManager.prototype._SingletonInstance;
    }
    GCScriptManager.prototype._SingletonInstance = this;
    
    this.scriptArray = [];
};

//---------------------------------------------------------------------------------------------
GCScriptManager.prototype.addScript = function(scriptName, script)
{
    var src = "Data/Script/" + scriptName + ".js";
    this.scriptArray[src] = script;
};

//---------------------------------------------------------------------------------------------
GCScriptManager.prototype.getScript = function(scriptName)
{
    var script = this.scriptArray[scriptName];
    return CloneObject(script);
};
