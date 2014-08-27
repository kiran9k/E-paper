var ejs = require('ejs');
var sys=require('sys');
//for loading page & sending it back to html

function load_page(req,res,date,page,content,dateset,page_name,max_page)
{
	sys.puts("control in page_loader");
	var renderedHtml=ejs.render("hello");
	var path="./"+date;

	//sys.puts("date set is /:"+String(dateset));
	var stringdate=String(dateset);
	//sys.puts(stringdate+typeof(stringdate));
	var a="hello";
	sys.puts(path);
	renderedHtml = ejs.render(content, {pageno: page,pagefile:path+"/"+page_name+page+".html",date:date,dateset: stringdate,maxpage:max_page});  //get redered HTML code
	//sys.puts("EOD!");
	res.end(renderedHtml);

}
exports.load_page=load_page;
