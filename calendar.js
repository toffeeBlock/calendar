
var d = new Date();  
var year = d.getFullYear();  
var month = d.getMonth()+1;  
var day = d.getDate();  
//年月日之间的分隔符  
var splitStr="-";  
//日期选择  
var weekDays = new Array("日","一", "二", "三", "四", "五", "六");   
var months = new Array("一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月");   
var lastDay = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);   
//判断是否为闰年     
function isBissextile(year){     
 var isBis = false;     
 if (0==year%4&&((year%100!=0)||(year%400==0))) {     
  isBis = true;     
 }     
 return isBis;     
}     
//计算某月的总天数，闰年二月为29天     
function getMonthCount(year,month){     
 var Mcount = lastDay[month-1];     
 if((month==2)&&isBissextile(year)){  
  Mcount++;  
 }   
 return Mcount;     
}     
//计算某天是星期几  
function thisWeekDay (year,month,date){  
 var d = new Date(year,month-1,date);  
 return d.getDay();  
}  
//先画一个div  
document.write('<div style="display: none;position: absolute;z-index:10" id ="div_calendar"></div>');  
  
//构建日历框  
function cal(thisYear,thisMonth){  
 var calendarDocument = '<table style="border:1px solid teal;" cellspacing="7" >';  
  calendarDocument += '<tr><td colspan="6" style="cursor:hand;" align="center" onClick="getThisDay()">';  
  calendarDocument += year+"年"+month+"月"+day+"日";  
  calendarDocument += '</td>';  
  calendarDocument +='<td style="cursor:hand;">';  
  calendarDocument +='<span id="span_close" onClick="hiddenCal()"><font size="1">[关闭]</font></span>';  
  calendarDocument +='</td></tr>';  
  calendarDocument += '<tr><td>';  
    calendarDocument += '<span id="backMonth" style="cursor:hand;" onClick="backMonthClick()">←<span>';  
   calendarDocument += '</td>';  
   calendarDocument += '<td colspan="5" align="center">';  
    //构建年份下拉框[1900-2099]年  
    calendarDocument +="<select id ='sel_year' onChange='changeYM()'>";  
    for(var i = 1900;i<=2099;i++){  
     calendarDocument +="<option value="+i+">"+i+"</option>";  
    }  
    calendarDocument +="</select>";  
    calendarDocument += "年";  
    //构建月份下拉框  
    calendarDocument +="<select id ='sel_month' onChange='changeYM()'>";  
    for(var i = 1;i<=12;i++){  
     calendarDocument +="<option value="+i+">"+i+"</option>";  
    }  
    calendarDocument +="</select>";  
    calendarDocument += "月";  
   calendarDocument += '</td>';  
   calendarDocument += '<td>';  
    calendarDocument += '<span id="nextMonth" style="cursor:hand;" onClick="nextMonthClick()">→<span>';  
   calendarDocument += '</td>';  
  calendarDocument += '</tr>';  
  calendarDocument += '<tr>';  
   //输出星期  
   for(var i = 0 ;i<weekDays.length;i++){  
    //周末标红  
    if(weekDays[i]=='日' || weekDays[i] == '六'){  
     calendarDocument+='<td align="center" style="color:red">'+weekDays[i]+'</td>';  
    }else{  
     calendarDocument+='<td align="center">'+weekDays[i]+'</td>';  
    }  
   }  
   calendarDocument+="</tr>";  
     
   //输出天数  
   calendarDocument+="<tr>";  
   //算出当前年月1号是星期几  
   var thisWeek = thisWeekDay(thisYear,thisMonth,1);  
   if(thisWeek !=7){  
    for (var sw = 0;sw<thisWeek;sw++){  
     calendarDocument+='<td></td>';  
    }  
   }  
   //开始循环输出当月天数  
   for (var i = 1; i < getMonthCount(thisYear,thisMonth)+1; i++){  
    //今天  
    if(thisYear==year && thisMonth == month && i== day){  
     //今天是周末  
     if(thisWeekDay(thisYear,thisMonth,i)==6 || thisWeekDay(thisYear,thisMonth,i)==0){  
      calendarDocument+='<td onClick="setInput('+i+')" align="center" style="border:1px solid blue;color:red;cursor:hand;">'+i+'</td>';  
     }else{  
      calendarDocument+='<td onClick="setInput('+i+')" align="center" style="border:1px solid blue;cursor:hand;">'+i+'</td>';  
     }  
    }else{  
     //周末标红  
     if(thisWeekDay(thisYear,thisMonth,i)==6 || thisWeekDay(thisYear,thisMonth,i)==0){  
      calendarDocument+='<td onClick="setInput('+i+')" align="center" style="color:red;cursor:hand;">'+i+'</td>';  
     }else{  
      calendarDocument+='<td onClick="setInput('+i+')" onmouseover="mouseOver(this);" onmouseout="mouseOut(this)"align="center" style="cursor:hand;">'+i+'</td>';  
     }  
    }  
    //星期六换行  
    if(thisWeekDay(thisYear,thisMonth,i)==6){  
     calendarDocument+="</tr>";  
     calendarDocument+="<tr>";  
    }  
   }     
  calendarDocument += '</tr>';  
 calendarDocument += '</table>';  
 //将构建好的控件字符串追加给div  
 document.getElementById('div_calendar').innerHTML=calendarDocument;  
 //默认选择当前年  
 document.getElementById('sel_year').value=thisYear;  
 //默认选择当前月  
 document.getElementById('sel_month').value=thisMonth;  
}  
//全局变量——保存当前选择的年月  
var fullYear = year;  
var fullMonth = month;  
//上个月  
function backMonthClick(){  
 if(fullMonth ==1){  
  fullYear=fullYear-1;  
  fullMonth = 12;  
 }else{  
  fullMonth=fullMonth-1;  
 }  
 cal(fullYear,fullMonth);   
}  
//下个月  
function nextMonthClick(){  
 if(fullMonth ==12){  
  ++fullYear;  
  fullMonth = 1;  
 }else{  
  ++fullMonth;  
 }  
 cal(fullYear,fullMonth);   
}  
//年月下拉框  
function changeYM(){  
 fullYear = document.getElementById('sel_year').value;  
 fullMonth = document.getElementById('sel_month').value;  
 cal(fullYear,fullMonth);  
}  
//当前日  
function getThisDay(){  
 fullYear = year;  
 fullMonth = month;  
 cal(fullYear,fullMonth);  
}  
//显示控件  
function showCal(){  
 cal(year,month);  
 //计算显示控件位置  
 var x = document.getElementById('txt_calendar').offsetLeft;  
 var y = document.getElementById('txt_calendar').offsetTop +22;  
 document.getElementById('div_calendar').style.left=x+"px";  
 document.getElementById('div_calendar').style.top= y+"px";  
 document.getElementById('div_calendar').style.display = "";  
}  
//隐藏控件  
function hiddenCal(){  
 document.getElementById('div_calendar').style.display = "none";  
}  
//选择日期  
function setInput(selDay){  
 document.getElementById('txt_calendar').value=fullYear+splitStr+fullMonth+splitStr+selDay;  
 hiddenCal();  
}  
//鼠标移进时  
function mouseOver(obj){  
 obj.style.color="blue";  
}  
//鼠标移出时  
function mouseOut(obj){  
 obj.style.color="";  
}  
//键盘响应  
document.onkeydown=function(e)     
{  
 //浏览器兼容  
 var thisEvent=e || window.event;  
   var keyCode = thisEvent.keyCode || thisEvent.which;  
 //如果控件是隐藏状态  
 if(document.getElementById('div_calendar').style.display == "none"){  
  return false;  
 }  
 switch(keyCode){  
  case 32://空格  
  getThisDay();break;  
  case 27://Esc  
  hiddenCal();break;  
  case 37://left  
  backMonthClick();break;  
  case 39://right  
  nextMonthClick();break;  
 }  
}  
  
/*模拟windows7日历 鼠标滑轮滚动翻页*/  
var direct ;  
var scrollFunc=function(e){  
 //浏览器兼容  
 var thisEvent=e || window.event;  
 //IE,Opera,Chrome,safari  
 if(thisEvent.wheelDelta){  
     direct = thisEvent.wheelDelta;  
 }  
 else if(thisEvent.detail){//Firefox  
     direct = thisEvent.detail;  
 }  
 /*  Firefox 接收 +3 和 -3 
  其他浏览器接收 +120 和-120 
  +数表示鼠标向上滑动，-数表示向下滑动 
 */  
 //如果控件是隐藏状态  
 if(document.getElementById('div_calendar').style.display == "none"){  
  return false;  
 }  
 //向上滑动，调用上一个月  
 if(direct=="120" || direct=="3"){  
  backMonthClick();  
 //向下滑动，调用下一个月  
 }else if(direct=="-120" || direct=="-3"){  
  nextMonthClick();  
 }  
}  
//注册监听事件  
if(document.addEventListener){  
 //W3C  
 document.addEventListener('DOMMouseScroll',scrollFunc,false);  
}else{  
 //IE,Opera,Chrome,safari  
 document.onmousewheel = scrollFunc;  
}  