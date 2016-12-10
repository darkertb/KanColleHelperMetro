var App = function(){
    this.bukunReach = [
		{ bukun: 2000, rBukun: 500, srBukun: 500, glory: 500 },
		{ bukun: 286, rBukun: 72, srBukun: 72, glory: 72 },
		{ bukun: 572, rBukun: 143, srBukun: 143, glory: 143 },
		{ bukun: 858, rBukun: 215, srBukun: 215, glory: 215 },
		{ bukun: 1143, rBukun: 286, srBukun: 286, glory: 286 },
		{ bukun: 1429, rBukun: 358, srBukun: 358, glory: 358 },
		{ bukun: 1715, rBukun: 429, srBukun: 429, glory: 429 }
	];

    this.bonusVal = {
        'bukun': { self: 40, other: 10 },
        'rBukun': { self: 8, other: 8 },
        'srBukun': { self: 4, other: 4 },
        'glory': { self: 40, other: 20 }
    }

    this.nowWeekDay = -1;

    this.bonusList = [ 'bukun', 'rBukun', 'srBukun', 'glory' ];
};

App.prototype.Diff = function(nowBukun) {
    var result = {};
    var reach = this.bukunReach[this.nowWeekDay];

    for(let item of this.bonusList) {
        result[item] = reach[item] - nowBukun[item];
    }

    return result;
}

App.prototype.CountDiff = function(type, val) {
    var result = {};

    var reachDiff = this.bukunReach[this.nowWeekDay][type] - val;
    result.self = reachDiff / this.bonusVal[type].self;
    result.other = reachDiff / this.bonusVal[type].other;

    result.self = Math.ceil(this.Clamp(result.self));
    result.other = Math.ceil(this.Clamp(result.other));
    return result;
}

App.prototype.Clamp = function(val) {
    return val >= 0 ? val : 0;
}


App.prototype.GetWeekday = function(arguments) {
    var d = new Date();
    d.setHours(d.getHours() - 4);
    return d.getDay();
}


var app = new App();