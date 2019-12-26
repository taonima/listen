export function empty(o) {
  if (o instanceof Array) {
    return o.length === 0;
  }
  if (o instanceof Object) {
    return [...Object.keys(o)].length === 0;
  }
  return !o;
}

export function _get(obj, keys) {
  if (empty(obj)) {
    return '';
  }
  const k = keys[0];
  if (empty(k)) {
    return obj;
  }
  let v = obj[k];
  return _get(v, keys.filter(i => i !== k));
}
