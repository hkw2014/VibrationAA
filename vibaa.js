(function() {
  var aaDetect, main, strBytes, strMatches;

  aaDetect = function() {
    var elem, elems, fullSpaces, halfSpaces, i, totalBytes, _i, _len;
    alert("vibaa");
    console.log("vibaa!!");
    elems = document.body.getElementsByTagName("pre");
    i = 0;
    console.log("now");
    for (_i = 0, _len = elems.length; _i < _len; _i++) {
      elem = elems[_i];
      console.log(i);
      totalBytes = strBytes(elem.innerText);
      console.log(totalBytes);
      halfSpaces = strMatches(elem.innerText(" "));
      fullSpaces = strMatches(elem.innerText("　"));
      console.log(totalBytes + "," + halfSpaces + "," + fullSpaces);
      i += 1;
    }
    return elems;
  };

  strBytes = function(str) {
    var c, i, r, _i, _ref, _results;
    r = 0;
    _results = [];
    for (i = _i = 0, _ref = str.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      c = str.charCodeAt(i);
      if ((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
        _results.push(r += 1);
      } else {
        _results.push(r += 2);
      }
    }
    return _results;
  };

  strMatches = function(str, para) {
    var c, i, r, _i, _ref, _results;
    console.log("startMatches");
    r = 0;
    _results = [];
    for (i = _i = o, _ref = str.length - 1; o <= _ref ? _i <= _ref : _i >= _ref; i = o <= _ref ? ++_i : --_i) {
      c = str.charCodeAt(i);
      if (c === para) {
        _results.push(r += 1);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  main = function() {
    var elems;
    elems = aaDetect();
    return console.log("fin");
  };

  main();

}).call(this);
