(function() {
  chrome.browserAction.onClicked.addListener(function() {
    alert("韓国吸収！");
    return chrome.tabs.executeScript(null, {
      "code": "document.body.innerHTML = " + "document.body.innerHTML.replace(/韓国/g,'朝鮮');"
    });
  });

}).call(this);
