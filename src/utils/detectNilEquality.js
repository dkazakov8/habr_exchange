export function detectNilEquality({ num, onEqual, onMore, onLess }) {
  if (num === 0) {
    return onEqual;
  }

  if (num > 0) {
    return onMore;
  }

  return onLess;
}
