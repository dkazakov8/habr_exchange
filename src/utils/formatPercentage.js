import { detectNilEquality } from './detectNilEquality';
import { precise } from './precise';

export function formatPercentage(value) {
  const valueFormatted = precise(value, 'percent');
  return detectNilEquality({
    num: value,
    onMore: `+${valueFormatted}%`,
    onLess: `-${valueFormatted}%`,
  });
}
