const fs = require('fs')
const path = require('path')
var paths =[]
var pathdict = []
var mydir = ""
var dict ={}
var jsonfile = ''
var lookuplist = []
/*
READ ME
roll no = 20100093
the file works perfectly as far as I have tested it.
dictpopulate populates the dictionary
multiple asych calls and promises are used to keep checks.
To test for search this is the format: 

node Searcher.js search myIndex.JSON wordA wordB wordC wordD... (as many as you want)
*/

function writetoJson(dict)
{
	var write = JSON.stringify(dict,null,1)
	fs.writeFile(jsonfile,write,() =>{
		console.log("JSON FILE WRITTEN")
	})

}
function dictpopulate(dir, data)
{
	var linebyline = data.split('\n')

	for (var i = 0; i < linebyline.length; i++) 
	{
	
		var newline = linebyline[i].split(/\W+/)
		for (var j = 0; j < newline.length; j++) 
		{
			if (newline[j].length>3)
			{
				var lowercase = newline[j].toLowerCase()

				//console.log(lowercase)
				if (dict[lowercase]===undefined)
				{
					var count = i +1
					
					dict[lowercase] = [{"file":dir, "line":[count]}]
					// console.log(lowercase+' ')
					// console.log(dict[lowercase])
					//dict[newline[j].toLowerCase()] = {"line":[i+1]}

				}
				else
				{
					var temp = dict[lowercase]
					if (temp)
					{
						//console.log(lowercase + ' ' )
						//console.log(dict[lowercase])
						var check = false

						for (var k = 0; k < temp.length; k++) 
						{
							var listR= temp[k]
							var entryfile = listR['file']
							var findfile = true
							if (entryfile==dir)
							{
								findfile = false
								list = listR['line']
								//console.log(list)
								// to check for previous entry(same line)
								for (var m = 0; m < list.length; m++) {
									if(list[m] ==i+1)
									{
										check = true
									}
								}
										if (check===false) 
										{
											list.push(i+1)
											old = dict[lowercase]
											delete dict[lowercase]
											//dict[lowercase] = [{"file":dir, "line":list}]
											neW = [{"file":dir, "line":list}]
											//old.push(neW)
											dict[lowercase] = old

											// list.push(i+1)
											// delete dict[lowercase]
											// dict[lowercase] = [{"file":dir, "line":list}]
										}


							}
							
							}

							if (findfile)
							{
								tem = {"file":dir, "line":[i+1]}
								//console.log(tem)
								var dic = dict[lowercase]
								dic.push(tem)
								delete dict[lowercase]
								dict[lowercase] = dic 



							}
						
						


					}
					
				
					
				}

			}
			
		}

}
}
function directory(dir) 
{

	//console.log("DIR CALL \n" +dir )
	
	var files = fs.readdirSync(dir)
		


		if (files.length===0) {
			console.log("EMPTY")
			return 
		}

		if(files.length>0)
		{	
			
			//console.log(files)	
			// console.log(files.length)
			for (var i = 0; i < files.length; i++) 
			{

				if(extension(files[i])==='Subfolder')
				{
					var newfolder = files[i]
					//console.log("NEW Subfolder")
					var newaddress = path.join(dir,files[i])
					directory(newaddress)
					//console.log("FOLDER EXPLORED and current DIR = " + dir )
					newaddress = ""
					

				}
				else
				{
					if (extension(files[i])=='txt')
					 {
					 	//console.log("TEXT FILE FOUND = " + files[i])
					 	paths.push(path.join(dir,files[i]))


					 }


				}

			}

			
		}



		
	}

function extension(filename)
{
	var extension = filename.split('.').pop()
	if (extension===filename) 
	{
		return "Subfolder"

	}
	return extension
}
const readallfiles =() => new Promise(resolve=>
{
	console.log("TOTAL FILES TO BE READ = " + ' ' + paths.length)
	var string
	var count = paths.length
	 	
	 	paths.forEach( file => 
	 	{	
			fs.readFile(file, 'utf8',(err,data)=>{
			if(err)
			{
				console.log(err)
				return err
				--count||resolve()
			}
			else
			{

				if (pathdict[file] === undefined) 
				{
					console.log("FILE being written " + file )

					//pathdict[file] =  {file: data}
					dictpopulate(file, data)
				}
				if (count-1===0) {
					//console.log("WRITE TO JSON")
					//console.log(dict)
					writetoJson(dict)

					//jsonwrite here

		
				}
				
			--count||resolve()
			
			}

		})
		}	
			)
	 		
	 	
	
}
)
function writemode()
{
	directory(mydir)
	readallfiles().then(()=>console.log("ALLDONE via PROMISE"))
}

function readjson(dir,words) // returns list for single word
{
	var data = fs.readFileSync(dir)
	var dict = JSON.parse(data)

	linelist = dict[words.toLowerCase()]
	if (linelist===undefined) {
		console.log("WORD NOT FOUND")
		return
	}
	for (var i = 0; i < linelist.length; i++) 
	{
		var namedir = linelist[i]['file']
		var lines = linelist[i]['line']
		console.log("File being read = " + namedir)
		for (var j = 0; j < lines.length; j++) 
		{
		
			var ret = returnline(namedir,lines[j])
			lookuplist.push(ret)
		
		}

		//console.log(lines)
	}
	//console.log(lookuplist)
	
}
function returnline(dir,lineno)
{
	var datafromfile = fs.readFileSync(dir,'utf8')
	var printbyline = datafromfile.split('\n')

	return printbyline[lineno-1]
	
}
function readlistjson(dir, wordlist)
{
	for (var i = 0; i < wordlist.length; i++) {
		readjson(dir, wordlist[i])
	}
	for (var i = 0; i < lookuplist.length; i++) {
		console.log(lookuplist[i] + '\n')
	}
	

}
mode = process.argv[2]
jsonfile= process.argv[3]
if (mode==='index')
{
	mydir = process.argv[4]
	writemode()
	return
}
else
{
	if (mode==='search')
	{
		words = []
		for (var k = 4; k < process.argv.length; k++)
		{
			
			word = process.argv[k]
			
			words.push(word)
		}
		

		readlistjson(jsonfile,words)
	}
}

 //words = ['mourinho','asynchronous','Gibran', 'LMOA']
 //readlistjson('index.json', words)
 

