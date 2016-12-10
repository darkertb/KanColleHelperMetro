// Main*
for (var key in app.bukunReach) {
    for(let item of app.bonusList) {
        $('tr.' + key + '-d').append('<td>' + app.bukunReach[key][item] + '</td>');
    }
}

if(SetFocusWeekday())
    SetRecord();

window.addEventListener("focus", function(event) { 
        if(SetFocusWeekday())
            SetRecord();
    }, false);

for(let item of app.bonusList) {
    $('#' + item).change(function () {
        SetRecord();
    });
}
// *Main

function SetRecord () {
    var nowBukun = {};

    for(let item of app.bonusList) {
        nowBukun[item] = $('#' + item).val();
    }

    var diff = app.Diff(nowBukun);
            
    var CountDiff = {};
    for(let item of app.bonusList) {
        CountDiff[item] = app.CountDiff(item, nowBukun[item]);    
    }
        
    for(let item of app.bonusList) {
        $('table.result tbody tr td.' + item).text(diff[item]);
        $('table.count tbody tr td.' + item).text('自発: '+ CountDiff[item].self + ' 救援: ' + CountDiff[item].other + ' 場');
    }
    $('p.count-bukun').text('武勲: 自発: '+ CountDiff.bukun.self + ' 救援: ' + CountDiff.bukun.other + ' 場');
    $('p.count-rBukun').text('R武勲: 自発: '+ CountDiff.rBukun.self + ' 救援: ' + CountDiff.rBukun.other + ' 場');
    $('p.count-srBukun').text('SR武勲: 自発: '+ CountDiff.srBukun.self + ' 救援: ' + CountDiff.srBukun.other + ' 場');
    $('p.count-glory').text('榮耀: 自発: '+ CountDiff.glory.self + ' 救援: ' + CountDiff.glory.other + ' 場');
}

function SetFocusWeekday () {
    var newWeekday = app.GetWeekday();
		
    if (app.nowWeekDay == newWeekday)
        return false;

    for (var i = 0; i < 7; i++) {
        $('.' + i + '-d').css("background-color", "#FFF");
    }		
    
    $('.' + newWeekday + '-d').css("background-color", "#BCF5A9");
    
    app.nowWeekDay = newWeekday;
    
    return true;
}