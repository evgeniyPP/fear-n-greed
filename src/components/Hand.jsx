import { useEffect, useState } from 'react';

export function Hand({ score }) {
  const [rotate, setRotate] = useState(null);

  useEffect(() => {
    if (!score) {
      return;
    }

    setRotate((score * 180) / 100 - 90);
  }, [score]);

  if (!score) {
    return null;
  }

  return (
    <div className="market-fng-gauge__hand">
      <svg
        className="market-fng-gauge__hand-svg"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 10 124"
        style={{ transform: `rotate(${rotate}deg)` }}
        preserveAspectRatio="xMidYMid meet"
      >
        <path d="M5,0.2c-0.6,0-1.1,0.5-1.1,1.1L0.8,106.7c0,2.3-0.1,13.6,2.6,16.3c0.6,0.6,1.3,0.7,1.8,0.7l0,0c0.5,0,1.1-0.2,1.7-0.9c0.1-0.2,0.3-0.3,0.4-0.5c2.2-3.6,1.7-13.9,1.6-16L6.1,1.3C6.1,0.7,5.6,0.2,5,0.2"></path>
      </svg>
    </div>
  );
}
