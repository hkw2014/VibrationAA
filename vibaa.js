(function() {
  var aaDetect, main, strBytes, strMatches;

  aaDetect = function() {
    var elem, elems, fullSpaces, halfSpaces, i, pres, totalBytes, _i, _len;
    pres = document.body.getElementsByTagName("pre");
    elems = [];
    i = 0;
    for (_i = 0, _len = pres.length; _i < _len; _i++) {
      elem = pres[_i];
      console.log(i);
      totalBytes = strBytes(elem.innerText);
      console.log("Bytes: " + totalBytes);
      halfSpaces = strMatches(elem.innerText, ' ');
      console.log('半角スペース' + halfSpaces);
      fullSpaces = strMatches(elem.innerText, '　');
      console.log('全角スペース' + fullSpaces);
      if ((halfSpaces + fullSpaces * 2) / totalBytes >= 0.1) {
        elems.push(elem);
        console.log("ADD");
      }
      i += 1;
    }
    return console.log(elems);
  };

  strBytes = function(str) {
    var c, i, r, _i, _ref;
    r = 0;
    for (i = _i = 0, _ref = str.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      c = str.charCodeAt(i);
      if ((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
        r += 1;
      } else {
        r += 2;
      }
    }
    console.log('r:' + r);
    return r;
  };

  strMatches = function(str, para) {
    var c, i, pCode, r, _i, _ref;
    r = 0;
    pCode = para.charCodeAt(0);
    for (i = _i = 0, _ref = str.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      c = str.charCodeAt(i);
      if (c === pCode) {
        r += 1;
      }
    }
    return r;
  };

  main = function() {
    var elems;
    elems = aaDetect();
    return console.log("fin");
  };

  main();

}).call(this);
