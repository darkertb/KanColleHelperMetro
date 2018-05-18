

//---------------------------------------------------------------------------------------------
//  BluetoothBtn : GCScriptComponent
//---------------------------------------------------------------------------------------------
function BluetoothBtn()
{
    GCScriptComponent.call(this);
};

//---------------------------------------------------------------------------------------------
BluetoothBtn.prototype = Object.create(GCScriptComponent.prototype);
BluetoothBtn.prototype.constructor = BluetoothBtn;

//-----------------------------------------------------------------------------
BluetoothBtn.prototype.Awake = function()
{
	this.registerButton();
};

//---------------------------------------------------------------------------------------------
BluetoothBtn.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
BluetoothBtn.prototype.Start = function()
{
};

//-----------------------------------------------------------------------------
BluetoothBtn.prototype.Update = function(deltaTime)
{
};

BluetoothBtn.prototype.OnClick = function(sender)
{
	alert('裝置不支援網頁藍芽連線');
};  

//---------------------------------------------------------------------------------------------

var script = new BluetoothBtn();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
