/*
//.......|.........|.........|.........|.........|.........|.........|.........| 
	Version 3.0.0
	Notes: Same as version 2.0 but uses the online database instead of an included one.
	TODO:  
//.......|.........|.........|.........|.........|.........|.........|.........|  
*/

$(document).ready(function(){
  function busTrackerTimeCheck($startTime, $endTime, $flag){
  /*
    Arguments:   startTime (The Bus start time)
                 endTime (The Bus end time)
                 flag (0 - one location; 1 - two locations)
    Description: Looks at the start and end times of the bus and compares to
                 the current time.
    Returns:     0 - Closed, 1 - Open, 2 - Opening Soon, 3 - En route,
                 4 - Closing Soon	
  */
      "use strict";
    //Add two to index to get to the location to the start time
        var $splitTime = 0;
        var $year = 0;
        var $month = 0;
        var $day = 0;
        var $hour = 0;
        var $min = 0;
        var $currentTime = 0;
        var $busStartTime = 0;
        var $busEndTime = 0;
        var $compareStart = 0;
        var $compareEnd = 0;
    //Create a useable current time date method
      $splitTime = new Date();
      $year = $splitTime.getYear();
      $month = $splitTime.getMonth();
      $day = $splitTime.getDate();
      $hour = $splitTime.getHours();
      $min = $splitTime.getMinutes();
      $currentTime = new Date($year, $month, $day, $hour, $min);

    //Split the start time and create a useable bus start time date method		 
      $splitTime = $startTime.toString().split(":");
      $hour = $splitTime[0];
      $min = $splitTime[1];
      $busStartTime = new Date($year, $month, $day, $hour, $min);

    //Split the end time and create a useable bus end time date method	  
      $splitTime = $endTime.toString().split(":");
      $hour = $splitTime[0];
      $min = $splitTime[1];
      $busEndTime = new Date($year, $month, $day, $hour, $min);  
      
      $compareStart = $busStartTime - $currentTime;
      $compareEnd = $busEndTime - $currentTime;
  
    //Where the comparing happens
      if($compareEnd <= 1.8e6 & $compareEnd > 0){
        return 4;
      }else if($compareStart <= 1.8e6 & $compareStart > 0){
        if($flag == 1){
          return 3;
        }else{ 
          return 2;
        }
      }else if($compareStart <= 0 & $compareEnd > 0){
        return 1;
      }else{
        return 0;
      }
  };
    
  var $today = 0;
  var $twoAreas = 0;
  var $tempChange = [ ];
  var $busStart = 0;
  var $busEnd = 0;
  var $flag = 0;
  var $status = 0;
  
  //Get main start/end times and flag from url and store them.
  $.ajax({
     async: false,
     type: 'GET',
     url: '/info/bus_web_schedule.html',
     success: function(data) {
      var $busStartTemp = data.split('<div id="mainstart">');
      var $busStartTemp2 = $busStartTemp[1].split('</div>');
      $busStart = $busStartTemp2[0];
           
      var $busEndTemp = data.split('<div id="mainend">');
      var $busEndTemp2 = $busEndTemp[1].split('</div>');
      $busEnd = $busEndTemp2[0];
    
      var $flagTemp = data.split('<div id="flag">');
      var $flagTemp2 = $flagTemp[1].split('</div>');
      $flag = $flagTemp2[0];
     }
  });
  //Check the times for the first location and store the status.
  $status = busTrackerTimeCheck($busStart, $busEnd, $flag);
  //If the first location is closed, check the second location
  if($status == 0 && $flag == 1){
    //Get sub start/end times from url and store them.
    $.ajax({
      async: false,
      type: 'GET',
      url: '/info/bus_web_schedule.html',
      success: function(data) {
        var $busStartTemp = data.split('<div id="substart">');
        var $busStartTemp2 = $busStartTemp[1].split('</div>');
        $busStart = $busStartTemp2[0];

        var $busEndTemp = data.split('<div id="subend">');
        var $busEndTemp2 = $busEndTemp[1].split('</div>');
        $busEnd = $busEndTemp2[0];

        var $flagTemp = data.split('<div id="flag">');
        var $flagTemp2 = $flagTemp[1].split('</div>');
        $flag = $flagTemp2[0];
      }
    }); 
    //Check the times for the second location and store the status.
    $status = busTrackerTimeCheck($busStart, $busEnd, $flag);
    //Display the sub-location
    $( "#bus-location" ).load("/info/bus_web_schedule.html #sublocation");
    //Display the sub-hours
    $( "#bus-hours" ).load("/info/bus_web_schedule.html #subhours");
  }else{
    //Display the main-location
    $( "#bus-location" ).load("/info/bus_web_schedule.html #mainlocation");
    //Display the main-hours
    $( "#bus-hours" ).load("/info/bus_web_schedule.html #mainhours");
  }
  // Display the status
  if($status === 1){
    document.getElementById("bus-status").innerHTML = "Open";
    document.getElementById("bus-status-icon").src="/images/bus_tracker_status_green.png";
  }else if($status === 2){
    document.getElementById("bus-status").innerHTML = "Opening Soon";
    document.getElementById("bus-status-icon").src="/images/bus_tracker_status_yellow.png";
  }else if($status === 3){
    document.getElementById("bus-status").innerHTML = "En Route";
    document.getElementById("bus-status-icon").src="/images/bus_tracker_status_yellow.png";
  }else if($status === 4){
    document.getElementById("bus-status").innerHTML = "Closing Soon";
    document.getElementById("bus-status-icon").src="/images/bus_tracker_status_yellow.png";
  }else{
    document.getElementById("bus-status").innerHTML = "Closed";
    document.getElementById("bus-status-icon").src="/images/bus_tracker_status_red.png";
  }
});