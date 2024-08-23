import React, { memo, useState, useEffect, useRef, useCallback } from 'react'
import './Search.css'
import PropTypes from 'prop-types'
import { parseTimePeriod, parsedCity } from '../../utils/utils'

function Search ({ onSearch, recentSearches, setCity, setRecentSearches }) {
  const [input, setInput] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Handle click outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (input) {
      const city = parsedCity(input)
      const time = parseTimePeriod(input)

      if (!city) {
        setCity(input?.toLowerCase())
      } else {
        setCity(city?.toLowerCase())
      }

      onSearch(city || input.toLowerCase(), time)
    } else {
      onSearch(input)
      setCity(input.toLowerCase())
    }

    setInput('')
    setIsDropdownOpen(false)
  }, [input])

  const handleDropdownClick = useCallback((val) => {
    if (val) {
      const city = parsedCity(val)
      const time = parseTimePeriod(val)
      console.log(city, time)
      if (city) {
        onSearch(city, time)
        setCity(city?.toLowerCase())
      }
      setIsDropdownOpen(false)
    }
  }, [])

  const handleClearRecentSearches = useCallback(() => {
    localStorage.removeItem('recentSearches')
    setRecentSearches([])
  }, [])

  return (
    <div className="search-container" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={input}
          placeholder="Enter city name or query"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          onChange={(e) => setInput(e.target.value.toLowerCase())}
        />
        <button type="submit">Search</button>
      </form>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="recent-searches">
            <h5>Recent Searches:</h5>
            <ul>
              {recentSearches.map((city, index) => (
                <li key={index} onClick={() => handleDropdownClick(city)}>
                  {city}
                </li>
              ))}
            </ul>
            {recentSearches.length !== 0 && <div className="clear-button"><button onClick={handleClearRecentSearches} className="clear-button">
              Clear Recent Searches
            </button></div>}
          </div>
        </div>
      )}
    </div>
  )
}

Search.displayName = 'Search'

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  recentSearches: PropTypes.array.isRequired,
  setCity: PropTypes.func.isRequired,
  setRecentSearches: PropTypes.func.isRequired
}

export default memo(Search)
