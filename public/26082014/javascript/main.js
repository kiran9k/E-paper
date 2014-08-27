
var url;
var oSelect;
var path;
var apageName=new Array()
var i=0;
var count;
var posx; var posy;
var pheight;
var rpage;
var lpage;
var zoneColor;
var aheadlineMsg = new Array();
var aartname = new Array();




function clearUserHint(){
	document.getElementById('txtHint').innerHTML = "";
}

//clear Zones..
function clearZones(){
	var checks = document.getElementsByTagName('div');
	for(var no=0;no<checks.length;no++){
		if(checks[no].id.substr(0,4)=="zone" && checks[no].style.display=='block'){
			checks[no].style.display="none";
		}
	}
}



function getMouse(e){
	posx=0;posy=0;
	var ev=(!e)?window.event:e;//IE:Moz
	
	if (ev.pageX){//Moz
		posx=ev.pageX+window.pageXOffset;
		posy=ev.pageY+window.pageYOffset;	
	}
	else if(ev.clientX){//IE
		posx=ev.clientX+document.body.scrollLeft;
		posy=ev.clientY+document.body.scrollTop;
	}
	else{return false}//old browsers	
}

document.onmousemove=getMouse;

function onmoves(articlename)
{
	
	var ele=document.getElementsByTagName('div');
	//showTooltip(articlename);
	
	for(j=0;j<ele.length;j++)
	{	
		if(ele[j].id.substring(4,23)==articlename.substring(0,19)){
			//ele[j].style.border = "2px solid #000000";
			if(ele[j].id.substring(23,26)!="ZTb"){
				ele[j].style.background  = zoneColor;
				ele[j].style.border = "2px solid #000000";
			}
			else {
				ele[j].innerHTML="<img border=0 id='imgClipPhoto' onclick=alert('Hi') src='images/zpclip.gif' title='Clip Photo' onmouseover=onmoves('"+articlename+"') onmouseout=onOut('"+articlename+"')>&nbsp;<img border=0 id='imgClipArticle' src='images/zaclip.gif' title='Clip Article' onclick=alert('Hi') onmouseover=onmoves('"+articlename+"') onmouseout=onOut('"+articlename+"')>";
			}
		}
	}
	
}

function onOut(articlename){
	var ele=document.getElementsByTagName('div');	
	//hideTooltip();	
	for(j=0;j<ele.length;j++)
	{		
		if(ele[j].id.substring(4,23)==articlename.substring(0,19))
		{	if(ele[j].id.substring(23,26)!="ZTb"){				
				ele[j].style.background  = "url(images/transparent.gif)";
				ele[j].style.border = "";
			}
			else ele[j].innerHTML="";
		}

	}
}

//function openArticle1(path,articlename){
//	document.getElementById("articleImage").src = path+articlename+".jpg";
//	var artDiv = document.getElementById('articleContainer');
//	artDiv.style.display="block";
//}
function openArticle(path,articlename){ //Define arbitrary function to run desired DHTML Window widget codes


load_image(path+articlename);

//document.getElementById('txtHint').innerHTML = "Loading...";
//dhtmlwindow.open('divbox', 'img', path+articlename+".jpg", "Image View","width=650px,height=350px,center=1,center=1,resize=1,scrolling=1")
//dhtmlwindow.open('divbox', 'inline', '<img src='+path+articlename+'.jpg'+' name="articleImage" id="articleImage"  />', "Image View","width=650px,height=350px,center=1,center=1,resize=1,scrolling=1")
//dhtmlwindow.open('divbox', 'ajax', path+articlename+".htm", "Text View","width=650px,height=350px,center=1,center=1,resize=1,scrolling=1")
//dhtmlwindow.open("googlebox", "iframe", path+articlename+".pdf", "PDF View", "width=590px,height=350px,resize=1,scrolling=1,center=1")
}

function closeArticle(){
	var artDiv = document.getElementById('articleContainer');
	artDiv.style.display="none";
}


function addZone(path,left, top, height, width, h, articlename)
{
	var cont = document.getElementById('loadImg');
	var d = document.createElement('div');
	var a = document.createElement("a");  // Create an <a> node		    
	i = i + 1;
	
	d.setAttribute("id", "zone"+articlename + "_" + i);
	var zone= d.setAttribute("class","zones");

	a.onclick = function(){ openArticle(path,articlename); }

	d.onmousemove = function(){	onmoves(articlename); }

	d.onmouseout = function(){ onOut(articlename); }
	
	d.style.background  = "url(images/transparent.gif)"; 
	d.style.position = "absolute";
	d.style.filter = "alpha(opacity=30)";
	d.style.opacity = "0.3";
	d.style.cursor = "pointer";
	d.src="images/transparent.gif";
	d.style.left = left+"px";
	d.style.top = top+"px";
	d.style.height = height+"px";
	d.style.width = width+"px";
	d.style.display="block";
	a.appendChild(d);
	cont.appendChild(a);
}

//zoneloading
function zoneArticle(pname){
	var xmlDoc=loadXMLDoc(path + pname + ".xml");
	var pg=xmlDoc.getElementsByTagName('page');
	var art=xmlDoc.getElementsByTagName('article');
	var hd =xmlDoc.getElementsByTagName('headline');
	var par =xmlDoc.getElementsByTagName('para');
	scheight=xmlDoc.getElementsByTagName('page')[0].getAttribute('height');	
	scwidth=xmlDoc.getElementsByTagName('page')[0].getAttribute('width');
	var pwidth=document.getElementById('fullPage').width;
	pheight = ((scheight/scwidth) * pwidth);
	document.getElementById('thumbnailContainer').style.height = 25 + pheight+"px";
	document.getElementById('fullPageContainer').style.height = 25 + pheight+"px";
	
	zoneColor = "#FBF8C6";
	
	for (k=0;k<art.length;k++)
	{
		var artname=art[k].getAttribute("name");
		//alert(artname);
		var hdline=hd[k].childNodes[0].nodeValue;
		aheadlineMsg[k] = hdline;
		aartname[k] = artname;
		var pr=par[k].childNodes[0].nodeValue;
		var headpara= "<b>"+hdline+ "</b>" +pr;
		var zinfo = art[k].getElementsByTagName('zoneinfo');
		
		for (j=0;j<zinfo.length;j++)
		{
			var zid =zinfo[j].getAttribute("id");
			var left=zinfo[j].getAttribute("left");
			var top=zinfo[j].getAttribute("top");
			var height=zinfo[j].getAttribute("height");
			var width=zinfo[j].getAttribute("width");	
			var zheight = ((pheight/scheight)*(height));
			zheight = parseInt(zheight);
			var zwidth = ((pwidth/scwidth)*width);	
			zwidth = parseInt(zwidth);
			var zleft = ((pwidth/scwidth)*left);
			zleft = parseInt(zleft);	//
			var ztop = ((pheight/scheight)*top + 0);	
			ztop = parseInt(ztop);	 //	decrease
			addZone(path, zleft, ztop, zheight, zwidth, headpara, artname, height , width);	
			
			//alert("path:"+path+" zleft:"+zleft+" ztop:"+ztop+" zheight:"+zheight+" zwidth:"+zwidth+" artname:"+artname+" height:"+height+" width:"+width);
			//alert(path+"==>"+ztop+"==>"+zheight+"==>"+zwidth+"==>"+headpara+"==>"+artname+"==>"+height+"==>"+width);				
		}
	}
	//document.getElementById('fullPage').innerHTML = cont;
	//alert(aheadlineMsg.length)
	
	//alert(aartname[0]);
	//openArticle(path+aartname[0]);
}


function setPrevNext(pname){
	var rShift = document.getElementById('rightShiftImg');
	var lShift = document.getElementById('leftShiftImg');
	
	for(var i=0;i<apageName.length;i++)	{
		if(apageName[i]==pname) {
		
			if(i>0) {
				lShift.src = "images/btn_left.jpg";
				lpage = apageName[i-1];
				lShift.onclick = function()	{
					showPage(lpage);
				}
				
			}
			else {
				lShift.src = "images/btn_leftdis.jpg";
			}
			
			
			if(i<apageName.length - 1) {
				rShift.src = "images/btn_right.jpg";
				rpage = apageName[i+1];
				rShift.onclick = function()	{
					showPage(rpage);
				}
			}
			else {
				rShift.src = "images/btn_rightdis.jpg";
			}
		}
	}
	
}


//page Change on click
function showPage(pname){
	document.getElementById('txtHint').innerHTML = "Loading...";
	var cont = document.getElementById('loadImg');
	aheadlineMsg = [];
	clearZones()
	setPrevNext(pname)
	document.getElementById("fullPage").src = path + pname + ".jpg";
	zoneArticle(pname)
	
}


function submitForm(url)
{
	var req = null; 	
	if(window.XMLHttpRequest)
	req = new XMLHttpRequest(); 
	else if (window.ActiveXObject)
	req  = new ActiveXObject("Microsoft.XMLHTTP"); 
	apageName = [];
	req.onreadystatechange = function()
	{ 
		document.getElementById('txtHint').style.display = "block"; 
		document.getElementById("txtHint").innerHTML=" &nbsp;Loading...";
		if(req.readyState == 4)
		{
			if(req.status == 200)
			{   
				var doc; // Assign the XML file to a var
				doc = req.responseXML;										
			
				//loading date combo
				
				nodeList = doc.getElementsByTagName("dt");	
				oSelect = document.getElementById("dt");
				for (i=0;i<nodeList.length;i++){
					var oOption = document.createElement("option");					
					oOption.value = doc.getElementsByTagName("dt")[i].getAttribute("value");
					oOption.innerHTML = doc.getElementsByTagName("dt")[i].childNodes[0].nodeValue;
					document.getElementById("showDate").innerHTML=doc.getElementsByTagName("dt")[i].childNodes[0].nodeValue; // show date
					oSelect.appendChild(oOption);
					
				}
		
				//loading edition combo
				nodeList = doc.getElementsByTagName("edt");
				oSelect = document.getElementById("edt");
				for (i=0;i<nodeList.length;i++){
					var oOption = document.createElement("option");
					oOption.value = doc.getElementsByTagName("edt")[i].getAttribute("id");
					//alert(doc.getElementsByTagName("edt")[i].getAttribute("id"));
					oOption.innerHTML = doc.getElementsByTagName("edt")[i].childNodes[0].nodeValue;
					oSelect.appendChild(oOption);
					
				}
					
				//set Main edition in combo
				for(i=0;i<document.getElementById('edt').length;i++){
					if(document.getElementById('edt').options[i].value=='1'){
						document.getElementById('edt').selectedIndex=i;
					}
				} 
	
				//loading first page image		
				
				var cont = document.getElementById('loadImg');
//				cont.innerHTML='';							
				var fpage;
				path =  (doc.getElementsByTagName("path")[0].childNodes[0].nodeValue);						
				fpage = (path + doc.getElementsByTagName("fpname")[0].childNodes[0].nodeValue + ".jpg");
				//alert(fpage);
				document.getElementById("fullPage").src = fpage;
				name=doc.getElementsByTagName("fpname")[0].childNodes[0].nodeValue;
				zoneArticle(name)
				
				
				//load page num
				nodeList = doc.getElementsByTagName("pname");
				var pnum;
				var pnumCont="";
				for (i=0;i<nodeList.length;i++){
					pnum = (doc.getElementsByTagName("pname")[i].getAttribute("num"));
					pname = (doc.getElementsByTagName("pname")[i].childNodes[0].nodeValue);
					apageName[i]=pname;
				pnumCont = pnumCont + " <span style='background-color:#cccccc;' id='"+ pnum +"'><a style='cursor:pointer;' onClick=showPage('"+pname+"');>&nbsp;"+ pnum +"&nbsp;</a></span> ";	
					
				}
				document.getElementById("pnum").innerHTML = pnumCont;
				
				//load prev and next page
				setPrevNext(apageName[0]);
				//heightShift('bnews');
				
	
				//load page thumbnail
				nodeList = doc.getElementsByTagName("pname");
				var pnum;
				var pnumCont="";
				for (i=0;i<nodeList.length;i++){
					pnum = (doc.getElementsByTagName("pname")[i].getAttribute("num"));
					pname = (doc.getElementsByTagName("pname")[i].childNodes[0].nodeValue);
					pnumCont = pnumCont + "<a style='cursor:pointer;' onClick=showPage('"+pname+"')><img style='margin:3px; border:#000000 2px solid;' src='"+ path + pname +"t.jpg' /></a>";
				}
				//alert(pnumCont)
				document.getElementById("thunbnail").innerHTML = pnumCont;
	
				document.getElementById("txtHint").innerHTML="";
				//document.getElementById('txtHint').style.display = "none";   
			}	
			else	
			{
				document.getElementById("txtHint").innerHTML="Error...";
			}	
		} 
	}; 
	
	//alert(url);
	req.open("GET", url, true); 
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
	req.send(null);
} 



function GetXmlHttpObject()
{
	var xmlHttp=null;
	try
	 {
	 // Firefox, Opera 8.0+, Safari
	 xmlHttp=new XMLHttpRequest();
	 }
	catch (e)
	 {
	 //Internet Explorer
	 try
	  {
	  xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
	  }
	 catch (e)
	  {
	  xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	 }
	return xmlHttp;
}


