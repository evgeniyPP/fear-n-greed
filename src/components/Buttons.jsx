import { TYPES } from '../App';

export default function Buttons({ setType }) {
  return (
    <span className="buttons">
      <button onClick={() => setType(TYPES.Stocks)}>Stocks</button>
      <button onClick={() => setType(TYPES.Crypto)}>Crypto</button>
    </span>
  );
}
