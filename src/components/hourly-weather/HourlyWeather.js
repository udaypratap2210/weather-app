import React, { memo } from 'react'
import './HourlyWeather.css'
import PropTypes from 'prop-types'
import { formatTime } from '../../utils/utils'

function HourlyWeather ({ hourlyData }) {
  if (!hourlyData || !Array.isArray(hourlyData) || hourlyData.length === 0) {
    return <div>No hourly data available</div>
  }

  // Get the current time in UTC
  const now = new Date()
  const currentHour = now.getUTCHours()
  const currentDay = now.getUTCDate() // Assuming date is required for filtering on same day

  // Filter hourly data to show only future hours today
  const filteredHourlyData = hourlyData.filter(hour => {
    const hourDate = new Date(hour.time)
    return hourDate.getUTCDate() === currentDay && hourDate.getUTCHours() >= currentHour
  })

  return (
    <div className="hourly">
      <h3>HOURLY FORECAST</h3>
      <div className={filteredHourlyData.length !== 0 ? 'hourly-container' : 'hourly-container-no-data'}>
        {filteredHourlyData.length === 0
          ? (
            <div className="no-hourly-data"><span>No upcoming hourly data available</span></div>
            )
          : (
              filteredHourlyData.map((hour, index) => (
              <div key={index} className="hourly-item">
                <div className="hourly-time">{formatTime(hour.time)}</div>
                {hour.condition && hour.condition.icon && (
                  <img
                    src={hour.condition.icon}
                    alt={hour.condition.text || 'weather icon'}
                    className="hourly-icon" />
                )}
                <div className="hourly-temp">{Math.round(hour.temp_c)}°</div>
              </div>
              ))
            )}
      </div>
    </div>
  )
}

HourlyWeather.displayName = 'HourlyWeather'

HourlyWeather.propTypes = {
  hourlyData: PropTypes.array.isRequired
}
export default memo(HourlyWeather)
