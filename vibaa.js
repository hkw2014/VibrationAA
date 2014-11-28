
/*
HTML文書から複数行のAAを検出
@param document
@return elementの配列
 */

(function() {
  var aaDetect, main, strBytes, strMatches;

  aaDetect = function(doc) {
    var elem, elems, fullSpaces, halfSpaces, i, pres, spaceRate, totalBytes, _i, _len;
    pres = doc.body.getElementsByTagName("pre");
    elems = [];
    i = 0;
    for (_i = 0, _len = pres.length; _i < _len; _i++) {
      elem = pres[_i];
      console.log(i);
      console.log(elem.innerText);
      totalBytes = strBytes(elem.innerText);
      console.log("Bytes: " + totalBytes);
      halfSpaces = strMatches(elem.innerText, ' ');
      console.log('半角スペース' + halfSpaces);
      fullSpaces = strMatches(elem.innerText, '　');
      console.log('全角スペース' + fullSpaces);
      spaceRate = (halfSpaces + fullSpaces * 2) / totalBytes;
      console.log("スペース率: " + (spaceRate * 100) + " %");
      if (spaceRate >= 0.1) {
        elems.push(elem);
        console.log("ADD");
      }
      i += 1;
    }
    return elems;
  };


  /*
  文字バイト数をカウント（全角:2バイト,半角:1バイト）
  @param 文字列
  @return 総バイト数
   */

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
    return r;
  };


  /*
  文字列に指定した文字がどのくらい含まれるのかをカウント
  @param 文字列
  @param 指定した文字(1文字目の文字をカウント)
  @return 指定した文字が含まれる数
   */

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
    elems = aaDetect(document);
    console.log(elems);
    return console.log("fin");
  };

  main();

}).call(this);
