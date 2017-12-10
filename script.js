/*global $ navigator ipKey WuApi owApi*/

var lon;
var lat;
var kelvin;
var fTemp;
var cTemp;
var weatherType;
var tempSwap = false;
var high;
var low;

$(document).ready(function() {
	var currentPosition;
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			currentPosition = position;
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			$("#location").html("latitude: " + position.coords.latitude.toFixed(4) + "<br>longitude: " + position.coords.longitude.toFixed(4))
			
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
				low = (data2.main.temp_min * (9 / 5) - 459.67).toFixed(1);
				high = (data2.main.temp_max * (9 / 5) - 459.67).toFixed(1);
				var windSpeed = data2.wind.speed;
				var city = data2.name;
				var icon = data2.weather[0].icon;
				fTemp = (kelvin * (9 / 5) - 459.67).toFixed(1); //convert kelvin to farhenheit
				cTemp = (kelvin - 273).toFixed(1);
				windSpeed = (2.237 * (windSpeed)).toFixed(1);
				$("#city").html(city);
				$("#weatherType").html(weatherType);
				$("#temp").html(fTemp + " &#8457;");
				$("#icon").html("<img src=https://openweathermap.org/img/w/" + icon + ".png height='75' width='75'>");
				$("#windSpeed").html(windSpeed + "mph");
				$("#summary").html("Today will see a high of " + high + " and a low of " + low + ". Mostly " + weatherType + " with a windspeed of " + windSpeed + "mph");
					if(fTemp>50.0){
		    			$('body').css('background-image', 'url("http://www.trbimg.com/img-57f6d089/turbine/la-1475793216-snap-photo/950/950x534 950w") ');
						} else if(fTemp>70.0){
						$('body').css('background-image', 'url("http://www.ireadculture.com/wp-content/uploads/images/43/9343/9343.jpg")');	
						} else if(fTemp<40.0){
						$('body').css('background-image', 'url("https://images2.phoenixnewtimes.com/imager/u/original/6630770/jackfrozen_thumb_500x374_thumb_500x374.jpg")');
						$('.jumbotron').css('float', 'left');
						$('.jumbotron').css('width', '45%');
						}
					}
		})
	}
	document.getElementById('toggleTemp').onclick = function() {
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