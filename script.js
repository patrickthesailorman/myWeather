/*global $ navigator ipKey WuApi owApi*/

var lon;
var lat;
var kelvin;
var fTemp;
var cTemp;
var weatherType;
var tempSwap = false;

$(document).ready(function() {
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
				
				weatherType = data2.weather[0].description;
				kelvin = data2.main.temp;
				var windSpeed = data2.wind.speed;
				var city = data2.name;
				var icon = data2.weather[0].icon;
				fTemp = (kelvin * (9 / 5) - 459.67).toFixed(1); //convert kelvin to farhenheit
				cTemp = (kelvin - 273).toFixed(1);
				windSpeed = (2.237 * (windSpeed)).toFixed(1);
				$("#city").html(city);
				$("#weatherType").html(weatherType);
				$("#temp").html(fTemp + " &#8457;");
				// document.getElementById("temp").setAttribute(value, fTemp)
				$("#icon").html("<img src=https://openweathermap.org/img/w/" + icon + ".png>");
				$("#windSpeed").html(windSpeed + "mph");
					if(fTemp<50.0){
		    			$('body').css('background-image', 'url("/assets/amanda-kerr-87755.jpg")');
						} else if(fTemp>70.0){
						$('body').css('background-image', "url('/assets/casey-horner-353940.jpg')");	
						}
					}
		})
	}
	document.getElementById('toggleTemp').onclick = function() {
		console.log("clicky")
		console.log(document.getElementById('temp').innerHTML)
		console.log(fTemp)
		if (tempSwap){
			document.getElementById("temp").innerHTML = fTemp + " &#8457;";
			tempSwap = false;
		}else if (!tempSwap){
			document.getElementById("temp").innerHTML = cTemp + " &#8451";
			tempSwap = true;
		}
	};
});	