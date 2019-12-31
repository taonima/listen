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

export function secondDeal(time) { // 接收毫秒
  time = time / 1000; // 这首歌几秒
  const m = parseInt(time / 60);
  const s = parseInt(time % 60);
  if (m) {
    if (m >= 60) {
      return secondDeal(m * 1000) + ':' + `${s > 10 ? s : `0${s}`}`;
    }
    return `${m > 10 ? m : `0${m}`}:${s > 10 ? s : `0${s}`}`;
  }
  return `00:${s > 10 ? s : `0${s}`}`;
}
