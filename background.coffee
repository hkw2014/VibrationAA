chrome.browserAction.onClicked.addListener ->
	alert "韓国吸収！"
	chrome.tabs.executeScript null, { "code" : "document.body.innerHTML = " + "document.body.innerHTML.replace(/韓国/g,'朝鮮');"; }