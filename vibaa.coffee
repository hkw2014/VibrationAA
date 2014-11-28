aaDetect =->
	#alert "vibaa"
	#console.log "vibaa!!"

	pres = document.body.getElementsByTagName("pre");

	elems = []

	i = 0
	#console.log "now"
	for elem in pres
		# ...
		console.log i
		
		totalBytes = strBytes(elem.innerText)
		console.log "Bytes: #{totalBytes}"
		halfSpaces = strMatches(elem.innerText ,' ')
		console.log '半角スペース' + halfSpaces
		fullSpaces = strMatches(elem.innerText ,'　')
		console.log '全角スペース' + fullSpaces
		#console.log totalBytes.toString() + ',' + halfSpaces.toString() + ',' + fullSpaces.toString()

		if (halfSpaces + fullSpaces*2) / totalBytes >= 0.1
			elems.push(elem)
			console.log "ADD"

		i+=1

	console.log elems
		

strBytes = (str) ->

	#str = elem.innerText

	r = 0
	for i in [0..(str.length-1)] 
        #console.log str.charAt i 
        c = str.charCodeAt i 
        #console.log c
        #Shift_JIS: 0x0 ～ 0x80, 0xa0 , 0xa1 ～ 0xdf , 0xfd ～ 0xff 
        #Unicode : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3 
        if (c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)
            r += 1 
        else 
            r += 2 

	console.log 'r:' + r
	return r

         
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
	elems = aaDetect()

	#for i in elems
		# ...
		

	console.log "fin"


main()