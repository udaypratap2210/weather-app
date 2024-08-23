import React, { memo } from 'react'
import './DataWeather.css'
import PropTypes from 'prop-types'

function DataWeather ({ dailyData }) {
  if (!dailyData || !Array.isArray(dailyData) || dailyData.length === 0) {
    return <div>No daily forecast data available</div>
  }

  return (
    <div className="daily-weather">
      {dailyData.map((day, index) => (
        <div key={index} className="daily-item">
          <p>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
          <img
            src={day.day?.condition?.icon}
            alt={day.day?.condition?.text || 'weather icon'}
          />
          <p>
            {Math.round(day.day?.maxtemp_c ?? 0)}°C / {Math.round(day.day?.mintemp_c ?? 0)}°C
          </p>
        </div>
      ))}
    </div>
  )
}

DataWeather.displayName = 'DataWeather'

DataWeather.propTypes = {
  dailyData: PropTypes.array.isRequired
}

export default memo(DataWeather)
