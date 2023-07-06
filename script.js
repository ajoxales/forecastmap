// Initialize and display the map
function initMap() {
	// Specify the coordinates for the center of the map
	var centerCoords = { lat: 14.299, lng: 120.959 };

	// Create a new map instance
	var map = new google.maps.Map(document.getElementById("map"), {
		center: centerCoords,
		zoom: 12,
	});

	window.addEventListener("resize", function () {
		map.setCenter(centerCoords);
	});

	// Add a click event listener to the map
	map.addListener("click", function (event) {
		const lat = parseFloat(event.latLng.lat());
		const long = parseFloat(event.latLng.lng());
		let loc = "";

		const apiKey = "aff7907d4c64454698b104900230507";

		// Construct the API URL with parameters
		const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${long}&days=7`;

		// Fetch weather data
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				// Handle the weather data
				console.log(data); // Do whatever you need with the data
				loc = data.location.name;
				region = data.location.region;

				function getCurrentDay(dataDate) {
					let date = new Date(dataDate);
					let actualDate = date.getDay();
					let dateWord = "";
					switch (actualDate) {
						case 0:
							dateWord = "Sunday";
							break;
						case 1:
							dateWord = "Monday";
							break;
						case 2:
							dateWord = "Tuesday";
							break;
						case 3:
							dateWord = "Wednesday";
							break;
						case 4:
							dateWord = "Thursday";
							break;
						case 5:
							dateWord = "Friday";
							break;
						case 6:
							dateWord = "Saturday";
							break;
					}
					return dateWord;
				}

				function changeTemp(index) {
					const temp = data.forecast.forecastday[index].day.avgtemp_c;
					const icon =
						data.forecast.forecastday[index].day.condition.icon;
					let dataDate = data.forecast.forecastday[index].date;
					let curDay = getCurrentDay(dataDate);
					const high = data.forecast.forecastday[index].day.maxtemp_c;
					const low = data.forecast.forecastday[index].day.mintemp_c;

					document.getElementById("highlow").innerHTML =
						high + " / " + low;

					document.getElementById(`icon${index}`).src = icon;
					document.getElementById(`temp${index}`).innerHTML =
						temp + "°C";

					document.getElementById(`day${index}`).innerHTML = curDay;
					console.log(curDay);

					document.getElementById("day0").innerHTML = "Today";
					document.getElementById("day1").innerHTML = "Tomorrow";
				}

				function revealElement() {
					var element = document.getElementById("details");
					document.getElementById("city").textContent =
						loc + ", " + region;
					element.style.display = "block";
				}

				changeTemp(0);
				changeTemp(1);
				changeTemp(2);
				changeTemp(3);
				changeTemp(4);
				changeTemp(5);
				changeTemp(6);

				revealElement();
			})
			.catch((error) => {
				console.log("Error:", error);
			});
	});
}
