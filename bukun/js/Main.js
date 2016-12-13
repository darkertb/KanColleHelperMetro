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
        {key: 'canget', name: '本週還可獲得'},
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
    var CountDiff = app.CountDiff(nowBukun);
    var progressState = app.ProgressState(nowBukun);
    var diffWeek = app.DiffWeek(nowBukun);      
    if (app.nowWeekDay == 0 && diffWeek.bukun > 1000)
        diffWeek.bukun = 1000;
        
    for(let item of app.bonusList) {
        $('table.result tbody tr td.' + item).text(diff[item]);
        $('table.count tbody tr td.' + item).text('自発: '+ CountDiff[item].self + ' 救援: ' + CountDiff[item].other + ' 場');
        $('table.canget tbody tr td.' + item).text(app.Clamp(diffWeek[item]));

        $('table:not(.canget) tbody tr td.' + item).css('background-color', app.progressColor[progressState[item]]);
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
    
    return true;
}