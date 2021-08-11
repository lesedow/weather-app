function processWeatherData (data) {
	return {
		name: data.name,
		country: data.sys.country,
		temperature: {
			temp: Math.round(data.main.temp),
			feelsLike: Math.round(data.main.feels_like),
			humidity: data.main.humidity
		},
		weather: {
			status: data.weather[0].description
		},
		wind: {
			speed: Math.round(data.wind.speed * 3.6)
		}
	}
}

export async function fetchWeatherData (cityName, key) {
	const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`
	const weatherResponse = await fetch(weatherApi)
	const weatherData = await weatherResponse.json()

	const processedData = processWeatherData(weatherData)

	return processedData
}

