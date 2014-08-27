//main code !!
var express = require('express');
var router = express.Router();
var app = express();
var http = require("http"),
// And url module, which is very helpful in parsing request parameters.
    url = require("url");
 var sys=require("sys");
var fs = require('fs');
var os = require('os');
var rmdir = require('rimraf');
//app.use(express.static(__dirname + '/public'));

var page_loader=require('./page_loader.js');
var url_path='192.168.12.77';
var port=8000;
var content;//gets  the content of container 
var AdmZip = require('adm-zip');
var zip_download_extract=require('./zip_download_extract.js');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/resource'));
var map_object=new Object();
//Download json file!

var download_url="http://192.168.12.77:8080/";
var file = fs.createWriteStream("./downloads/manifest.json");
//fs.readFile('./container_iframe.html', 'utf-8', function(err, text) {
fs.readFile('./container_with_calendar.html', 'utf-8', function(err, text) {
   	 if (err) {
		sys.puts(err);
     		res.end('error occurred');
    		//return;
   		}
	else
	{content=text;
	}	
});
var request = http.get(download_url+"manifest.json", function(res) {
	res.on('data', function(data) {
  		file.write(data);
	});
	res.on('end', function() {
	//check json data
		sys.puts("Downloaded json file");
		var file_name="./downloads/manifest.json";
 	 	var obj = JSON.parse(fs.readFileSync(file_name, 'utf8'));
		var list_file_doesnt_exists=[];
		var check_folder="public";
		var list = fs.readdirSync(check_folder);
		var actual_files=[];
		var key="";
		var value="";
 	 	for(var i=0;i<obj.length;i++)
	 	{
			key=obj[i]["file"];
			value=obj[i]["pagename"]+","+obj[i]["pageno"]			
			map_object[key]=value;
			actual_files.push(obj[i]["file"]);			
			var index = list.indexOf(obj[i]["file"]);
			if (index > -1) {
    				list.splice(index, 1);
				//removed
			}
			else
			{	sys.puts("File "+key+" doesnt exits");
				list_file_doesnt_exists.push(obj[i]["file"]);
			}		
 		}
		//remove unnecessary files  
		for(var i=0;i<list.length;i++)
		{
			rmdir("./public/"+list[i],function(error){});
		}
		//download zip files
		sys.puts("starting to  download zip files");
		sys.puts("No. of ZIP's Downloaded :"+list_file_doesnt_exists.length);	
		zip_download_extract.download_extract(list_file_doesnt_exists);
		actual_files=actual_files.sort(function(a, b){return b-a});
		sys.puts("Content present in these folders :"+actual_files);
		//
		app.get('/',function (req,res)
		{
			sys.puts("loading data from :"+actual_files[0]);
			var date=req.query["date"];
			var page=req.query["page"];
			var today;
			var page;
	
			if(page && date)
			{
				sys.puts("date & page");
				//date_wise.today(req, res,date,page,content);
		
			}
			else
			{
				//res.end("<html><body> <h1> Invalid url path </h1></html></body>");
	
				sys.puts("rerouting");	
				var date=actual_files[0];
				page=1;
			}
			app.use(express.static(__dirname + '/public/'+date));
			//date_wise.today(req, res,today,page,content,app);
			var fetched_values=map_object[date];
			var page_name=fetched_values.split(",")[0];
			var page_no=fetched_values.split(",")[1];
			page_loader.load_page(req,res,date,page,content,actual_files,page_name,page_no);	
			//res.redirect('/epaper?date='+today+'&page=1');
		});
		//app.use(express.static(__dirname + '/public/'+date));
		app.get("/epaper",function (req,res)
		{
			sys.puts("epaper call");
			//sys.puts(url.parse(req.url).pathname);
			var date=req.query["date"];
			var page=req.query["page"];
			
			if(page && date)
			{
				if(page==1)
				{app.use(express.static(__dirname + '/public/'+date));
				 sys.puts("public :"+'/public/'+date);
				}
				var fetched_values=map_object[date];
				var page_name=fetched_values.split(",")[0];
				var page_no=fetched_values.split(",")[1];
				page_loader.load_page(req, res,date,page,content,actual_files,page_name,page_no);
				//app.use(express.static(__dirname + '/public/'+date));
		
			}
			else
			{
			res.end("<html><body> <h1> Invalid url path </h1></html></body>");
			}		
			//
		});
	}); 
});






app.listen(port,url_path);
console.log('Listening on port http://'+url_path+':'+port);

