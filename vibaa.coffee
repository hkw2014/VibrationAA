###
HTML文書から複数行のAAを検出
@param document
@return elementの配列
###
aaDetect = (doc)->

	tmpEles = []
	pres = doc.body.getElementsByTagName("pre")
	dds = doc.body.getElementsByTagName("dd")

	for j in pres
		tmpEles.push(j)

	for j in dds
		tmpEles.push(j)

	elems = []

	i = 0
	#console.log "now"
	for elem in tmpEles
		# ...
		console.log i
		console.log elem.innerText
		totalBytes = strBytes(elem.innerText)
		console.log "Bytes: #{totalBytes}"
		halfSpaces = strMatches(elem.innerText ,' ')
		console.log '半角スペース' + halfSpaces
		fullSpaces = strMatches(elem.innerText ,'　')
		console.log '全角スペース' + fullSpaces
		spaceRate = (halfSpaces + fullSpaces*2) / totalBytes
		console.log "スペース率: #{spaceRate*100} %" 
		if spaceRate >= 0.1
			elems.push(elem)
			console.log "ADD"

		i+=1



	
	return elems
		
###
DIVでブロック分けしたDOMを取得
###
getBlock = (elem) ->
	telem = elem.cloneNode true
	t2elem = elem.cloneNode true
	c_nodes = t2elem.childNodes
	#console.log 'depth:' + depth
	res = elem.cloneNode false
	telem = elem.cloneNode true

	console.log c_nodes
	for i in c_nodes
		# ...
		console.log i

	n = 0
	brCount=0
	tmp = document.createElement 'div'
	#res =  [tmp]
	for g in c_nodes
		# ...
		console.log '---今から処理する要素---'
		console.log n
		console.log g
		console.log 'nodeName=' + g.nodeName	
		console.log 'g=' + g.nodeValue
		console.log tmp
		console.log '------'

		
		if ((g.nodeName is '#text') or (g.nodeName is 'BR')) is false
		#if (g.nodeName is '#text')is false
			
			console.log g
			res.appendChild (tmp.cloneNode true)

			tmp = document.createElement 'div'

			if g.tagName is 'SCRIPT' or g.tagName is 'PRE'
				res.appendChild g.cloneNode true
			else
				#res.appendChild (getBlock (g.cloneNode true),depth+1).cloneNode(true)
				res.appendChild (getBlock (g.cloneNode true)).cloneNode(true)

			tmp = document.createElement 'div'

		else 
			console.log g + 'in else'
			console.log 'brCount : ' + brCount
			if g.tagName isnt 'BR'
				if brCount > 1
					
					res.appendChild tmp.cloneNode true
					tmp = document.createElement 'div'
					tmp.appendChild g.cloneNode true

				else
					tmp.appendChild g.cloneNode true

				brCount = 0
				


			else if g.tagName is 'BR'

				brCount++
				tmp.appendChild g.cloneNode true

		n++

	res.appendChild tmp.cloneNode true

	console.log 'getBlock結果'
	console.log res

	return res

###
文字バイト数をカウント（全角:2バイト,半角:1バイト）
@param 文字列
@return 総バイト数
###
strBytes = (str) ->

	#str = elem.innerText

	r = 0
	for i in [0..(str.length-1)] 
        c = str.charCodeAt i 
        
        #Shift_JIS: 0x0 ～ 0x80, 0xa0 , 0xa1 ～ 0xdf , 0xfd ～ 0xff 
        #Unicode : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3 
        if (c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)
            r += 1 
        else 
            r += 2 
	
	return r

###
文字列に指定した文字がどのくらい含まれるのかをカウント
@param 文字列
@param 指定した文字(1文字目の文字をカウント)
@return 指定した文字が含まれる数	
###    
strMatches =(str,para) ->
	#console.log "startMatches"
	r = 0
	pCode = para.charCodeAt 0
	for i in [0..(str.length-1)]
		c = str.charCodeAt i
		if c is pCode
			r += 1

	return r

    


main =->
	elems = aaDetect(document)

	console.log elems
	for e in elems
		# ...
		oTxt = "<div class='vibrumble'>" + e.outerHTML + "</div>"
		e.outerHTML = oTxt
		console.log oTxt
		###
		if e.hasAttribute('class') is false
			e.setAttribute('class','vibrumble')
		else
			cls_Attr = e.getAttribute('class')
			e.setAttribute('class',cls_Attr + ' vibrumble')
		###

	console.log "要素追加開始"
	scp1 = document.createElement 'link'
	scp1.setAttribute('href',"http://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css")
	scp1.setAttribute('rel','stylesheet')
	scp1.setAttribute('type','text/css')
	document.head.appendChild scp1

	scp2 = document.createElement 'script'
	scp2.setAttribute('src',"http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js")
	scp2.setAttribute('type','text/javascript')
	document.head.appendChild scp2

	scp3 = document.createElement 'script'
	scp3.setAttribute('src',"http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js")
	scp3.setAttribute('type','text/javascript')
	document.head.appendChild scp3
		
	console.log "今からjRumble挿入"
	scp4 = document.createElement 'script'
	#scp4.setAttribute('src',"./js/jquery.jrumble.1.3.js")
	scp4.setAttribute('type','text/javascript')
	scp4.innerHTML = """
		/*
jRumble v1.3 - http://jackrugile.com/jrumble
by Jack Rugile - http://jackrugile.com

MIT License
-----------------------------------------------------------------------------
Copyright (c) 2012 Jack Rugile, http://jackrugile.com
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function($){
	$.fn.jrumble = function(options){
		
		/*========================================================*/
		/* Options
		/*========================================================*/
		var defaults = {
			x: 2,
			y: 2,
			rotation: 1,
			speed: 15,
			opacity: false,
			opacityMin: .5
		},
		opt = $.extend(defaults, options);	
				
		return this.each(function(){
								  
			/*========================================================*/
			/* Variables
			/*========================================================*/
			var $this = $(this),				
				x = opt.x*2,
				y = opt.y*2,
				rot = opt.rotation*2,
				speed = (opt.speed === 0) ? 1 : opt.speed,			
				opac = opt.opacity,
				opacm = opt.opacityMin,
				inline,
				interval;
			
			/*========================================================*/
			/* Rumble Function
			/*========================================================*/		
			var rumbler = function(){				
				var rx = Math.floor(Math.random() * (x+1)) -x/2,
					ry = Math.floor(Math.random() * (y+1)) -y/2,
					rrot = Math.floor(Math.random() * (rot+1)) -rot/2,
					ropac = opac ? Math.random() + opacm : 1;
					
				/*========================================================*/
				/* Ensure Movement From Original Position
				/*========================================================*/				
				rx = (rx === 0 && x !== 0) ? ((Math.random() < .5) ? 1 : -1) : rx;
				ry = (ry === 0 && y !== 0) ? ((Math.random() < .5) ? 1 : -1) : ry;	
				
				/*========================================================*/
				/* Check Inline
				/*========================================================*/
				if($this.css('display') === 'inline'){
					inline = true;
					$this.css('display', 'inline-block');
				}
				
				/*========================================================*/
				/* Rumble Element
				/*========================================================*/			
				$this.css({
					'position':'relative',
					'left':rx+'px',
					'top':ry+'px',
					'-ms-filter':'progid:DXImageTransform.Microsoft.Alpha(Opacity='+ropac*100+')',
					'filter':'alpha(opacity='+ropac*100+')',					
					'-moz-opacity':ropac,					
					'-khtml-opacity':ropac,					
					'opacity':ropac,
					'-webkit-transform':'rotate('+rrot+'deg)', 
					'-moz-transform':'rotate('+rrot+'deg)', 
					'-ms-transform':'rotate('+rrot+'deg)',
					'-o-transform':'rotate('+rrot+'deg)', 
					'transform':'rotate('+rrot+'deg)'
				});
			};
			
			/*========================================================*/
			/* Rumble CSS Reset
			/*========================================================*/
			var reset = {
				'left':0,
				'top':0,
				'-ms-filter':'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)',
				'filter':'alpha(opacity=100)',					
				'-moz-opacity':1,					
				'-khtml-opacity':1,					
				'opacity':1,
				'-webkit-transform':'rotate(0deg)',
				'-moz-transform':'rotate(0deg)',
				'-ms-transform':'rotate(0deg)',
				'-o-transform':'rotate(0deg)',
				'transform':'rotate(0deg)'
			};
			
			/*========================================================*/
			/* Rumble Start/Stop Trigger
			/*========================================================*/
			$this.bind({
				'startRumble': function(e){
					e.stopPropagation();
					clearInterval(interval);
					interval = setInterval(rumbler, speed)
				},
				'stopRumble': function(e){
					e.stopPropagation();
					clearInterval(interval);
					if(inline){
						$this.css('display', 'inline');
					}
					$this.css(reset);
				}
			});		
			
		});// End return this.each
	};// End $.fn.jrumble
})(jQuery);
"""
	document.head.appendChild scp4

	console.log "kjk"

	scp5 = document.createElement 'script'
	scp5.setAttribute('type','text/javascript')
	scp5.innerHTML = '''
      $(function() {
        $('.vibrumble').jrumble({
        x: 2, //ブルブルX
        y: 2, //ブルブルY
        rotation: 3, //ブルブル角度
        });
      $('.vibrumble').hover(function(){
        $(this).trigger('startRumble');
        }, function(){
        $(this).trigger('stopRumble');
       });
      });
    '''

	document.head.appendChild scp5

	console.log "fin"


main()