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
    this.progressColor = [ '#fff', '#efffe9', '#ffeed5', '#ffd3d3', '#bd4848' ];
};

App.prototype.DaliyAkashi = function() {
    var ytdGlory = this.GetYesterdayReach().glory;
    var todayGlory = this.bukunReach[this.nowWeekDay].glory - ytdGlory;
    todayGlory += ytdGlory % 20;

    return Math.floor(todayGlory / 20);
}

App.prototype.ProgressState = function(nowBukun) {
    var todayReach = this.bukunReach[this.nowWeekDay];
    var yesterdayReach = this.GetYesterdayReach();
    var result = {bukun: 0, rBukun: 0, srBukun: 0, glory: 0};

    // 0: normal, 1: completed, 2: warning, 3: delay, 4: failed
    for(let item of this.bonusList) {
        var diffYesterday = yesterdayReach[item] - nowBukun[item];
        var diffToday = todayReach[item] - nowBukun[item];
        
        if (diffYesterday > 0) {    // delay
            if (item == 'bukun' && this.nowWeekDay == 0 && nowBukun[item] < 1000)
                result[item] = 4;
            else
                result[item] = 3;
        }   
        else if (diffToday <= 0) {  // completed
            result[item] = 1;
        }
        else if (this.IsWarningTime()) {
            result[item] = 2;
        }
    }

    return result;
}

App.prototype.DiffToday = function(nowBukun) {
    return this.Diff(nowBukun);
}

App.prototype.DiffWeek = function(nowBukun) {
    return this.Diff(nowBukun, this.bukunReach[0]);
}

App.prototype.Diff = function(nowBukun, reach) {
    var result = {};
    if (reach == undefined)
        reach = this.bukunReach[this.nowWeekDay];

    for(let item of this.bonusList) {
        result[item] = reach[item] - nowBukun[item];
    }

    return result;
}

App.prototype.CountDiff = function(nowBukun, reach) {
    var result = {};
    if (reach == undefined)
        reach = this.bukunReach[this.nowWeekDay];

    for(let item of app.bonusList) {
        var reachDiff = reach[item] - nowBukun[item];
        result[item] = {};

        result[item].self = reachDiff / this.bonusVal[item].self;
        result[item].other = reachDiff / this.bonusVal[item].other;

        result[item].self = Math.ceil(this.Clamp(result[item].self));
        result[item].other = Math.ceil(this.Clamp(result[item].other));
    }
    return result;
}

App.prototype.Clamp = function(val) {
    return val >= 0 ? val : 0;
}

App.prototype.IsWarningTime = function() {
    var now = new Date();
    var timeup = new Date();
    timeup.setHours(4, 0, 0, 0);

    if (now.getHours() >= 4)
        timeup.setDate(timeup.getDate() + 1);

    return (timeup - now < 16200000);
}

App.prototype.GetYesterdayReach = function() {
    var result = {bukun: 0, rBukun: 0, srBukun: 0, glory: 0};

    if (this.nowWeekDay != 1) {
        var yesterday = this.nowWeekDay == 0 ? 6 : (this.nowWeekDay - 1);
        result = this.bukunReach[yesterday];
    }

    return result;
}

App.prototype.GetWeekday = function(arguments) {
    var d = new Date();
    d.setHours(d.getHours() - 4);
    return d.getDay();
}


var app = new App();