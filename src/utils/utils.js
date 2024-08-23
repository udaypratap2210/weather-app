import nlp from 'compromise'

export const parsedCity = (sentence) => {
  if (sentence) {
    // Parse the sentence using compromise
    const doc = nlp(sentence)

    // Attempt to extract a city or place name by checking for common patterns
    const city = doc.match('#Place+').text() || doc.match('#Noun+').text()

    return city || null
  }
  return null
}

export const parseTimePeriod = (timePeriodText) => {
  if (timePeriodText) {
    const timeText = timePeriodText.toLowerCase()
    // Map common natural language time expressions to precise days
    const timeMapping = {
      today: '1',
      tomorrow: '1',
      week: '7',
      'next week': '7',
      month: '30',
      'next month': '30'
    }
    // Check if the timeText matches any of the keys in the mapping
    for (const [key, value] of Object.entries(timeMapping)) {
      if (timeText.includes(key)) {
        return value || 3
      }
    }
  }
}

export const formatTime = (timeString) => {
  const date = new Date(timeString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
