import React from 'react'

const Loader = ({ msg, anim }) => {
  return (

    <div className={anim ? "loader loaded-anim" : "loader"}>
      {/* Sun SVG */}
      <svg className="sun" width="100%" height="100%" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/" style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: "2" }}>
        <circle cx="250" cy="250" r="146.621" style={{ fill: "#f7c45d" }} />
      </svg>

      {/* Moon SVG */}
      <svg className="moon" width="100%" height="100%" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" xmlnsserif="http://www.serif.com/" style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinecap: "round", strokeLinejoin: "round", strokeMiterlimit: "1.5" }}><circle cx="250" cy="250" r="146.621" style={{ fill: "#f7f7f7", stroke: "#bfbfbf", strokeWidth: "4.5px" }} />
        <circle cx="179.485" cy="199.483" r="20.031" style={{ fill: "#dbdbdb" }} />
        <circle cx="300.567" cy="304.294" r="52.592" style={{ fill: "#d1d1d1" }} />
        <circle cx="292.73" cy="166.861" r="12.591" style={{ fill: "#c6c6c6" }} />
      </svg>

      <p>{msg}</p>
    </div >
  )
}

export default Loader
