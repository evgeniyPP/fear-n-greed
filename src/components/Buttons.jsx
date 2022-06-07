import { TYPES } from '../App';

export function Buttons() {
  return (
    <span className="buttons">
      <a href="/">Stocks</a>
      <a href={`/?type=${TYPES.Crypto}`}>Crypto</a>
    </span>
  );
}
