
/*
HTML文書から複数行のAAを検出
@param document
@return elementの配列
 */

(function() {
  var aaDetect, main, strBytes, strMatches;

  aaDetect = function(doc) {
    var dds, elem, elems, fullSpaces, halfSpaces, i, j, pres, spaceRate, tmpEles, totalBytes, _i, _j, _k, _len, _len1, _len2;
    tmpEles = [];
    pres = doc.body.getElementsByTagName("pre");
    dds = doc.body.getElementsByTagName("dd");
    for (_i = 0, _len = pres.length; _i < _len; _i++) {
      j = pres[_i];
      tmpEles.push(j);
    }
    for (_j = 0, _len1 = dds.length; _j < _len1; _j++) {
      j = dds[_j];
      tmpEles.push(j);
    }
    elems = [];
    i = 0;
    for (_k = 0, _len2 = tmpEles.length; _k < _len2; _k++) {
      elem = tmpEles[_k];
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
    var cls_Attr, e, elems, scp1, scp2, scp3, scp4, scp5, _i, _len;
    elems = aaDetect(document);
    console.log(elems);
    for (_i = 0, _len = elems.length; _i < _len; _i++) {
      e = elems[_i];
      if (e.hasAttribute('class') === false) {
        e.setAttribute('class', 'vibrumble');
      } else {
        cls_Attr = e.getAttribute('class');
        e.setAttribute('class', cls_Attr + ' vibrumble');
      }
    }
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
    scp4 = document.createElement('script');
    scp4.setAttribute('type', 'text/javascript');
    scp4.innerHTML = "	/*\njRumble v1.3 - http://jackrugile.com/jrumble\nby Jack Rugile - http://jackrugile.com\n\nMIT License\n-----------------------------------------------------------------------------\nCopyright (c) 2012 Jack Rugile, http://jackrugile.com\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n*/\n\n(function($){\n$.fn.jrumble = function(options){\n	\n	/*========================================================*/\n	/* Options\n	/*========================================================*/\n	var defaults = {\n		x: 2,\n		y: 2,\n		rotation: 1,\n		speed: 15,\n		opacity: false,\n		opacityMin: .5\n	},\n	opt = $.extend(defaults, options);	\n			\n	return this.each(function(){\n							  \n		/*========================================================*/\n		/* Variables\n		/*========================================================*/\n		var $this = $(this),				\n			x = opt.x*2,\n			y = opt.y*2,\n			rot = opt.rotation*2,\n			speed = (opt.speed === 0) ? 1 : opt.speed,			\n			opac = opt.opacity,\n			opacm = opt.opacityMin,\n			inline,\n			interval;\n		\n		/*========================================================*/\n		/* Rumble Function\n		/*========================================================*/		\n		var rumbler = function(){				\n			var rx = Math.floor(Math.random() * (x+1)) -x/2,\n				ry = Math.floor(Math.random() * (y+1)) -y/2,\n				rrot = Math.floor(Math.random() * (rot+1)) -rot/2,\n				ropac = opac ? Math.random() + opacm : 1;\n				\n			/*========================================================*/\n			/* Ensure Movement From Original Position\n			/*========================================================*/				\n			rx = (rx === 0 && x !== 0) ? ((Math.random() < .5) ? 1 : -1) : rx;\n			ry = (ry === 0 && y !== 0) ? ((Math.random() < .5) ? 1 : -1) : ry;	\n			\n			/*========================================================*/\n			/* Check Inline\n			/*========================================================*/\n			if($this.css('display') === 'inline'){\n				inline = true;\n				$this.css('display', 'inline-block');\n			}\n			\n			/*========================================================*/\n			/* Rumble Element\n			/*========================================================*/			\n			$this.css({\n				'position':'relative',\n				'left':rx+'px',\n				'top':ry+'px',\n				'-ms-filter':'progid:DXImageTransform.Microsoft.Alpha(Opacity='+ropac*100+')',\n				'filter':'alpha(opacity='+ropac*100+')',					\n				'-moz-opacity':ropac,					\n				'-khtml-opacity':ropac,					\n				'opacity':ropac,\n				'-webkit-transform':'rotate('+rrot+'deg)', \n				'-moz-transform':'rotate('+rrot+'deg)', \n				'-ms-transform':'rotate('+rrot+'deg)',\n				'-o-transform':'rotate('+rrot+'deg)', \n				'transform':'rotate('+rrot+'deg)'\n			});\n		};\n		\n		/*========================================================*/\n		/* Rumble CSS Reset\n		/*========================================================*/\n		var reset = {\n			'left':0,\n			'top':0,\n			'-ms-filter':'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)',\n			'filter':'alpha(opacity=100)',					\n			'-moz-opacity':1,					\n			'-khtml-opacity':1,					\n			'opacity':1,\n			'-webkit-transform':'rotate(0deg)',\n			'-moz-transform':'rotate(0deg)',\n			'-ms-transform':'rotate(0deg)',\n			'-o-transform':'rotate(0deg)',\n			'transform':'rotate(0deg)'\n		};\n		\n		/*========================================================*/\n		/* Rumble Start/Stop Trigger\n		/*========================================================*/\n		$this.bind({\n			'startRumble': function(e){\n				e.stopPropagation();\n				clearInterval(interval);\n				interval = setInterval(rumbler, speed)\n			},\n			'stopRumble': function(e){\n				e.stopPropagation();\n				clearInterval(interval);\n				if(inline){\n					$this.css('display', 'inline');\n				}\n				$this.css(reset);\n			}\n		});		\n		\n	});// End return this.each\n};// End $.fn.jrumble\n})(jQuery);";
    document.head.appendChild(scp4);
    scp5 = document.createElement('script');
    scp5.setAttribute('type', 'text/javascript');
    scp5.innerHTML = '\n	    $(\'.vibrumble\').jrumble({\n    x: 2,\n    y: 2,\n    rotation: 1\n});\n$(\'.vibrumble\').hover(function(){\n    $(this).trigger(\'startRumble\');\n}, function(){\n    $(this).trigger(\'stopRumble\');\n});\n});\n\n';
    document.head.appendChild(scp5);
    return console.log("fin");
  };

  main();

}).call(this);
