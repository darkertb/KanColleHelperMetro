

//---------------------------------------------------------------------------------------------
//  GCRenderView : GCNameObject
//---------------------------------------------------------------------------------------------
function GCRenderView(scene, camera)
{
    GCNameObject.call(this);
    
    if (!scene)
    {
        scene = new THREE.Scene();
    }
    
    if (!camera)
    {
        camera =  new THREE.PerspectiveCamera( 50, GCFramework().width / GCFramework().height, 0.01, 1000 );
	    camera.position.z = 100;
    }
    
    this.scene = scene;
    this.camera = camera;
    
    this.useRendererBackgroundColor = true;
    this.backgroundColor = new THREE.Color(0xFF00FF);
    this.clearColorBuffer = true;
    this.clearDepthBuffer = true;
    this.clearStencilBuffer = true;
};

//---------------------------------------------------------------------------------------------
GCRenderView.prototype = Object.create(GCNameObject.prototype);
GCRenderView.prototype.constructor = GCRenderView;

//---------------------------------------------------------------------------------------------
GCRenderView.prototype.AddToScene = function(object)
{
    if (!object)
    {
        return;
    }

    if (object instanceof THREE.Object3D)
    {
        this.scene.add(object);
    }
    else if (object instanceof GCGameObject)
    {
        if (object.root)
        {
            this.scene.add(object.root);
        }
    }
};

//---------------------------------------------------------------------------------------------
GCRenderView.prototype.RemoveFromScene = function(object)
{
    if (!object)
    {
        return;
    }
    
    if (object instanceof THREE.Object3D)
    {
        this.scene.remove(object);
    }
    else if (object instanceof GCGameObject)
    {
        if (object.root)
        {
            this.scene.remove(object.root);
        }
    }
};

//---------------------------------------------------------------------------------------------
GCRenderView.prototype.Render = function(renderer)
{
    if (this.useRendererBackgroundColor)
    {
        renderer.setClearColor(renderer.getClearColor(), renderer.getClearAlpha());
    }
    else
    {
        renderer.setClearColor(this.backgroundColor, 1);
    }
    
    renderer.clear(this.clearColorBuffer, this.clearDepthBuffer, this.clearStencilBuffer);

    renderer.render(this.scene, this.camera);
    
    //console.log("%s Num = %d", this.GetName(), this.scene.__objects.length);
};

//---------------------------------------------------------------------------------------------