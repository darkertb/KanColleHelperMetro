//---------------------------------------------------------------------------------------------
//  GCParticleComponent : GCComponent
//---------------------------------------------------------------------------------------------
function GCParticleComponent(data)
{
    GCComponent.call(this);
    
    this.particleData = data;
};

//---------------------------------------------------------------------------------------------
GCParticleComponent.prototype = Object.create(GCComponent.prototype);
GCParticleComponent.prototype.constructor = GCParticleComponent;

GCParticleComponent.prototype.playParticle = function(pos)
{
    var data = this.particleData;
    var emitter = null;
    switch (data.pType)
    {
        case "fire":
            emitter = new cc.ParticleFire();
            break;
        case "fireworks":
            emitter = new cc.ParticleFireworks();
            break;
        case "sun":
            emitter = new cc.ParticleSun();
            break;
        case "galaxy":
            emitter = new cc.ParticleGalaxy();
            break;
        case "flower":
            emitter = new cc.ParticleFlower();
            break;
        case "meteor":
            emitter = new cc.ParticleMeteor();
            break;
        case "spiral":
            emitter = new cc.ParticleSpiral();
            break;
        case "explosion":
            emitter = new cc.ParticleExplosion();
            break;
        case "smoke":
            emitter = new cc.ParticleSmoke();
            break;
        case "snow":
            emitter = new cc.ParticleSnow();
            break;
        case "rain":
            emitter = new cc.ParticleRain();
            break;
        default:
            return;
    }
    
    emitter.initWithTotalParticles(100);
//    emitter.setShapeType(cc.PARTICLE_BALL_SHAPE);
    if (pos != undefined)
    {
        emitter.setPosition(cc.p(pos.x, pos.y));
    }
    else
    {
        emitter.setPosition(cc.p(parseInt(data.posX), parseInt(data.posY)));
    }
    emitter.setZOrder(data.posZ);

//    var color = new cc.Color4F(0.5, 0.5, 0.5, 1);
//    emitter.setStartColor(color);
//    var color = new cc.Color4F(0, 0, 0, 0);
//    emitter.setEndColor(color);
//    emitter.setLife(data.life);
//    emitter.setLifeVar(data.lifeVar);
//    emitter.setStartSize(data.size);
//    emitter.setStartSizeVar(data.sizeVar);
    emitter.setDuration(data.duration);
//    emitter.setBlendAdditive(false);
//    emitter.setPositionType(cc.PARTICLE_TYPE_RELATIVE);
    emitter.setAngle(data.rotate);

    var manager = this.gameObject.manager;
    var obj = new GCGameObject();
    obj.root = emitter;
    manager.Add(obj);
    GameParticle().PlayParticle(obj);
};