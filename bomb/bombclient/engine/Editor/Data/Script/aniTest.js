

//---------------------------------------------------------------------------------------------
//  aniTest : GCScriptComponent
//---------------------------------------------------------------------------------------------
function aniTest()
{
    GCScriptComponent.call(this);
};

//---------------------------------------------------------------------------------------------
aniTest.prototype = Object.create(GCScriptComponent.prototype);
aniTest.prototype.constructor = aniTest;

//-----------------------------------------------------------------------------
aniTest.prototype.Awake = function()
{
};

//---------------------------------------------------------------------------------------------
aniTest.prototype.Terminate = function()
{
    GCScriptComponent.prototype.Terminate.call(this);
};

//-----------------------------------------------------------------------------
aniTest.prototype.Start = function()
{
	var animator = this.gameObject.GetComponent("GCAnimator");
	
	animator.OnAnimationEndListener(function() {
		console.log('end');
	});
	
	
		animator.PlayAnimation('Attack', false);
};

//-----------------------------------------------------------------------------
aniTest.prototype.Update = function(deltaTime)
{
};

//---------------------------------------------------------------------------------------------

var script = new aniTest();
var type = script.ClassName();
GCScriptManager().addScript(type, script);
