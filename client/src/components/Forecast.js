import React from 'react'

const Forecast = ({ weather, zone, temp }) => {
  const { summary, icon } = weather;

  return (

    <div className="container forecast-style">
      <div className="row ">
        <div className="col ">
          <h2>{zone}</h2>
          <img src={window.location.origin + `/imgs/icons/${icon}.png`} alt={icon} />
          <h1>{temp}°</h1>
          <h3>{summary}</h3>
        </div>
      </div>
    </div>
  )
}

export default Forecast;
