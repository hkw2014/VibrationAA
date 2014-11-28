chrome.browserAction.onClicked.addListener ->
	#alert "ボタンが押された"
	# chrome.tabs.executeScript null, { "code" : "document.body.innerHTML = " + "document.body.innerHTML.replace(/韓国/g,'朝鮮');"; }
	# chrome.tabs.executeScript null, { "code" : "document.body.innerHTML = " + "document.body.innerHTML.replace(/北朝鮮/g,'朝鮮');"; }
	 #chrome.tabs.executeScript null , { code: "var scriptOptions = {param1:'value1',param2:'value2'};"},
	chrome.tabs.executeScript null, {file:"vibaa.js";}
