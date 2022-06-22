import { useEffect, useState } from 'react';
import { Dial } from './components/Dial';
import { Hand } from './components/Hand';

const LABELS = ['extreme fear', 'fear', 'neutral', 'greed', 'extreme greed'];
const LABEL_VALUES = [25, 46, 55, 75, 100];

function App() {
  const [stocksScore, setStocksScore] = useState(null);
  const [cryptoScore, setCryptoScore] = useState(null);

  useEffect(() => {
    const fetchStocksScore = async () => {
      const res = await fetch('https://production.dataviz.cnn.io/index/fearandgreed/graphdata');
      const json = await res.json();
      setStocksScore(Math.round(json.fear_and_greed.score));
    };

    const fetchCryptoScore = async () => {
      const res = await fetch('https://api.alternative.me/fng/?limit=1');
      const json = await res.json();
      setCryptoScore(+json.data[0].value);
    };

    fetchCryptoScore().catch(console.error);
    fetchStocksScore().catch(console.error);
  }, []);

  const getLabel = score => {
    const index = LABEL_VALUES.findIndex(v => score < v);
    return LABELS[index];
  };

  return (
    <>
      <div className="market-fng-gauge">
        <div className="market-fng-gauge__meter-container">
          <div className="market-fng-gauge__meter" data-index-label={getLabel(stocksScore)}>
            <Dial />
            <Hand score={stocksScore} />
            <div className="market-fng-gauge__hand-base"></div>
            <div className="market-fng-gauge__dial-number">
              <span className="market-fng-gauge__dial-number-value">{stocksScore}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="market-fng-gauge">
        <div className="market-fng-gauge__meter-container">
          <div className="market-fng-gauge__meter" data-index-label={getLabel(cryptoScore)}>
            <Dial />
            <Hand score={cryptoScore} />
            <div className="market-fng-gauge__hand-base"></div>
            <div className="market-fng-gauge__dial-number">
              <span className="market-fng-gauge__dial-number-value">{cryptoScore}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
