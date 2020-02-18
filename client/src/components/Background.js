import React from 'react'

const Background = ({ link }) => {
  return (
    <div className="background">
      <div className="filter"></div>
      <img src={window.location.origin + `/imgs/backgrounds/${link}`} alt={link} />
    </div>
  )
}

export default Background
