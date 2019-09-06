export function empty(o) {
  if (o instanceof Array) {
    return o.length === 0;
  }
  if (o instanceof Object) {
    return [...Object.keys(o)].length === 0;
  }
  return false;
}
