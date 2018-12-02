// Generic action - where argument name is forwarded as is in dictonary
export default function action(type, ...keys) {
  return (...values) => {
    const axn = { type };
    // Only set the defined keys in order (others are 'undefined' automatically)
    values.map((v, i) => {
      // eslint-disable-line  array-callback-return
      axn[keys[i]] = v;
    });
    return axn;
  };
}
