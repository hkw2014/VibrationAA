chrome.browserAction.onClicked.addListener ->
<<<<<<< HEAD
	alert "韓国吸収！"
	chrome.tabs.executeScript null, { "code" : "document.body.innerHTML = " + "document.body.innerHTML.replace(/韓国/g,'朝鮮');"; }
	chrome.tabs.executeScript null, { "code" : "document.body.innerHTML = " + "document.body.innerHTML.replace(/北朝鮮/g,'朝鮮');"; }
=======
	alert "ボタンが押された"
	# chrome.tabs.executeScript null, { "code" : "document.body.innerHTML = " + "document.body.innerHTML.replace(/韓国/g,'朝鮮');"; }
	# chrome.tabs.executeScript null, { "code" : "document.body.innerHTML = " + "document.body.innerHTML.replace(/北朝鮮/g,'朝鮮');"; }
	 #chrome.tabs.executeScript null , { code: "var scriptOptions = {param1:'value1',param2:'value2'};"},
	chrome.tabs.executeScript null, {file:"vibaa.js";}
>>>>>>> 89f5f552a4f96f74107404856304a639c8901497
