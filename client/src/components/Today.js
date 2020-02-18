import React from 'react'

const Today = ({ day, daily, fToC }) => {

  return (
    <div className="container">
      <div className="row day">
        <div className="today">
          <span>{day}</span>
        </div>

        <div className="high-low">
          <span>{daily.data !== undefined ? `  ${fToC(daily.data[0].temperatureLow)}°` : null}</span>
          <span>&nbsp; &nbsp;{daily.data !== undefined ? `  ${fToC(daily.data[0].temperatureHigh)}°` : null}</span>
        </div>
      </div>

    </div>
  )
}

export default Today
