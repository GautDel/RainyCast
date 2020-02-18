import React, { useState, useEffect } from 'react';

const Moon = ({ moonPhase }) => {
  const [phase, setPhase] = useState("default-moon.png");

  useEffect(() => {
    getIcon(moonPhase);
  }, [moonPhase])

  const getIcon = (phase) => {
    let link = "default-moon.png";

    switch (true) {
      case (phase >= 0 && phase < 0.12): link = "new-moon.png";
        break;
      case (phase >= 0.13 && phase <= 0.24): link = "waxing-crescent-moon.png";
        break;
      case (phase >= 0.25 && phase <= 0.32): link = "first-quarter-moon.png";
        break;
      case (phase >= 0.33 && phase <= 0.49): link = "waxing-gibbous-moon.png";
        break;
      case (phase >= 0.50 && phase <= 0.62): link = "full-moon.png";
        break;
      case (phase >= 0.63 && phase <= 0.74): link = "waning-gibbous-moon.png";
        break;
      case (phase >= 0.75 && phase <= 0.87): link = "third-quarter-moon.png";
        break;
      case (phase >= 0.88 && phase <= 0.99): link = "waning-crescent-moon.png";
        break;
    }

    setPhase(link);
  }

  return (
    <div className="moon">
      <img src={window.location.origin + `/imgs/moon/${phase}`} alt={phase} />
    </div>
  )
}

export default Moon;
