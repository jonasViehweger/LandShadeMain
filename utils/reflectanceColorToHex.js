// Approximate cubic spline based on four control points
const cubicSpline = (x) => {
    const xs = [0, 0.25, 0.75, 1];
    const ys = [0, 179, 240, 255];

    // Clamp x to [0,1]
    x = Math.max(0, Math.min(1, x));

    // Find which interval x is in
    let i = 0;
    while (i < xs.length - 2 && x > xs[i + 1]) i++;

    const x0 = xs[i], x1 = xs[i + 1];
    const y0 = ys[i], y1 = ys[i + 1];

    // Linear interpolation (can be replaced by actual cubic spline if needed)
    const t = (x - x0) / (x1 - x0);
    return y0 * (1 - t) + y1 * t;
};

// Convert reflectance-based color object to hex
export const reflectanceToSRGB = (color) => {
    const convert = (val) => {
        const scaled = val * 0.0001;
        return Math.round(cubicSpline(scaled));
    };

    return {
        red: convert(color.red),
        green: convert(color.green),
        blue: convert(color.blue)
    };
};

export function rgbToHex(color) {
    return `#${((1 << 24) | (color.red << 16) | (color.green << 8) | color.blue).toString(16).slice(1)}`;
}

export const reflectanceColorToHex = (color) => {
    return rgbToHex(reflectanceToSRGB(color));
}

