// Main*
for (var key in app.bukunReach) {
    for(let item of app.bonusList) {
        $('tr.' + key + '-d').append('<td>' + app.bukunReach[key][item] + '</td>');
    }
}

if(SetFocusWeekday())
    SetRecord();

window.addEventListener("focus", function(event) { 
        if(SetFocusWeekday() || app.IsWarningTime())
            SetRecord();
    }, false);

for(let item of app.bonusList) {
    $('#' + item).change(function () {
        SetRecord();
    });
}

RegisterTable();

// *Main

function RegisterTable (arguments) {
    var tableList = [ 
        {key: 'result', name: '本日差額'}, 
        {key: 'count', name: '本日差場'}, 
        {key: 'days-diff', name: '本周進度(天)'},
        {key: 'canget', name: '本週還可獲得'},
        {key: 'week-count', name: '本週還需場次'},
        {key: 'reach', name: '本週標準'}
    ];

    for(let item of tableList) {
        $('p.' + item.key).click(function() {
        if ($('table.' + item.key).is(":visible")){
            $('table.' + item.key).hide();
            $('p.' + item.key).text(item.name + ' ▼');
        }
        else{
            $('table.' + item.key).show();        
            $('p.' + item.key).text(item.name + ' ▲');
        }
        });
    }
}

function SetRecord () {
    var nowBukun = {};

    for(let item of app.bonusList) {
        nowBukun[item] = $('#' + item).val();
    }

    var diff = app.DiffToday(nowBukun);      
    var diffWeek = app.DiffWeek(nowBukun);      
    var countDiff = app.CountDiff(nowBukun);
    var countDiffWeek = app.CountDiff(nowBukun, app.bukunReach[0]);
    var daysDiff = app.DaysDiff(diff);
    var progressState = app.ProgressState(nowBukun);
    if (app.nowWeekDay == 0 && diffWeek.bukun > 1000)
        diffWeek.bukun = 1000;
        
    for(let item of app.bonusList) {
        $('table.result tbody tr td.' + item).text(diff[item]);
        $('table.days-diff tbody tr td.' + item).text(daysDiff[item] + '天');
        $('table.count tbody tr td.' + item).text('自発: '+ countDiff[item].self + ' 救援: ' + countDiff[item].other + ' 場');
        $('table.week-count tbody tr td.' + item).text('自発: '+ countDiffWeek[item].self + ' 救援: ' + countDiffWeek[item].other + ' 場');
        $('table.canget tbody tr td.' + item).text(app.Clamp(diffWeek[item]));

        $('table:not(.canget):not(.week-count) tbody tr td.' + item).css('background-color', app.progressColor[progressState[item]]);
    }
    
    var bukunDiffSum = diffWeek.bukun + diffWeek.rBukun + diffWeek.srBukun;
    $('table.canget tbody tr td.bukunSum').text(app.Clamp(bukunDiffSum));
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
    
    $('p.akashi-count').text('本日可換 ' + app.DaliyAkashi() + ' 個勳章');
    
    return true;
}