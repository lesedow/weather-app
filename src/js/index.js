import { fetchWeatherData } from './modules/weatherInfo.js'
import config from '../../config.json'
import '../css/styles.css'

const sky = document.getElementById('sky')
const city = document.getElementById('city')
const temperature = document.getElementById('temperature')
const humidity = document.getElementById('humidity')
const feelsLike = document.getElementById('feels__like')
const wind = document.getElementById('wind')

const searchBar = document.getElementById('search__form')
const change = document.getElementById('change')

let isImperialUnit = false
let globalData;

// When loading the page
let defaultCity = 'Tokyo'
getWeatherInfo(defaultCity)

function updateDisplay () {
	sky.textContent = globalData.weather.status
	city.textContent = `${globalData.name}, ${globalData.country}`
	humidity.textContent = `Humidity: ${globalData.temperature.humidity}`

	if (isImperialUnit) {
		temperature.textContent = `${Math.round(globalData.temperature.temp * 9 / 5 + 32)}°F`
		wind.textContent = `Wind: ${Math.round(globalData.wind.speed / 1.609344)} mph`
		feelsLike.textContent = `Feels Like: ${Math.round(globalData.temperature.feelsLike * 9 / 5 + 32)}°F`
		return
	}

	temperature.textContent = `${globalData.temperature.temp}°C`
	wind.textContent = `Wind: ${globalData.wind.speed} km/h`
	feelsLike.textContent = `Feels Like: ${globalData.temperature.feelsLike}°C`
}

function getWeatherInfo (cityName) {
	fetchWeatherData(cityName, config.api_key).then((data) => {
		globalData = Object.create(data)
		updateDisplay()
	})

	.catch(err => console.log(err))

}

searchBar.addEventListener('submit', (e) => {
	e.preventDefault()
	const searchValue = searchBar.querySelector('input').value

	getWeatherInfo(searchValue)
})

change.addEventListener('click', () => {
	isImperialUnit = !isImperialUnit
	updateDisplay()
})