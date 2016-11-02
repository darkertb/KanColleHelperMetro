
//---------------------------------------------------------------------------------------------
var PTM_RATIO = 1;
var MTP_RATIO = 1/PTM_RATIO;

//---------------------------------------------------------------------------------------------
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
    b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2Shape = Box2D.Collision.Shapes.b2Shape,
    b2CircleContact = Box2D.Dynamics.Contacts.b2CircleContact,
    b2Contact = Box2D.Dynamics.Contacts.b2Contact,
    b2ContactConstraint = Box2D.Dynamics.Contacts.b2ContactConstraint,
    b2ContactConstraintPoint = Box2D.Dynamics.Contacts.b2ContactConstraintPoint,
    b2ContactEdge = Box2D.Dynamics.Contacts.b2ContactEdge,
    b2ContactFactory = Box2D.Dynamics.Contacts.b2ContactFactory,
    b2ContactRegister = Box2D.Dynamics.Contacts.b2ContactRegister,
    b2ContactResult = Box2D.Dynamics.Contacts.b2ContactResult,
    b2ContactSolver = Box2D.Dynamics.Contacts.b2ContactSolver,
    b2EdgeAndCircleContact = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact,
    b2NullContact = Box2D.Dynamics.Contacts.b2NullContact,
    b2PolyAndCircleContact = Box2D.Dynamics.Contacts.b2PolyAndCircleContact,
    b2PolyAndEdgeContact = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact,
    b2PolygonContact = Box2D.Dynamics.Contacts.b2PolygonContact,
    b2PositionSolverManifold = Box2D.Dynamics.Contacts.b2PositionSolverManifold,
    b2Body = Box2D.Dynamics.b2Body,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
    b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
    b2ContactListener = Box2D.Dynamics.b2ContactListener,
    b2ContactManager = Box2D.Dynamics.b2ContactManager,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
    b2FilterData = Box2D.Dynamics.b2FilterData,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Island = Box2D.Dynamics.b2Island,
    b2TimeStep = Box2D.Dynamics.b2TimeStep,
    b2World = Box2D.Dynamics.b2World,
    b2Color = Box2D.Common.b2Color,
    b2internal = Box2D.Common.b2internal,
    b2Settings = Box2D.Common.b2Settings,
    b2Mat22 = Box2D.Common.Math.b2Mat22,
    b2Mat33 = Box2D.Common.Math.b2Mat33,
    b2Math = Box2D.Common.Math.b2Math,
    b2Sweep = Box2D.Common.Math.b2Sweep,
    b2Transform = Box2D.Common.Math.b2Transform,
    b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2Vec3 = Box2D.Common.Math.b2Vec3,
    b2AABB = Box2D.Collision.b2AABB,
    b2Bound = Box2D.Collision.b2Bound,
    b2BoundValues = Box2D.Collision.b2BoundValues,
    b2Collision = Box2D.Collision.b2Collision,
    b2ContactID = Box2D.Collision.b2ContactID,
    b2ContactPoint = Box2D.Collision.b2ContactPoint,
    b2Distance = Box2D.Collision.b2Distance,
    b2DistanceInput = Box2D.Collision.b2DistanceInput,
    b2DistanceOutput = Box2D.Collision.b2DistanceOutput,
    b2DistanceProxy = Box2D.Collision.b2DistanceProxy,
    b2DynamicTree = Box2D.Collision.b2DynamicTree,
    b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase,
    b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode,
    b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair,
    b2Manifold = Box2D.Collision.b2Manifold,
    b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint,
    b2Point = Box2D.Collision.b2Point,
    b2RayCastInput = Box2D.Collision.b2RayCastInput,
    b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
    b2Segment = Box2D.Collision.b2Segment,
    b2SeparationFunction = Box2D.Collision.b2SeparationFunction,
    b2Simplex = Box2D.Collision.b2Simplex,
    b2SimplexCache = Box2D.Collision.b2SimplexCache,
    b2SimplexVertex = Box2D.Collision.b2SimplexVertex,
    b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact,
    b2TOIInput = Box2D.Collision.b2TOIInput,
    b2WorldManifold = Box2D.Collision.b2WorldManifold,
    ClipVertex = Box2D.Collision.ClipVertex,
    Features = Box2D.Collision.Features,
    IBroadPhase = Box2D.Collision.IBroadPhase;

//---------------------------------------------------------------------------------------------    
var b2_maxManifoldPoints = 2;

//---------------------------------------------------------------------------------------------
/// This is used for determining the state of contact points.
var b2PointState = 
{
    b2_nullState    : 0,    ///< point does not exist
    b2_addState     : 1,    ///< point was added in the update
    b2_persistState : 2,    ///< point persisted across the update
    b2_removeState  : 3     ///< point was removed in the update
};

//---------------------------------------------------------------------------------------------
function b2GetPointStates(state1, state2, manifold1, manifold2)
{
    for (var i = 0; i < b2_maxManifoldPoints; ++i)
    {
        state1[i] = b2PointState.b2_nullState;
        state2[i] = b2PointState.b2_nullState;
    }

    // Detect persists and removes.
    for (var i = 0; i < manifold1.m_pointCount; ++i)
    {
        var id = manifold1.m_points[i].m_id;

        state1[i] = b2PointState.b2_removeState;

        for (var j = 0; j < manifold2.m_pointCount; ++j)
        {
            if (manifold2.m_points[j].m_id.key == id.key)
            {
                state1[i] = b2PointState.b2_persistState;
                break;
            }
        }
    }

    // Detect persists and adds.
    for (var i = 0; i < manifold2.m_pointCount; ++i)
    {
        var id = manifold2.m_points[i].m_id;

        state2[i] = b2PointState.b2_addState;

        for (var j = 0; j < manifold1.m_pointCount; ++j)
        {
            if (manifold1.m_points[j].m_id.key == id.key)
            {
                state2[i] = b2PointState.b2_persistState;
                break;
            }
        }
    }
}

//---------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------
//  GCPhysicsBox2d : GCEventTarget
//---------------------------------------------------------------------------------------------
function GCPhysicsBox2d()
{
    if (GCPhysicsBox2d.prototype._SingletonInstance)
    {
        return GCPhysicsBox2d.prototype._SingletonInstance;
    }
    GCPhysicsBox2d.prototype._SingletonInstance = this;
    
    GCEventTarget.call(this);
    
    this.world = null;
    this.isSimulate = false;
    this.isWorldReady = false;
    this.velocityIterations = 8;
    this.positionIterations = 1;
};

//---------------------------------------------------------------------------------------------
GCPhysicsBox2d.prototype = Object.create(GCEventTarget.prototype);
GCPhysicsBox2d.prototype.constructor = GCPhysicsBox2d;

//---------------------------------------------------------------------------------------------
GCPhysicsBox2d.prototype.Terminate = function()
{
    //...
    
    GCPhysicsBox2d.prototype._SingletonInstance = null;
};

//---------------------------------------------------------------------------------------------
GCPhysicsBox2d.prototype.CreateWorld = function(gravity)
{
    if (this.isWorldReady)
    {
        return;
    }
    
    if (gravity == undefined)
    {
        gravity = new b2Vec2(0, -98);
    }
    
    this.world = new b2World(gravity, true);
    this.world.SetContinuousPhysics(true);
    this.isWorldReady = true;
    b2Settings.b2_velocityThreshold *= 32;
    b2Settings.b2_maxLinearCorrection *= 32;
    b2Settings.b2_maxTranslation *= 32;
    b2Settings.b2_maxTranslationSquared = b2Settings.b2_maxTranslation*b2Settings.b2_maxTranslation;
};

//---------------------------------------------------------------------------------------------
GCPhysicsBox2d.prototype.GetWorld = function()
{
    return this.world;
};

//---------------------------------------------------------------------------------------------
GCPhysicsBox2d.prototype.StartSimulate = function()
{
    if (this.isSimulate)
    {
        return;
    }
    
    this.isSimulate = true;
    var director = cc.Director.getInstance();
    director.getScheduler().scheduleUpdateForTarget(this, 0, false);
};

//---------------------------------------------------------------------------------------------
GCPhysicsBox2d.prototype.StopSimulate = function()
{
    if (!this.isSimulate)
    {
        return;
    }
    
    this.isSimulate = false;
    var director = cc.Director.getInstance();
    director.getScheduler().unscheduleUpdateForTarget(this);
};

//---------------------------------------------------------------------------------------------
GCPhysicsBox2d.prototype.IsSimulate = function()
{
    return this.isWorldReady && this.isSimulate;
};

//---------------------------------------------------------------------------------------------
// cc.Scheduler.scheduleUpdateForTarget callback
GCPhysicsBox2d.prototype.update = function(dt)
{
    // It is recommended that a fixed time step is used with Box2D for stability
    // of the simulation, however, we are using a variable time step here.
    // You need to make an informed choice, the following URL is useful
    // http://gafferongames.com/game-physics/fix-your-timestep/
    
    // Iterate over the bodies in the physics world
    for (var b = this.world.GetBodyList(); b; b = b.GetNext())
    {
        if (b.GetUserData() != null)
        {
            if (b.GetType() == b2Body.b2_kinematicBody)
            {
                // Synchronize the AtlasSprites position and rotation with the corresponding body
                var userData = b.GetUserData();
                var root = userData;
                var offsetX = 0;
                var offsetY = 0;
                if (userData instanceof GCPhysicsUserData)
                {
                    root = userData.root;
                    offsetX = userData.offsetX;
                    offsetY = userData.offsetY;
                }
                
                var posX = root.getPosition().x;
                var posY = root.getPosition().y;
                var rot = root.getRotation();
                posX = (parseInt(posX) + offsetX) * MTP_RATIO;
                posY = (parseInt(posY) + offsetY) * MTP_RATIO;
                b.SetPositionAndAngle(new b2Vec2(posX, posY), -1*cc.DEGREES_TO_RADIANS(rot));
            }
        }
    }
    
    // Instruct the world to perform a single step of simulation. It is
    // generally best to keep the time step and iterations fixed.
    this.world.Step(dt, this.velocityIterations, this.positionIterations);
    
    // Iterate over the bodies in the physics world
    for (var b = this.world.GetBodyList(); b; b = b.GetNext())
    {
        if (b.GetUserData() != null)
        {
            if (b.GetType() == b2Body.b2_dynamicBody)
            {
                // Synchronize the AtlasSprites position and rotation with the corresponding body
                var userData = b.GetUserData();
                var root = userData;
                var offsetX = 0;
                var offsetY = 0;
                if (userData instanceof GCPhysicsUserData)
                {
                    root = userData.root;
                    offsetX = userData.offsetX;
                    offsetY = userData.offsetY;
                }
                
                var posX = b.GetPosition().x;
                var posY = b.GetPosition().y;
                posX = (posX - offsetX) * PTM_RATIO;
                posY = (posY - offsetY) * PTM_RATIO;
                root.setPosition(cc.p(posX, posY));
                root.setRotation(-1*cc.RADIANS_TO_DEGREES(b.GetAngle()));
            }
        }
    }
};

//---------------------------------------------------------------------------------------------
//  GCPhysicsUserData
//---------------------------------------------------------------------------------------------
function GCPhysicsUserData(gameObj, root, offsetX, offsetY)
{
    this.gameObj = gameObj;
    
    if (root != undefined)
    {
        this.root = root;
    }
    else if (gameObj != undefined)
    {
        this.root = gameObj.root;
    }
    
    if (offsetX != undefined)
    {
        this.offsetX = offsetX;
    }
    else
    {
        this.offsetX = 0;
    }
        
    if (offsetY != undefined)
    {
        this.offsetY = offsetY;
    }
    else
    {
        this.offsetY = 0;
    }
};

//---------------------------------------------------------------------------------------------

