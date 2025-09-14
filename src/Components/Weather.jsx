import React, { useState, useEffect } from 'react'
import './weather.css'

const Weather = () => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState('Khategaon')

  const API_KEY = '940bf2b2e0ab114d3c8993132f8bd542'

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            fetchWeatherByCoords(latitude, longitude)
          },
          () => {
            fetchWeatherByCity('Khategaon,MP,IN')
          }
        )
      } else {
        fetchWeatherByCity('Khategaon,MP,IN')
      }
    }

    const fetchWeatherByCoords = async (lat, lon) => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        if (response.ok) {
          const data = await response.json()
          setWeather({...data, name: 'Khategaon'})
          setCity('Khategaon')
        } else {
          fetchWeatherByCity('Khategaon,MP,IN')
        }
      } catch (error) {
        fetchWeatherByCity('Khategaon,MP,IN')
      } finally {
        setLoading(false)
      }
    }

    const fetchWeatherByCity = async (cityName) => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
        if (response.ok) {
          const data = await response.json()
          setWeather({...data, name: 'Khategaon'})
          setCity('Khategaon')
        } else {
          setWeather({
            name: 'Khategaon',
            main: { temp: 22, feels_like: 25 },
            weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
            wind: { speed: 3.5 }
          })
        }
      } catch (error) {
        setWeather({
          name: 'Khategaon',
          main: { temp: 22, feels_like: 25 },
          weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
          wind: { speed: 3.5 }
        })
      } finally {
        setLoading(false)
      }
    }

    getUserLocation()
  }, [])

  if (loading) {
    return (
      <div className='weather'>
        <div className='weather-loading'>Loading...</div>
      </div>
    )
  }

  return (
    <div className='weather'>
      <div className='weather-header'>
        <h3>Weather</h3>
        <i className='fa-solid fa-cloud-sun'></i>
      </div>
      {weather && (
        <div className='weather-info'>
          <div className='weather-location'>{weather.name}</div>
          <div className='weather-temp'>{Math.round(weather.main.temp)}°C</div>
          <div className='weather-desc'>{weather.weather[0].description}</div>
          <div className='weather-details'>
            <span>Feels like {Math.round(weather.main.feels_like)}°C</span>
            <span>Wind {weather.wind.speed} m/s</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Weather
