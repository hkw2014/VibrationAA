(function() {
  chrome.browserAction.onClicked.addListener(function() {
    alert("ボタンが押された");
    return chrome.tabs.executeScript(null, {
      file: "vibaa.js"
    });
  });

}).call(this);
