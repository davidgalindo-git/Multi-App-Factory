function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function normalizeHex(hex: string) {
  const raw = hex.trim().replace('#', '');
  if (raw.length === 3) {
    return raw
      .split('')
      .map((c) => c + c)
      .join('');
  }
  return raw.padEnd(6, '0').slice(0, 6);
}

/**
 * Converts a hex color (e.g. #4f46e5) to a CSS HSL triplet string:
 * "240 5.9% 10%" which works with `hsl(var(--primary))`.
 */
export function hexToHslTriplet(hex: string): string {
  const norm = normalizeHex(hex);
  const r = parseInt(norm.slice(0, 2), 16) / 255;
  const g = parseInt(norm.slice(2, 4), 16) / 255;
  const b = parseInt(norm.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

  const sPct = clamp(s * 100, 0, 100);
  const lPct = clamp(l * 100, 0, 100);

  const hInt = Math.round(h);
  const sFixed = sPct.toFixed(1).replace(/\.0$/, '');
  const lFixed = lPct.toFixed(1).replace(/\.0$/, '');

  return `${hInt} ${sFixed}% ${lFixed}%`;
}

