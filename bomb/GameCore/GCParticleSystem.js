

//---------------------------------------------------------------------------------------------
//  GCParticleManagement
//---------------------------------------------------------------------------------------------
function GCParticleManagement ()
{
    if (GCParticleManagement.prototype._SingletonInstance)
    {
        return GCParticleManagement.prototype._SingletonInstance;
    }
    GCParticleManagement.prototype._SingletonInstance = this;
	
	//console.log("GCParticleManagement Constructor");
	this.scene = null;
	this.particlesManagement = new Array();
}
GCParticleManagement.prototype.Add = function ( particles )
{
	this.particlesManagement.push( particles );
	this.scene.add( particles.object );
}
GCParticleManagement.prototype.Remove = function ( particles )
{
	var length = this.particlesManagement.length;
	for( x=0; x<length; x++)
	{
		if( this.particlesManagement[x]==particles )
		{
			//console.log("remove");
			this.particlesManagement.splice( x,1 );
			this.scene.remove( particles.object );
		}
	}
}
GCParticleManagement.prototype.Update = function (deltaTime)
{
	for( var particles in this.particlesManagement)
	{ 
	   this.particlesManagement[particles].Update(deltaTime);
	}
}
GCParticleManagement.prototype.Init = function ( scene )
{
	this.scene = scene;
}
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//  GCParticle
//---------------------------------------------------------------------------------------------
function GCParticle ( parameters )
{
	this.clock = new THREE.Clock();
	this.clock.start();
	this.speed = parameters.speed;
	this.lifeTime = parameters.lifeTime;
	this.direction = new THREE.Vector3( parameters.direction.x,parameters.direction.y,parameters.direction.z );
	geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3());
	
	parameters.data.size = parameters.size;
	var material = new THREE.ParticleBasicMaterial( parameters.data );

	this.object = new THREE.ParticleSystem( geometry, material );
	this.object.sortParticles = false;
}
GCParticle.prototype.Update = function( deltaTime, parent )
{
	if( this.clock.getElapsedTime() > this.lifeTime )
	{
		parent.Remove( this );
	}
	else
	{
		this.object.translate( this.speed*deltaTime, this.direction );
	}
}
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//  GCParticles
//---------------------------------------------------------------------------------------------
function GCParticles ( parameters ) 
{
	this.particles = new Array();
	this.date = new Date();
	this.clock = new THREE.Clock();
	this.clock.start();
	this.countRange = (parameters.countRange != undefined)? parameters.countRange : { min:1, max:1 };
	this.sizeRange = (parameters.sizeRange != undefined)? parameters.sizeRange : { min:1, max:1 };
	this.speedRange = (parameters.speedRange != undefined)? parameters.speedRange : { min:1, max:1 };
	this.lifeRange = (parameters.lifeRange != undefined)? parameters.lifeRange : { min:1, max:1 };
	this.once = (parameters.once != undefined)? parameters.once : false;
	this.loop = ((parameters.loop != undefined) && this.once == false)? parameters.loop : true;
	this.first = false;
	this.duration = (parameters.duration != undefined)? parameters.duration : 10;
	this.position = (parameters.position != undefined)? parameters.position : new THREE.Vector3( 0,0,0 );
	this.direction = (parameters.direction != undefined)? parameters.direction : new THREE.Vector3( 0,1,0 );
	this.rate = (parameters.rate != undefined)? parameters.rate : 1;
	parameters.opacity = (parameters.opacity != undefined)? parameters.opacity : 1;
	parameters.transparent = (parameters.alpha != undefined)? parameters.alpha : true;
	parameters.map = (parameters.map != undefined) ? parameters.map : undefined;
	this.parameters = parameters;
	//this.material = new THREE.ParticleBasicMaterial( parameters );
	
	
	this.object = new THREE.Object3D();
	this.object.position = this.position;
	GCParticleManagement().Add(this);	
}
GCParticles.prototype.Update = function(deltaTime)
{
	
	if( this.first == false )
	{
		var count = THREE.Math.randInt(this.countRange.min,this.countRange.max);
		for(x=0; x<count; x++)
		{
			var particle = this.CreatParticle();
			this.particles.push( particle );
			this.object.add(particle.object);
		}
		this.clock.elapsedTime = 0;
		this.first = true;
	}
	
	if ( this.once == true )
	{
		for( var particle in this.particles )
		{
			this.particles[particle].Update( deltaTime, this );
		}
		if( this.particles.length == 0 )
		{
			GCParticleManagement().Remove(this);
		}
	}
	else if ( (((new Date()).getTime()-this.clock.startTime )*0.001<this.duration) || this.loop==true)
	{
		if( this.clock.getElapsedTime() >= this.rate )
		{
			var count = THREE.Math.randInt(this.countRange.min,this.countRange.max);
			for(x=0; x<count; x++)
			{
				var particle = this.CreatParticle();
				this.particles.push( particle );
				this.object.add(particle.object);
			}
			this.clock.elapsedTime = 0;
		}
		for( var particle in this.particles )
		{
			this.particles[particle].Update( deltaTime, this );
		}
 	}
	else
	{
		GCParticleManagement().Remove(this);
	}
}
GCParticles.prototype.Remove = function( particle )
{
	for( x=0; x<this.particles.length; x++)
	{
		if( this.particles[x]==particle )
		{
			this.particles.splice( x,1 );
		}
	}
	this.object.remove( particle.object );
}
GCParticles.prototype.CreatParticle = function()
{
	this.material.size = THREE.Math.randInt( this.sizeRange.min, this.sizeRange.max );
	var particle = new GCParticle 
	( { 
		data : this.material,
		size : THREE.Math.randInt( this.sizeRange.min, this.sizeRange.max ),
		speed : THREE.Math.randFloat( this.speedRange.min, this.speedRange.max ),
		lifeTime :  THREE.Math.randFloat( this.lifeRange.min, this.lifeRange.max ),
		position : new THREE.Vector3( 0, 0, 0 ),
		direction : new THREE.Vector3( THREE.Math.randFloat(-1,1),THREE.Math.randFloat(-1,1),THREE.Math.randFloat(-1,1) ),	
	} );
	return particle;
}

//---------------------------------------------------------------------------------------------


function GCSphereParticles ( parameters )
{
	GCParticles.call( this,parameters );
	
}
GCSphereParticles.prototype = Object.create(GCParticles.prototype);
GCSphereParticles.prototype.CreatParticle = function()
{
	//this.material.size = THREE.Math.randInt( this.sizeRange.min, this.sizeRange.max );
	var particle = new GCParticle 
	( { 
		data : this.parameters,
		size : THREE.Math.randFloat( this.sizeRange.min, this.sizeRange.max ),
		speed : THREE.Math.randFloat( this.speedRange.min, this.speedRange.max ),
		lifeTime :  THREE.Math.randFloat( this.lifeRange.min, this.lifeRange.max ),
		position : new THREE.Vector3( this.position.x, this.position.y, this.position.z ),
		direction : new THREE.Vector3( THREE.Math.randFloat(-1,1),THREE.Math.randFloat(-1,1),THREE.Math.randFloat(-1,1) ),		
	} );
	return particle;
}

//function lerp( a, b, t ) 
//{ 
//	return a + ( b - a ) * t; 
//}










