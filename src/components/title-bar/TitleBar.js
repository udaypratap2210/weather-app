import React, { memo } from 'react'
import PropTypes from 'prop-types'

function TitleBar ({ date, city, description }) {
  return (
    <div className="titlebar">
      <p className="date">{date}</p>
      <h4 className="city">{city}</h4>
      <p className="description">{description}</p>
    </div>
  )
}

TitleBar.displayName = 'TitleBar'

TitleBar.propTypes = {
  date: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default memo(TitleBar)
