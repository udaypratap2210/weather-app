import React, { memo } from 'react'
import './Temperature.css'
import PropTypes from 'prop-types'

function Temperature ({ temp, icon }) {
  return (
    <div className="temperature">
      <img src={`${icon}`} alt="Weather Icon" />
      <h2>{temp}°C</h2>
    </div>
  )
}

Temperature.displayName = 'Temperature'

Temperature.propTypes = {
  temp: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired
}

export default memo(Temperature)
