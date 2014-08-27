var AdmZip = require('adm-zip');
var fs = require('fs');
var http = require("http");
var check_folder="public";
 var sys=require("sys");
var download_url="http://192.168.12.77:8080/";
function download_extract(list)
{

	if(list.length==0)
	{

		return;
	}
	var name=list[0];
	sys.puts("downlading "+name);
	//file = fs.createWriteStream("./downloads/"+name+".zip");
	
	http.get(download_url+name+".zip", function(res) {
		var temp_name=name;
    		var data = [], dataLen = 0; 
 		res.on('data', function(chunk) {
     		data.push(chunk);
        	dataLen += chunk.length;
	        }).on('end', function() {	
	            var buf = new Buffer(dataLen);
	            for (var i=0, len = data.length, pos = 0; i < len; i++) { 
	                data[i].copy(buf, pos); 
	                pos += data[i].length; 
	            } 
		    var zip = new AdmZip(buf);
		    buf="";
		    zip.extractAllTo(check_folder+"/"+temp_name, true);
		    sys.puts("downloaded "+temp_name+i);
		    list.shift();
		    download_extract(list);		   
		});
	});

}
exports.download_extract=download_extract;
