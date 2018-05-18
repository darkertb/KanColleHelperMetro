function WTemplate()
{var _frameIndex;var _topZ=0;var _w=800;var _h=400;var _leftPos=0;var _topPos=30;var _chName;var _url;var _html="";var _html_template="<div class='demo' id='A{0}' style='overflow:hidden; z-index:{1}; font-size:9pt; width:{2}px; height:{3}px; left:{4}; top:{5};'>"
+"<input type='hidden' id='A{0}OH' value=''>"
+"<div style='background-color:#7859B1;border-style:solid;border-bottom-style:none;border-width:1px;height:15'>"
+"<span class='bt' id='A{0}BC' style='margin-right:5px; float:right;font-size:9pt;' onmouseover='changeCursor(0);' onmouseout='changeCursor(1);'> <font color='#fff'>&nbsp;✕</font> </span>"
+"<span class='bt' id='A{0}BR' style='margin-right:6px; float:right;font-size:9pt; 'onmouseover='changeCursor(0);' onmouseout='changeCursor(1);'> <font color='#fff'>&nbsp;○</font> </span>"
+"<span class='bt' id='A{0}BS' style='margin-right:2px; float:right;font-size:9pt;' onmouseover='changeCursor(0);' onmouseout='changeCursor(1);'> <font color='#fff'>–</font> </span>"
+"<font color='#fff'>{6}</font>"
+"</div>"
+"<iframe width='{2}px' height='{3}px' id='A{0}F' style='background-color:#000;margin-top:-2px;border-style:solid;border-top-style:none;border-width:1px;' src='{7}'>"
+"</iframe>"
+"<div id='A{0}container' style=' width:100%; height:100%; filter:alpha(opacity=50); opacity:0; background-color:#000; position:absolute; top:0; left:0;'>"
+"</div>"
+"</div>";this.init=function(frameIndex,topZ,w,h,leftPos,topPos,chName,url)
{_frameIndex=frameIndex;_topZ=topZ;_w=w;_h=h;_leftPos=leftPos;_topPos=topPos;_chName=chName;_url=url;this.html=String.format(_html_template,_frameIndex,_topZ,_w,_h,_leftPos,_topPos,_chName,_url);};this.setTemplate=function(html_template)
{_html_template=html_template;}
this.HTMLCode=function()
{_html=String.format(_html_template,_frameIndex,_topZ,_w,_h,_leftPos,_topPos,_chName,_url);return _html;};}