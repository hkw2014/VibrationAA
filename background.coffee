chrome.tabs.onUpdated.addListener (tabId, changeInfo, tab) ->
	chrome.pageAction.show tabId

chrome.pageAction.onClicked.addListener ->
  chrome.tabs.executeScript null, {
    "code": "document.body.style.backgroundColor = 'red'"
  }