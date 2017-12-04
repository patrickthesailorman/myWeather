/*global $ navigator ipKey WuApi*/
$(document).ready(function() {
			var lon;
			var lat;
			var currentPosition;
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					currentPosition = position;
					$("#location").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude)
					console.log(currentPosition);
				})
			} else {
				alert("Your location is not supported by this browser!")
			}
			// 	var long;
			// 	var lat;
			// 	$.ajax({
			// 		method: "GET",
			// 		url: "https://ipfind.co/?ip=8.8.8.8",
			// 		data: {
			// 			auth: ipKey
			// 		},
			// 		success: function(data) {
			// 			console.log(data)
			// 			for (var i = 0; i < data.length; i++) {
			// 				var location = document.createElement("H4");
			// 				location.setAttribute("value", data[i])
			// 				location.innerHTML = data.latitude + " " + data.longitude;
			// 				document.getElementById('location').appendChild(location);
			// 				console.log("location added");
			//  		}
			// var api = 'https://api.wunderground.com/api//geolookup/conditions/lat=' + lat + '&lon=' + long + '&apiid'= WuApi;
			// 			$.ajax({
			// 				method: "GET",
			// 				url: 'https://fcc-weather-api.glitch.me/api/current?',
			// 				data: {
			//     				    lon: currentPosition.coords.longitude,
			//     				    lat: currentPosition.coords.latitude
			// 				},
			$.getJSON('https://fcc-weather-api.glitch.me/api/current?' + 'lon=' + currentPosition.coords.longitude + 'lat=' + currentPosition.coords.latitude);

			function(data2) {
				sucess: function(data2) {
					console.log(data2);
					var fTemp;
					var cTemp;
					var tempSwap = true;
					var weatherType = data2.weather[0].description;
					var kelvin = data2.main.temp;
					var windSpeed = data2.wind.speed;
					var city = data2.name;
					fTemp = (kelvin * (9 / 5) - 459.67).toFixed(1); //convert kelvin to farhenheit
					cTemp = (kelvin - 273).toFixed(1);
					console.log(city);
					$("#city").html(city);
					$("#weatherType").html(weatherType);
					$("#fTemp").html(fTemp + " &#8457;");
					$("#fTemp").click(function() {
						if (tempSwap === false) {
							$("#fTemp").html(cTemp + " &#8451;");
							tempSwap = true;
						} else {
							$("fTemp").html(fTemp + " &#8457;");
							tempSwap = false;
						}
					});
					windSpeed = (2.237 * (windSpeed)).toFixed(1);
					$("#windSpeed").html(windSpeed + "mph");
					// if(fTemp<50){
					//     $('body').css('background-image', 'url    ');
					// } else if(fTemp>70){
					// }
				}
			}
});

