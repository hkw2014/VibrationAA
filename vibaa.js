
/*
HTML文書から複数行のAAを検出
@param document
@return elementの配列
 */

(function() {
  var aaDetect, getBlock, main, strBytes, strMatches;

  aaDetect = function(doc) {
    var dds, divs, elem, elems, fullSpaces, halfSpaces, i, j, pres, spaceRate, tmpEles, totalBytes, _i, _j, _k, _l, _len, _len1, _len2, _len3;
    tmpEles = [];
    doc.body = getBlock(doc.body);
    dds = doc.body.getElementsByTagName("dd");
    for (_i = 0, _len = dds.length; _i < _len; _i++) {
      i = dds[_i];
      i.parentNode.replaceChild(getBlock(i), i);
    }
    divs = doc.body.getElementsByClassName('blocked');
    pres = doc.body.getElementsByTagName("pre");
    for (_j = 0, _len1 = pres.length; _j < _len1; _j++) {
      j = pres[_j];
      tmpEles.push(j);
    }
    for (_k = 0, _len2 = divs.length; _k < _len2; _k++) {
      j = divs[_k];
      tmpEles.push(j);
    }
    elems = [];
    i = 0;
    for (_l = 0, _len3 = tmpEles.length; _l < _len3; _l++) {
      elem = tmpEles[_l];
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
  DIVでブロック分けしたDOMを取得
  @param element(ex. document.body)
  @return 行がブロック分けされたDOM
   */

  getBlock = function(elem) {
    var brCount, c_nodes, g, i, n, res, t2elem, telem, tmp, _i, _j, _len, _len1;
    telem = elem.cloneNode(true);
    t2elem = elem.cloneNode(true);
    c_nodes = t2elem.childNodes;
    res = elem.cloneNode(false);
    telem = elem.cloneNode(true);
    console.log(c_nodes);
    for (_i = 0, _len = c_nodes.length; _i < _len; _i++) {
      i = c_nodes[_i];
      console.log(i);
    }
    n = 0;
    brCount = 0;
    tmp = document.createElement('div');
    tmp.setAttribute('class', 'blocked');
    for (_j = 0, _len1 = c_nodes.length; _j < _len1; _j++) {
      g = c_nodes[_j];
      console.log('---今から処理する要素---');
      console.log(n);
      console.log(g);
      console.log('nodeName=' + g.nodeName);
      console.log('g=' + g.nodeValue);
      console.log(tmp);
      console.log('------');
      if (((g.nodeName === '#text') || (g.nodeName === 'BR')) === false) {
        console.log(g);
        res.appendChild(tmp.cloneNode(true));
        tmp = document.createElement('div');
        tmp.setAttribute('class', 'blocked');
        if (g.tagName === 'SCRIPT' || g.tagName === 'PRE' || g.nodeName === '#comment' || g.tagName === 'SPAN') {
          res.appendChild(g.cloneNode(true));
        } else {
          res.appendChild((getBlock(g.cloneNode(true))).cloneNode(true));
        }
        tmp = document.createElement('div');
        tmp.setAttribute('class', 'blocked');
      } else {
        console.log(g + 'in else');
        console.log('brCount : ' + brCount);
        if (g.tagName !== 'BR') {
          if (brCount > 1) {
            res.appendChild(tmp.cloneNode(true));
            tmp = document.createElement('div');
            tmp.setAttribute('class', 'blocked');
            tmp.appendChild(g.cloneNode(true));
          } else {
            tmp.appendChild(g.cloneNode(true));
          }
          brCount = 0;
        } else if (g.tagName === 'BR') {
          brCount++;
          tmp.appendChild(g.cloneNode(true));
        }
      }
      n++;
    }
    res.appendChild(tmp.cloneNode(true));
    console.log('getBlock結果');
    console.log(res);
    return res;
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
    var e, elems, oTxt, scp1, scp2, scp3, scp4, scp5, _i, _len;
    elems = aaDetect(document);
    console.log(elems);
    for (_i = 0, _len = elems.length; _i < _len; _i++) {
      e = elems[_i];
      console.log(e);
      oTxt = "<div class='vibrumble'>" + e.outerHTML + "</div>";
      e.outerHTML = oTxt;
      console.log(oTxt);

      /*
      		if e.hasAttribute('class') is false
      			e.setAttribute('class','vibrumble')
      		else
      			cls_Attr = e.getAttribute('class')
      			e.setAttribute('class',cls_Attr + ' vibrumble')
       */
    }
    console.log("要素追加開始");
    scp1 = document.createElement('link');
    scp1.setAttribute('href', "http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css");
    scp1.setAttribute('rel', 'stylesheet');
    scp1.setAttribute('type', 'text/css');
    document.head.appendChild(scp1);
    scp2 = document.createElement('script');
    scp2.setAttribute('src', "http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js");
    scp2.setAttribute('type', 'text/javascript');
    document.head.appendChild(scp2);
    scp3 = document.createElement('script');
    scp3.setAttribute('src', "http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js");
    scp3.setAttribute('type', 'text/javascript');
    document.head.appendChild(scp3);
    console.log("今からjRumble挿入");
    scp4 = document.createElement('script');
    scp4.setAttribute('type', 'text/javascript');
    scp4.innerHTML = "	/*\njRumble v1.3 - http://jackrugile.com/jrumble\nby Jack Rugile - http://jackrugile.com\n\nMIT License\n-----------------------------------------------------------------------------\nCopyright (c) 2012 Jack Rugile, http://jackrugile.com\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n*/\n\n(function($){\n$.fn.jrumble = function(options){\n	\n	/*========================================================*/\n	/* Options\n	/*========================================================*/\n	var defaults = {\n		x: 2,\n		y: 2,\n		rotation: 1,\n		speed: 15,\n		opacity: false,\n		opacityMin: .5\n	},\n	opt = $.extend(defaults, options);	\n			\n	return this.each(function(){\n							  \n		/*========================================================*/\n		/* Variables\n		/*========================================================*/\n		var $this = $(this),				\n			x = opt.x*2,\n			y = opt.y*2,\n			rot = opt.rotation*2,\n			speed = (opt.speed === 0) ? 1 : opt.speed,			\n			opac = opt.opacity,\n			opacm = opt.opacityMin,\n			inline,\n			interval;\n		\n		/*========================================================*/\n		/* Rumble Function\n		/*========================================================*/		\n		var rumbler = function(){				\n			var rx = Math.floor(Math.random() * (x+1)) -x/2,\n				ry = Math.floor(Math.random() * (y+1)) -y/2,\n				rrot = Math.floor(Math.random() * (rot+1)) -rot/2,\n				ropac = opac ? Math.random() + opacm : 1;\n				\n			/*========================================================*/\n			/* Ensure Movement From Original Position\n			/*========================================================*/				\n			rx = (rx === 0 && x !== 0) ? ((Math.random() < .5) ? 1 : -1) : rx;\n			ry = (ry === 0 && y !== 0) ? ((Math.random() < .5) ? 1 : -1) : ry;	\n			\n			/*========================================================*/\n			/* Check Inline\n			/*========================================================*/\n			if($this.css('display') === 'inline'){\n				inline = true;\n				$this.css('display', 'inline-block');\n			}\n			\n			/*========================================================*/\n			/* Rumble Element\n			/*========================================================*/			\n			$this.css({\n				'position':'relative',\n				'left':rx+'px',\n				'top':ry+'px',\n				'-ms-filter':'progid:DXImageTransform.Microsoft.Alpha(Opacity='+ropac*100+')',\n				'filter':'alpha(opacity='+ropac*100+')',					\n				'-moz-opacity':ropac,					\n				'-khtml-opacity':ropac,					\n				'opacity':ropac,\n				'-webkit-transform':'rotate('+rrot+'deg)', \n				'-moz-transform':'rotate('+rrot+'deg)', \n				'-ms-transform':'rotate('+rrot+'deg)',\n				'-o-transform':'rotate('+rrot+'deg)', \n				'transform':'rotate('+rrot+'deg)'\n			});\n		};\n		\n		/*========================================================*/\n		/* Rumble CSS Reset\n		/*========================================================*/\n		var reset = {\n			'left':0,\n			'top':0,\n			'-ms-filter':'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)',\n			'filter':'alpha(opacity=100)',					\n			'-moz-opacity':1,					\n			'-khtml-opacity':1,					\n			'opacity':1,\n			'-webkit-transform':'rotate(0deg)',\n			'-moz-transform':'rotate(0deg)',\n			'-ms-transform':'rotate(0deg)',\n			'-o-transform':'rotate(0deg)',\n			'transform':'rotate(0deg)'\n		};\n		\n		/*========================================================*/\n		/* Rumble Start/Stop Trigger\n		/*========================================================*/\n		$this.bind({\n			'startRumble': function(e){\n				e.stopPropagation();\n				clearInterval(interval);\n				interval = setInterval(rumbler, speed)\n			},\n			'stopRumble': function(e){\n				e.stopPropagation();\n				clearInterval(interval);\n				if(inline){\n					$this.css('display', 'inline');\n				}\n				$this.css(reset);\n			}\n		});		\n		\n	});// End return this.each\n};// End $.fn.jrumble\n})(jQuery);";
    document.head.appendChild(scp4);
    console.log("kjk");
    scp5 = document.createElement('script');
    scp5.setAttribute('type', 'text/javascript');
    scp5.innerHTML = '$(function() {\n  $(\'.vibrumble\').jrumble({\n  x: 2, //ブルブルX\n  y: 2, //ブルブルY\n  rotation: 3, //ブルブル角度\n  });\n$(\'.vibrumble\').hover(function(){\n  $(this).trigger(\'startRumble\');\n  }, function(){\n  $(this).trigger(\'stopRumble\');\n });\n});';
    document.head.appendChild(scp5);
    return console.log("fin");
  };

  main();

}).call(this);
