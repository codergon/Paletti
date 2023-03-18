const HexToRgb = (hex: string, alpha?: number) => {
  var c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');

    const rgba =
      'rgb(' +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
      `${alpha ? ',' + alpha : ''})`;

    return rgba;
  }
  throw new Error('Bad Hex');
};

export type RgbHex = (
  red: number,
  green: number,
  blue: number,
  alpha: number,
) => string | null | void | any;

const rgbaToHex: RgbHex = (red, green, blue, alpha) => {
  const rgba = `rgba(${red}, ${green}, ${blue}, ${Math.round(alpha / 255)})`;

  // Check if input string is valid RGBA
  if (
    !/^rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3}), ?(1|0(\.\d+))\)$/.test(rgba)
  ) {
    return null;
  }

  // Parse the RGBA values
  const match = rgba.match(
    /^rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3}), ?(1|0(\.\d+))\)$/,
  );

  if (match === null) {
    return null;
  }

  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);
  const a = parseFloat(match[4]);

  // Convert to hex
  const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

  // Add alpha channel if needed
  if (a !== 1) {
    const alphaHex = Math.round(a * 255).toString(16);
    return `#${hex}${alphaHex}`;
  }

  return `#${hex}`;
};

function LightenDarkenColor(col: string, amt: number) {
  var usePound = false;

  if (col[0] == '#') {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}

export {HexToRgb, rgbaToHex, LightenDarkenColor};
