/*global $ navigator ipKey WuApi owApi*/
$(document).ready(function() {
	var lon;
	var lat;
	var currentPosition;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			currentPosition = position;
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			$("#location").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude)
			// console.log(currentPosition);
			loadWeatherData();
		})
	} else {
		alert("Your location is not supported by this browser!")
	}

var kelvin;
var fTemp;
var cTemp;
	function loadWeatherData() {
		$.ajax({
			method: "GET",
			url: 'https://api.openweathermap.org/data/2.5/weather',
			data: {
				lon: lon,
				lat: lat,
				APPID: owApi
			},
			success: function(data2) {
				console.log(data2);
				
				// var tempSwap = true;
				var weatherType = data2.weather[0].description;
				kelvin = data2.main.temp;
				var windSpeed = data2.wind.speed;
				var city = data2.name;
				var icon = data2.weather[0].icon;
				fTemp = (kelvin * (9 / 5) - 459.67).toFixed(1); //convert kelvin to farhenheit
				cTemp = (kelvin - 273).toFixed(1);
				windSpeed = (2.237 * (windSpeed)).toFixed(1);
				
				$("#city").html(city);
				$("#weatherType").html(weatherType);
				$("#fTemp").html(fTemp + " &#8457;");
				$("#icon").html("<img src=https://openweathermap.org/img/w/" + icon + ".png>");
				$("#windSpeed").html(windSpeed + "mph");
			}
		})
	}				
		
document.getElementById('temp').onclick = function() {
	if('fTemp' == fTemp) {
		$("#fTemp").html(cTemp + " &#8451;")	
	} else if ('fTemp' == cTemp) {
		$("fTemp").html(fTemp + " &#8457;");
	}
};
			
				// $("#fTemp").click(function() {
				// 	if (!tempSwap) {
				// 		$("#fTemp").html(cTemp + " &#8451;");
				// 		tempSwap = true;
				// 	} else {
				// 		$("fTemp").html(fTemp + " &#8457;");
				// 		tempSwap = false;
				// 	}
				// });
				
				
				// if(fTemp<50){
				//     $('body').css('background-image', 'url    ');
				// } else if(fTemp>70){
				// }

});		