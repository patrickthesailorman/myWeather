/*global $ navigator*/
$(document).ready(function() {
    
    if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    $("#location").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
  })
}

    var long;
    var lat;
    
    $.ajax({
		method: "GET",
		url: "https://ipfind.co/?ip=8.8.8.",
		data: {
			language: "en",
			country: "us",
			auth: ipKEY
		},
		
		success: function(data) {
			if (data.status === "ok") {
				console.log(data)
				for (var i = 0; i < data.length; i++) {
					var location = document.createElement("H4");
					location.setAttribute("value", data[i])
					location.innerHTML = data.latitude + " " + data.longitude;
					document.getElementById('location').appendChild(location);
				}
				console.log("location added");
			}
    $.getJSON("https://ipfind.co/?ip=8.8.8.8&auth=ipkey",function(data2){
        lat=data2.lat;
        long=data2.lon;
        console.log(data2);
        var api = 'https://api.wunderground.com/api//geolookup/conditions/lat='+lat+'&lon='+long+'&apiid= WuApi';
         
    $.getJSON(api, function(data) {
        var fTemp;
        var cTemp;
        var tempSwap = true;
        
        var weatherType=data.weather[0].description;
        var kelvin=data.main.temp;
        var windSpeed=data.wind.speed;
        var city=data.name;
        
        fTemp = (kelvin*(9/5)-459.67).toFixed(1); //convert kelvin to farhenheit
        cTemp = (kelvin-273).toFixed(1);
        console.log(city);
        $("#city").html(city);
        $("#weatherType").html(weatherType);
        $("#fTemp").html(fTemp + " &#8457;");
        $("#fTemp").click(function() {
            if(tempSwap===false){
                $("#fTemp").html(cTemp + " &#8451;");
                tempSwap=true;
            } else {
                $("fTemp").html(fTemp + " &#8457;");
                tempSwap=false;
            }
        });
        windSpeed = (2.237*(windSpeed)).toFixed(1);
        $("#windSpeed").html(windSpeed + "mph");
        // if(fTemp<50){
        //     $('body').css('background-image', 'url    ');
        // } else if(fTemp>70){
            
        // }
    });
    })
    
});