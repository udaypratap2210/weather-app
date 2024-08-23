import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import TitleBar from './components/title-bar/TitleBar'
import Temperature from './components/temperature/Temperature'
import DayInfo from './components/day-info/DayInfo'
import DataWeather from './components/data-weather/DataWeather'
import HourlyWeather from './components/hourly-weather/HourlyWeather'
import Search from './components/search/Search'
import monthNames from './constants/months'
import { appData } from './constants/api-key'

function App () {
  const [weatherData, setWeatherData] = useState(null)
  const [city, setCity] = useState(null)
  const [hourlyData, setHourlyData] = useState([])
  const [dailyData, setDailyData] = useState([])
  const [recentSearches, setRecentSearches] = useState([])
  const [cacheApiData, setCacheApiData] = useState({})
  const { key } = appData

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      fetchWeatherData(latitude, longitude)
    })
  }, [])

  // Initialize recent searches from localStorage
  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches')
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches))
    }
  }, [])

  const fetchWeatherData = useCallback(async (latitude, longitude) => {
    try {
      const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${latitude},${longitude}&days=3&aqi=no&alerts=no`)
      const data = await res.json()
      setWeatherData(data?.current)
      setCity(data?.location?.name)
      setHourlyData(data.forecast?.forecastday[0]?.hour || [])
      setDailyData(data.forecast?.forecastday || [])
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }, [])

  const handleSearch = useCallback(async (city, time = 3) => {
    const updateStateWithData = (data) => {
      if (data) {
        setWeatherData(data.current)
        setHourlyData(data.forecast.forecastday[0].hour)
        setDailyData(data.forecast.forecastday.slice(1))
        setRecentSearches(prevSearches => {
          const updatedSearches = [...prevSearches, city]
          const uniqueSearches = [...new Set(updatedSearches)]
          // Save unique searches to localStorage
          localStorage.setItem('recentSearches', JSON.stringify(uniqueSearches))
          return uniqueSearches
        })
      }
    }

    if (!cacheApiData[city]) {
      try {
        const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=${time}&aqi=no&alerts=no`)
        const data = await res.json()
        setCacheApiData(state => {
          cacheApiData[city] = data
          return cacheApiData
        })
        updateStateWithData(data)
      } catch (error) {
        console.error('Error searching for city:', error)
      }
    } else {
      const data = cacheApiData[city]
      updateStateWithData(data)
    }
  }, [cacheApiData])

  if (!weatherData) {
    return <div>Loading...</div>
  }

  const dateObj = new Date()
  const month = monthNames[dateObj.getUTCMonth()]
  const day = dateObj.getUTCDate()
  const year = dateObj.getUTCFullYear()
  const newDate = `${month} ${day}, ${year}`

  return (
    <div className="app">
      <TitleBar date={newDate} city={city} description={weatherData.condition.text} />
      <Search onSearch={handleSearch} recentSearches={recentSearches} setCity={setCity} setRecentSearches={setRecentSearches}/>
      <Temperature temp={Math.round(weatherData.temp_c)} icon={weatherData.condition.icon} />
      <DayInfo weatherInfo={weatherData} />
      <HourlyWeather hourlyData={hourlyData} />
      <DataWeather dailyData={dailyData} />
    </div>
  )
}

export default App
