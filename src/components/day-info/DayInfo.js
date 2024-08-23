import React, { memo } from 'react'
import './DayInfo.css'
import PropTypes from 'prop-types'

function ExtraInfo ({ weatherInfo }) {
  const { wind_kph: windSpeed, vis_km: visibility, humidity, pressure_mb: pressure } = weatherInfo
  return (
    <div className="extra">
      <div className="col">
        <div className="info">
          <h5>Wind Status</h5>
          <p>{windSpeed} mps</p>
        </div>
        <div className="info">
          <h5>Visibility</h5>
          <p>{visibility} m</p>
        </div>
      </div>
      <div className="col">
        <div className="info">
          <h5>Humidity</h5>
          <p>{humidity}%</p>
        </div>
        <div className="info">
          <h5>Air Pressure</h5>
          <p>{pressure} hPa</p>
        </div>
      </div>
    </div>
  )
}

ExtraInfo.displayName = 'ExtraInfo'

ExtraInfo.propTypes = {
  weatherInfo: PropTypes.object.isRequired
}

export default memo(ExtraInfo)
