(function() {
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    return chrome.pageAction.show(tabId);
  });

  chrome.pageAction.onClicked.addListener(function() {
    return chrome.tabs.executeScript(null, {
      "code": "document.body.style.backgroundColor = 'red'"
    });
  });

}).call(this);
