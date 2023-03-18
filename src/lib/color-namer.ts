import chroma from 'chroma-js';
import colorNames from './colorNames';

const cache = new WeakMap();

const colorNamer = (module.exports = function (color: string, options?: any) {
  options = options || {};

  const cacheKey = {color, options};
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const deltaE = String(options.distance).toLowerCase() === 'deltae';
  const newColor = chroma(color);

  const result = colorNames
    .map(function (name) {
      const modName = {
        ...name,
        distance: deltaE
          ? chroma.deltaE(newColor, chroma(name.hex))
          : chroma.distance(newColor, chroma(name.hex)),
      };
      return modName;
    })
    .sort(function (a, b) {
      return a.distance - b.distance;
    });

  cache.set(cacheKey, result);
  return result[0];
});

export default colorNamer;
