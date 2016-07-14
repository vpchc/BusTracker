main();
function btnUrlChg() {
	"use strict";
	window.location.href = 'https://secure2.myunionportal.org/vpchc';
}
function compareDate(curDate){
  "use strict";
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0
  var dayString,monthString;
  var dateSplit;
  
  if(dd<10){
    dd='0'+dd;
  }
  if(mm<10){
    mm='0'+mm;
  } 
  dateSplit = curDate.split("/");
  monthString=dateSplit[0].toString();
  dayString=dateSplit[1].toString();
  mm=mm.toString();
  dd=dd.toString();
  if(dateSplit[0]==="0"){//This is the catch all in the function for times when bus is down or offline
	return(2);
  }else if(dateSplit[0]===mm){
    if(dateSplit[1]===dd){
      return(1);
	}else{return(0);}
  }else{return(0);}
  today = mm+'/'+dd;
}
function main(){
  "use strict";
  var i=0,count=0,temp=0,busStartHour=0,busStartMin=0,busEndMin=0,busEndHour=0,currentHour=0,currentMin=0,
      timeCompareMin=0,timeCompareHour=0,tempChange=0;
  var busSchedule=[
  	  "10/08","Rosedale","11:30 a.m. - 2:00 p.m.","14:00","11:30","0",
  	  "10/09","North Vermillion","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
  	  "10/10","Weekend","------","0:0","0:0","0",
  	  "10/11","Weekend","------","0:0","0:0","0",
 	  "10/12","Walmart","8:00 a.m. - 3:00 p.m.","15:00","8:00","0",
 	  "10/13","No Bus Today","------","0:0","0:0","0",
 	  "10/14","No Bus Today","------","0:0","0:0","0",
  	  "10/15","Fall Break","------","0:0","0:0","0",
  	  "10/16","Fall Break","------","0:0","0:0","0",
  	  "10/17","Weekend","------","0:0","0:0","0",
 	  "10/18","Weekend","------","0:0","0:0","0",
	  "10/19","No Bus Today","------","0:0","0:0","0",
	  "10/20","SVMS/SVHS","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "10/21","Rockville","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "10/22","No Bus Today","------","0:0","0:0","0",
	  "10/23","North Vermillion","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "10/24","Weekend","------","0:0","0:0","0",
	  "10/25","Weekend","------","0:0","0:0","0",
	  "10/26","Turkey Run","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "10/27","SVMS/SVHS","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "10/28","Rockville","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
 	  "10/29","Riverton Parke","8:30 a.m. - 11:00 a.m.","11:00","8:30","1",
	  "10/29","Rosedale","11:30 a.m. - 2:00 p.m.","14:00","11:30","0",
	  "10/30","North Vermillion","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "10/31","Weekend","------","0:0","0:0","0",
	  "11/01","Weekend","------","0:0","0:0","0",
	  "11/02","Ernie Pyle","8:30 a.m. - 10:30 a.m.","10:30","8:30","1",
	  "11/02","Van Duyn","11:00 a.m. - 2:00 p.m.","14:00","11:00","0",
	  "11/03","Central","8 a.m. - 10 a.m.","10:00","8:00","1",
	  "11/03","SVMS/SVHS","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "11/04","Rockville","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "11/05","Montezuma","8:30 a.m. - 2:00 p.m.","14:00","8:30","0",
	  "11/06","North Vermillion","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
 	  "11/07","Weekend","------","0:0","0:0","0",
 	  "11/08","Weekend","------","0:0","0:0","0",
 	  "11/09","Turkey Run","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
      "11/10","SVMS/SVHS","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
  	  "11/11","Rockville","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "11/12","Riverton Parke","8:30 a.m. - 11:00 a.m.","11:00","8:30","1",
	  "11/12","Rosedale","11:30 a.m. - 2:00 p.m.","14:00","11:30","0",
	  "11/13","North Vermillion","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "11/14","Weekend","------","0:0","0:0","0",
	  "11/15","Weekend","------","0:0","0:0","0",
	  "11/16","Ernie Pyle","8:30 a.m. - 10:30 a.m.","10:30","8:30","1",
	  "11/16","Van Duyn","11:00 a.m. - 2:00 p.m.","14:00","11:00","0",
	  "11/17","SVMS/SVHS","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "11/18","Rockville","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "11/19","Montezuma","8:30 a.m. - 2:00 p.m.","14:00","8:30","0",
	  "11/20","North Vermillion","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "11/21","Weekend","------","0:0","0:0","0",
	  "11/22","Weekend","------","0:0","0:0","0:0",
	  "11/23","No Bus Today","------","0:0","0:0","0",
	  "11/24","No Bus Today","------","0:0","0:0","0",
	  "11/25","Thanksgiving Break","------","0:0","0:0","0",
	  "11/26","Thanksgiving Break","------","0:0","0:0","0",
   	  "11/27","Thanksgiving Break","------","0:0","0:0","0",
	  "11/28","Weekend","------","0:0","0:0","0",
	  "11/29","Weekend","------","0:0","0:0","0",
	  "11/30","Turkey Run","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "12/01","Central","8 a.m. - 10 a.m.","10:00","8:00","1",
	  "12/01","SVMS/SVHS","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "12/02","Rockville","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "12/03","Riverton Parke","8:30 a.m. - 11:00 a.m.","11:00","8:30","1",
	  "12/03","Rosedale","11:30 a.m. - 2:00 p.m.","14:00","11:30","0",
	  "12/04","North Vermillion","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "12/05","Weekend","------","0:0","0:0","0",
	  "12/06","Weekend","------","0:0","0:0","0",
	  "12/07","Ernie Pyle","8:30 a.m. - 10:30 a.m.","10:30","8:30","1",
	  "12/07","Van Duyn","11:00 a.m. - 2:00 p.m.","14:00","11:00","0",
	  "12/08","SVMS/SVHS","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "12/09","Rockville","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "12/10","Montezuma","8:30 a.m. - 2:00 p.m.","14:00","8:30","0",
	  "12/11","North Vermillion","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "12/12","Weekend","------","0:0","0:0","0",
	  "12/13","Weekend","------","0:0","0:0","0",
	  "12/14","No Bus Today","------","0:0","0:0","0",
	  "12/15","SVMS/SVHS","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "12/16","Rockville","8:30 a.m. - 2:45 p.m.","14:45","8:30","0",
	  "12/17","Riverton Parke","8:30 a.m. - 11:00 a.m.","11:00","8:30","1",
	  "12/17","Rosedale","11:30 a.m. - 2:00 p.m.","14:00","11:30","0",
	  "12/18","Christmas Break","------","0:0","0:0","0",
	  "12/19","Weekend","------","0:0","0:0","0",
	  "12/20","Weekend","------","0:0","0:0","0",
	  "12/21","Christmas Break","------","0:0","0:0","0",
	  "12/22","Christmas Break","------","0:0","0:0","0",
	  "12/23","Christmas Break","------","0:0","0:0","0",
	  "12/24","Christmas Break","------","0:0","0:0","0",
	  "12/25","Christmas Break","------","0:0","0:0","0",
 	  "12/26","Weekend","------","0:0","0:0","0",
	  "12/27","Weekend","------","0:0","0:0","0",
	  "12/28","Christmas Break","------","0:0","0:0","0",
	  "12/29","Christmas Break","------","0:0","0:0","0",
	  "12/30","Christmas Break","------","0:0","0:0","0",
	  "12/31","Christmas Break","------","0:0","0:0","0"
  ];
  while(i<busSchedule.length){
    if(count===0){//Date index
      if(compareDate(busSchedule[i])===0){//checks to see if on the current date, if not then skip to next section
    	i+=6;
      }else{//On the current date, step forward to next index
	    i++;
	    count++;
     }
    }else if(count===1){//Location index
      document.getElementById("locationtext").innerHTML=busSchedule[i++];
	  count++;
    }else if(count===2){//Times index
      document.getElementById("timestext").innerHTML=busSchedule[i++];
      count++;
    }else if(count===3){//EndTime index
	  temp=busSchedule[i].split(":");
	  busEndHour=parseInt(temp[0]);
	  busEndMin=parseInt(temp[1]);
	  temp=busSchedule[i+1].split(":");
	  busStartHour=parseInt(temp[0]);
	  busStartMin=parseInt(temp[1]);
      temp=new Date();
	  currentHour=temp.getHours();
	  currentMin=temp.getMinutes();
	  timeCompareHour=busStartHour-currentHour;
	  timeCompareMin=busEndMin-currentMin;
	  //The below statement is for the following: before bus opens, at the start hour but not start min,
	  //after the bus closes or at the close hour and after the close minute AND there isn't another location,
	  //opening hour of the bus is 0 which signifies a closed day(ex weekend,holiday's,etc)
	  if(currentHour<busStartHour || (currentHour===busStartHour && currentMin<busStartMin) || 
	    ((currentHour>busEndHour || (currentHour===busEndHour && currentMin>busEndMin)) && busSchedule[i+2]==="0" ||
	    busStartHour===0)){
		//The below statement is for when the bus is going to two locations and is currently en route to second
		//The i>=10 is a catch so that a 1 isn't put into the first date which would cause the 
		if((currentHour<busStartHour || (currentHour===busStartHour && currentMin<busStartMin)) && 
		  busSchedule[i-4]==="1" && i>=10){
	    	document.getElementById("statustext").innerHTML="En Route";
			tempChange=document.getElementsByClassName("type1");
	        tempChange[0].style.backgroundColor="yellow";
		}else if((timeCompareHour===1 && timeCompareMin>30) || (currentHour===busStartHour && timeCompareMin<30)){
			document.getElementById("statustext").innerHTML="Opening Soon";
			tempChange=document.getElementsByClassName("type1");
	        tempChange[0].style.backgroundColor="yellow";
		}else{
			document.getElementById("statustext").innerHTML="Closed";
			tempChange=document.getElementsByClassName("type1");
	        tempChange[0].style.backgroundColor="red";
		}
		break;
	  }
	  if((busEndHour-currentHour)>0){
	    timeCompareMin=35;//this is just an easy way to set the status green when diff. of current and bus hour is >=1
	  }
      if(currentHour===busStartHour || timeCompareMin > 30){
	    document.getElementById("statustext").innerHTML="Open";
	    tempChange=document.getElementsByClassName("type1");
	    tempChange[0].style.backgroundColor="green";
      }else if(timeCompareMin <= 30 && timeCompareMin >=1 && busSchedule[i+2]==="0"){
	    document.getElementById("statustext").innerHTML="Closing Soon";
	    tempChange=document.getElementsByClassName("type1");
	    tempChange[0].style.backgroundColor="yellow";
      }else{
	    if(busSchedule[i+2]==="1"){//This is when there are multiple locations for that day
	      i+=3;
	      count=0;
          continue;
        }else{
	      document.getElementById("statustext").innerHTML="Closed";
	      tempChange=document.getElementsByClassName("type1");
	      tempChange[0].style.backgroundColor="red";
        }
      }
      break;
    }
  }
}
