import { useEffect, useState } from 'react';
import { Buttons } from './components/Buttons';
import { Dial } from './components/Dial';
import { Hand } from './components/Hand';
import { getQueryVariable } from './functions';

const LABELS = ['extreme fear', 'fear', 'neutral', 'greed', 'extreme greed'];
const LABEL_VALUES = [25, 46, 55, 75, 100];
export const TYPES = { Stocks: 'Stocks', Crypto: 'Crypto' };

function App() {
  const [type, setType] = useState(TYPES.Stocks);
  const [score, setScore] = useState(null);
  const [label, setLabel] = useState(null);

  useEffect(() => {
    const fetchStocksScore = async () => {
      const res = await fetch('https://production.dataviz.cnn.io/index/fearandgreed/graphdata');
      const json = await res.json();
      setScore(Math.round(json.fear_and_greed.score));
    };

    const fetchCryptoScore = async () => {
      const res = await fetch('https://api.alternative.me/fng/?limit=1');
      const json = await res.json();
      setScore(+json.data[0].value);
    };

    if (getQueryVariable('type') === TYPES.Crypto) {
      fetchCryptoScore().catch(console.error);
      setType(TYPES.Crypto);
    } else {
      fetchStocksScore().catch(console.error);
    }
  }, []);

  useEffect(() => {
    if (!score) {
      return;
    }

    const index = LABEL_VALUES.findIndex(v => score < v);
    setLabel(LABELS[index]);
  }, [score]);

  return (
    <>
      <div className="header">
        <Buttons />
        <h1>{type} Fear &amp; Greed Index</h1>
      </div>

      <div className="market-fng-gauge">
        <div className="market-fng-gauge__meter-container">
          <div className="market-fng-gauge__meter" data-index-label={label}>
            <Dial />
            <Hand score={score} />
            <div className="market-fng-gauge__hand-base"></div>
            <div className="market-fng-gauge__dial-number">
              <span className="market-fng-gauge__dial-number-value">{score}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
