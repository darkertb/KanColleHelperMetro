//---------------------------------------------------------------------------------------------
//  GCLabel : GCComponent
//---------------------------------------------------------------------------------------------
function GCLabel(data)
{
    GCComponent.call(this);
    
    this.root = null;
    this.label = data;
};

//---------------------------------------------------------------------------------------------
GCLabel.prototype = Object.create(GCComponent.prototype);
GCLabel.prototype.constructor = GCLabel;

//---------------------------------------------------------------------------------------------
GCLabel.prototype.GetRoot = function()
{
    return this.root;
};

//---------------------------------------------------------------------------------------------
GCLabel.prototype.SetRoot = function(root)
{
    this.root = root;
};

//---------------------------------------------------------------------------------------------
GCLabel.prototype.SetText = function(msg)
{
    this.label.setString(msg);
};
//---------------------------------------------------------------------------------------------
GCLabel.prototype.SetColor = function(r, g, b, a)
{
    this.label1.setColor(cc.c4(r, g, b, a));
};
//---------------------------------------------------------------------------------------------
GCLabel.prototype.SetFontSize = function(fontSize)
{
    this.label.setFontSize(fontSize);
};
//---------------------------------------------------------------------------------------------