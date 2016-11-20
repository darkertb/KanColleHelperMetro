

//---------------------------------------------------------------------------------------------
//  GamePhysics
//---------------------------------------------------------------------------------------------
CollisionFlag = 
{
    NONE    : 0x0000, 
    SCENE   : 0x0001, 
    PLAYER  : 0x0002, 
    ENEMY   : 0x0004, 
    ITEM    : 0x0008, 
    OBJECT  : 0x0010, 
    
    MASK_ALL : 0xFFFF 
};

//---------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------
//  GameContactListener : b2ContactListener
//---------------------------------------------------------------------------------------------
function GameContactListener()
{
    b2ContactListener.call(this);
};

//---------------------------------------------------------------------------------------------
GameContactListener.prototype = Object.create(b2ContactListener.prototype);
GameContactListener.prototype.constructor = GameContactListener;

//---------------------------------------------------------------------------------------------
GameContactListener.prototype.BeginContact = function (contact)
{
    //console.log("BeginContact");
    
    var worldManifold = new b2WorldManifold;
    contact.GetWorldManifold(worldManifold);
    
    var bodyA = contact.GetFixtureA().GetBody();
    var bodyB = contact.GetFixtureB().GetBody();
    var point = worldManifold.m_points[0];
    var vA = bodyA.GetLinearVelocityFromWorldPoint(point);
    var vB = bodyB.GetLinearVelocityFromWorldPoint(point);
    
    var bTrigger = (contact.GetFixtureA().IsSensor() || contact.GetFixtureB().IsSensor());
    var type = (bTrigger) ? "triggerOnEnter" : "collisionOnEnter";
    
    var userDataA = bodyA.GetUserData();
    var userDataB = bodyB.GetUserData();
    var gameObjA = null;
    var gameObjB = null;
    if (userDataA instanceof GCPhysicsUserData)
    {
        gameObjA = userDataA.gameObj;
    }
    if (userDataB instanceof GCPhysicsUserData)
    {
        gameObjB = userDataB.gameObj;
    }
    
    if (gameObjA)
    {
        gameObjA.DispatchEvent({type:type, gameObjA:gameObjA, gameObjB:gameObjB, bodyA:bodyA, bodyB:bodyB, velA:vA, velB:vB, normal:worldManifold.normal});
    }
    
    if (gameObjB)
    {
        gameObjB.DispatchEvent({type:type, gameObjA:gameObjB, gameObjB:gameObjA, bodyA:bodyB, bodyB:bodyA, velA:vB, velB:vA, normal:worldManifold.normal});
    }
};

//---------------------------------------------------------------------------------------------
GameContactListener.prototype.EndContact = function (contact)
{
    //console.log("EndContact");
    
    var worldManifold = new b2WorldManifold;
    contact.GetWorldManifold(worldManifold);
    
    var bodyA = contact.GetFixtureA().GetBody();
    var bodyB = contact.GetFixtureB().GetBody();
    var point = worldManifold.m_points[0];
    var vA = bodyA.GetLinearVelocityFromWorldPoint(point);
    var vB = bodyB.GetLinearVelocityFromWorldPoint(point);
    
    var bTrigger = (contact.GetFixtureA().IsSensor() || contact.GetFixtureB().IsSensor());
    var type = (bTrigger) ? "triggerOnLeave" : "collisionOnLeave";
    
    var userDataA = bodyA.GetUserData();
    var userDataB = bodyB.GetUserData();
    var gameObjA = null;
    var gameObjB = null;
    if (userDataA instanceof GCPhysicsUserData)
    {
        gameObjA = userDataA.gameObj;
    }
    if (userDataB instanceof GCPhysicsUserData)
    {
        gameObjB = userDataB.gameObj;
    }
    
    if (gameObjA)
    {
        gameObjA.DispatchEvent({type:type, gameObjA:gameObjA, gameObjB:gameObjB, bodyA:bodyA, bodyB:bodyB, velA:vA, velB:vB, normal:worldManifold.normal});
    }
    
    if (gameObjB)
    {
        gameObjB.DispatchEvent({type:type, gameObjA:gameObjB, gameObjB:gameObjA, bodyA:bodyB, bodyB:bodyA, velA:vB, velB:vA, normal:worldManifold.normal});
    }
};

//---------------------------------------------------------------------------------------------
GameContactListener.prototype.PreSolve = function (contact, oldManifold)
{
    //console.log("PreSolve");
    var worldManifold = new b2WorldManifold;
    contact.GetWorldManifold(worldManifold);
    var state1 = [], state2 = [];
    b2GetPointStates(state1, state2, oldManifold, contact.GetManifold());
    if (state2[0] == b2PointState.b2_addState)
    {
        var bodyA = contact.GetFixtureA().GetBody();
        var bodyB = contact.GetFixtureB().GetBody();
        var point = worldManifold.m_points[0];
        var vA = bodyA.GetLinearVelocityFromWorldPoint(point);
        var vB = bodyB.GetLinearVelocityFromWorldPoint(point);
        
        var type = "collision";
        
        var userDataA = bodyA.GetUserData();
        var userDataB = bodyB.GetUserData();
        var gameObjA = null;
        var gameObjB = null;
        if (userDataA instanceof GCPhysicsUserData)
        {
            gameObjA = userDataA.gameObj;
        }
        if (userDataB instanceof GCPhysicsUserData)
        {
            gameObjB = userDataB.gameObj;
        }
        
        if (gameObjA)
        {
            gameObjA.DispatchEvent({type:type, gameObjA:gameObjA, gameObjB:gameObjB, bodyA:bodyA, bodyB:bodyB, velA:vA, velB:vB, normal:worldManifold.normal});
        }
        
        if (gameObjB)
        {
            gameObjB.DispatchEvent({type:type, gameObjA:gameObjB, gameObjB:gameObjA, bodyA:bodyB, bodyB:bodyA, velA:vB, velB:vA, normal:worldManifold.normal});
        }
    }
};

//---------------------------------------------------------------------------------------------
GameContactListener.prototype.PostSolve = function (contact, impulse)
{
    //console.log("PostSolve");
};

//---------------------------------------------------------------------------------------------