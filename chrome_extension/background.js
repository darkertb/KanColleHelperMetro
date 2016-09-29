// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
	var context = "link";
	var title = "Open with DarkerTV";
	
	/*
	var rootId = chrome.contextMenus.create({"title": 'DarkerTV', "contexts":[context, 'selection', 'page'], "id": 'root'});
	chrome.contextMenus.create({"title": 'Open with DarkerTV', 'parentId': rootId, "contexts":[context, 'selection'], "id": 'open'});
	chrome.contextMenus.create({"title": 'Copy to clipboard', 'parentId': rootId, "contexts":[context, 'selection'], "id": 'copy'});
	chrome.contextMenus.create({"title": 'Open with DarkerTV by URL', 'parentId': rootId, "contexts":['page'], "id": 'openURL'});
	*/
	
	chrome.contextMenus.create({"title": 'Open with DarkerTV', "contexts":[context, 'selection'], "id": 'open'});
	chrome.contextMenus.create({"title": 'Open with DarkerTV by URL', "contexts":['page'], "id": 'openURL'});
	chrome.contextMenus.create({"title": '(́◕◞౪◟◕‵)', "contexts":['page'], "id": 'fkFace'});
});

chrome.browserAction.onClicked.addListener(function(tab) {
	CopyText('(́◕◞౪◟◕‵)');
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
	if (info.menuItemId == 'fkFace') {
		CopyText('(́◕◞౪◟◕‵)');
		return;
	}

	var sourceUrl = '';
	
	if (info.menuItemId == 'openURL')
		sourceUrl = tab.url;
	else
		sourceUrl = (info.selectionText) ? info.selectionText : info.linkUrl;
			
	var url = 'https://darkertb.github.io/MyTV/?v=';
	
	var streamInfo = [];
	
	sourceUrl = RemoveHTTP(sourceUrl);
	
	streamInfo = GetStreamInfo(sourceUrl);
	
	var streamId = RemoveURLParameters(streamInfo.id);
	var streamChannel = streamInfo.channel;

	if (streamId != '' && streamChannel != ''){
		url += streamId + '-' + streamChannel + '&c=s';
		
		if (info.menuItemId == 'open' || info.menuItemId == 'openURL' ) {
			//window.open(url, '_blank');
			chrome.tabs.update(tab.id, {
				url: url
			});
		}
		else if (info.menuItemId == 'copy') {
			CopyText(url);
		}
			
	}
};

function CopyText (_msg) {
	var input = document.createElement('textarea');
			document.body.appendChild(input);
			input.value = _msg;
			input.focus();
			input.select();
			document.execCommand('Copy');
			input.remove();
}

//各實況平台資料表
function GetChannelInfo () {
	var info = [
		{'key': 'twitch', 'url': 'www.twitch.tv/', 'channel': 'TTV'},
		{'key': 'vaughnlive', 'url': 'vaughnlive.tv/', 'channel': 'VL'},
		{'key': 'breakers', 'url': 'breakers.tv/', 'channel': 'BRK'},
		{'key': 'hitbox', 'url': 'www.hitbox.tv/', 'channel': 'HIT'},
		{'key': 'ustream', 'url': 'www.ustream.tv/channel/', 'channel': 'UST'},
		{'key': 'youtube', 'url': 'www.youtube.com/watch?v=', 'channel': 'YT'},
		{'key': 'streamup', 'url': 'streamup.com/', 'channel': 'STUP'},
		{'key': 'connectcast', 'url': 'www.connectcast.tv/', 'channel': 'CC'},
		{'key': 'livehouse', 'url': 'livehouse.in/channel/', 'channel': 'LH'},
		{'key': 'beam', 'url': 'beam.pro/', 'channel': 'BEAM'},
	];
	
	return info;
}

//刪除HTTP抬頭
function RemoveHTTP (_url) {
	if (_url.indexOf('http://') > -1) _url = _url.replace('http://', '');
	if (_url.indexOf('https://') > -1) _url = _url.replace('https://', '');
	
	return _url;
}

//刪除ID後面的各種參數
function RemoveURLParameters (_url) {
	if (_url.indexOf('/') > -1)
		_url = _url.substring(0, _url.indexOf('/'));
	if (_url.indexOf('?') > -1)
		_url = _url.substring(0, _url.indexOf('?'));
	
	return _url;
}

//從URL取得實況ID與平台類型
function GetStreamInfo (_url) {
	var result = {'channel': '', 'id': ''};
	var channelInfo = GetChannelInfo();
	
	for (var i = 0; i < channelInfo.length; i++) {
		var key = channelInfo[i]['key'];
		
		if (_url.indexOf(key) > -1) {
			result.channel = channelInfo[i]['channel'];
			result.id = _url.replace(channelInfo[i]['url'], '');
			
			break;
		}
	}	
	
	return result; 
}