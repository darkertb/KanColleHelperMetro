

//---------------------------------------------------------------------------------------------
//  GCEventTarget
//      �������ϥ�THREE.EventTarget, �]���L�k�ǻ��B�~�Ѽ�, 
//      �ӥBcallback�^��this���Шä��O���󥻨�, �ݳz�L�ǻ��ѼƶǦ^��.
//
//---------------------------------------------------------------------------------------------
function GCEventTarget()
{
    var listeners = {};

    //---------------------------------------------------------------------------------------------
    // Ref : http://stackoverflow.com/questions/332422/how-do-i-get-the-name-of-an-objects-type-in-javascript
    //  **** important ****
    //  Constructor �g�k�n�� function MyClass() {}; �~�|�쪺��Class Name !!
    //  MyClass.prototype = Object.create(Parent.prototype);
    //  MyClass.prototype.constructor = MyClass;
    //
    this.ClassName = function()
    {
        return GetFuncName(this.constructor);
    };

    // AddEventListener useage
    //  WithOut Args : (cannt use 'this' pointer.)
    //      Object.AddEventListener('string', Object.callbackfunc);
    //
    //  With Args : (can use 'this' pointer.)
    //      Object.AddEventListener('string', Object.callbackfunc, Object, {arg0:val0, arg1:val1 ...});
    //
    //  callbackfunc = function(event, args) { args.arg0.... };
    this.AddEventListener = function(type, listener, object, args)
    {
        if (listeners[type] == undefined)
        {
            listeners[type] = [];
        }
        
        for (var index in listeners[type])
        {
            var obj = listeners[type][index];
            if (obj.func == listener && obj.object == object)
            {
                return;
            }
        }
        
        var obj = {};
        obj.func = listener;
        obj.object = object;
        obj.args = args;
        listeners[type].push(obj);
    };

    // DispatchEvent useage Object.DispatchEvent({type: 'string'});
    this.DispatchEvent = function(event)
    {
        var temp = [];
        for (var index in listeners[event.type])
        {
            var obj = listeners[event.type][index];
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

    // RemoveEventListener useage Object.RemoveEventListener('string');
    this.RemoveEventListener = function(type, listener, object)
    {
        var temp = [];
        for (var index in listeners[type])
        {
            var obj = listeners[type][index];
            if (obj.func == listener && obj.object == object)
            {
                temp.push(index);
            }
        }
        
        for (var index in temp)
        {
            listeners[type].splice(temp[index], 1);
        }
    };

};

//---------------------------------------------------------------------------------------------