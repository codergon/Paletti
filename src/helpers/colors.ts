import chroma from 'chroma-js';

const validateColor = (color: string) => {
  if (
    color[0] !== '#' ||
    typeof color !== 'string' ||
    (color.length !== 4 && color.length !== 7) ||
    !chroma.valid(color)
  ) {
    return false;
  }
  return true;
};

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
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(', ') +
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

function subtractHexColors(color1: string, color2: string) {
  color1 = color1.replace('#', '');
  color2 = color2.replace('#', '');

  // Convert the hexadecimal colors to decimal values
  const decColor1 = parseInt(color1, 16);
  const decColor2 = parseInt(color2, 16);

  // Subtract the second color from the first
  const diff = Math.abs(decColor1 - decColor2);

  // Convert the difference to hexadecimal
  const hexDiff = diff.toString(16);

  return '#' + hexDiff;
}

function hexToRgb(hex: string) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : {
        r: 0,
        g: 0,
        b: 0,
      };
}

function getColorDifferencePercentage(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const rDiff = Math.abs(rgb1.r - rgb2.r);
  const gDiff = Math.abs(rgb1.g - rgb2.g);
  const bDiff = Math.abs(rgb1.b - rgb2.b);

  const maxDiff = Math.max(rDiff, gDiff, bDiff);

  const percentage = (maxDiff / 255) * 100;

  return +percentage.toFixed(2);
}

const HexToHsl = (hex: string) => {
  const hsl = chroma(hex).hsi();
  const hslValue = hsl.map((value: number) => value.toFixed(1));
  return `hsl(${hslValue[0]}, ${hslValue[1]}%, ${hslValue[2]}%)`;
};

const HexToHcl = (hex: string) => {
  const hcl = chroma(hex).hcl();
  const hclValue = hcl.map((value: number) => value.toFixed(1));
  return `hcl(${hclValue[0]}, ${hclValue[1]}, ${hclValue[2]})`;
};

export {
  HexToHsl,
  HexToRgb,
  HexToHcl,
  rgbaToHex,
  validateColor,
  subtractHexColors,
  LightenDarkenColor,
  getColorDifferencePercentage,
};
