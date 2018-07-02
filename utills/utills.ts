export const addTwoColorBasedOnPercent = (color1: string, color2: string, percent: number): string => {
    const red1 = parseInt(color1[1] + color1[2], 16);
    const green1 = parseInt(color1[3] + color1[4], 16);
    const blue1 = parseInt(color1[5] + color1[6], 16);

    const red2 = parseInt(color2[1] + color2[2], 16);
    const green2 = parseInt(color2[3] + color2[4], 16);
    const blue2 = parseInt(color2[5] + color2[6], 16);

    const red = Math.round(mix(red1, red2, percent));
    const green = Math.round(mix(green1, green2, percent));
    const blue = Math.round(mix(blue1, blue2, percent));

    return getHexCode(red, green, blue);
}

const getHexCode = (r: number, g: number, b: number): string => {
    let red = r.toString(16);
    let green = g.toString(16);
    let blue = b.toString(16);

    // to address problem mentioned by Alexis Wilke:
    while (red.length < 2) { red = "0" + r; }
    while (green.length < 2) { green = "0" + g; }
    while (blue.length < 2) { blue = "0" + b; }

    return "#" + red + green + blue;
}

const mix = (start: number, end: number, percent: number): number => {
    return start + ((percent) * (end - start));
}

export const invertColor = (color) => {
    //Color brightness is determined by the following formula: ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000
    const threshold = 130;
    const red = parseInt(color[1] + color[2], 16);
    const green = parseInt(color[3] + color[4], 16);
    const blue = parseInt(color[5] + color[6], 16);
    const cBrightness = ((red * 299) + (green * 587) + (blue * 114)) / 1000;
    return cBrightness > threshold ? "#000000" : "#ffffff";
}