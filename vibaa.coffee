aaDetect =->
	alert "vibaa"
	console.log "vibaa!!"

	elems = document.body.getElementsByTagName("pre");

	i = 0
	console.log "now"
	for elem in elems
		# ...
		console.log i
		
		totalBytes = strBytes elem.innerText
		console.log totalBytes
		halfSpaces = strMatches elem.innerText " "
		fullSpaces = strMatches elem.innerText "　"
		console.log totalBytes + "," + halfSpaces + "," + fullSpaces
		i+=1

	elems
		

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

        #console.log r

         
strMatches =(str,para) ->
	console.log "startMatches"
	r = 0
	for i in [o..(str.length-1)]
		c = str.charCodeAt i
		if c is para
			r += 1

    


main =->
	elems = aaDetect()

	#for i in elems
		# ...
		

	console.log "fin"


main()