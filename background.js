(function() {
  chrome.browserAction.onClicked.addListener(function() {
    return chrome.tabs.executeScript(null, {
      file: "vibaa.js"
    });
  });

}).call(this);
