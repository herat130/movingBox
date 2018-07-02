import Rectangles from "../modules/Rectangles";
import { addTwoColorBasedOnPercent } from "../utills/utills";

export const getRandomColor = () => {
    const str = "0123456789ABCDEF";
    let color = "#";
    for (var i = 0; i < 6; i++) {
        color += str[(Math.floor(Math.random() * 16))];
    }
    return color;
}

export const getRandomPosition = (attr: number) => {
    return Math.floor(Math.random() * attr);
}

export const getRandomLength = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const splitRandomAreas = (totalArea: number) => {
    const p1 = Math.floor(Math.random() * 100);
    const area1 = parseFloat(((totalArea * p1) / 100).toFixed(2));
    const area2 = parseFloat((totalArea - area1).toFixed(2));
    const width1 = (Math.sqrt(area1)).toFixed(2);
    const width2 = (Math.sqrt(area2)).toFixed(2);
    return [width1, width2];
}

export const collisiondetected = (currentMovedItemX: number, currentMovedItemY: number, draggedElement: Rectangles, rectangles: Array<Rectangles>) => {
    let colisionFlag = false;
    const movedItem = (rectangles || []).find((rect: Rectangles) => rect.isDragging == true);
    if (movedItem)
        for (let i = 0; i < rectangles.length; i++) {
            const item = rectangles[i];
            if (currentMovedItemX >= item.x && currentMovedItemX <= item.x + item.width
                && currentMovedItemY >= item.y && currentMovedItemY <= item.y + item.width
                && item.isDragging != true) {

                const area1 = (item.width * item.height);
                const area2 = (draggedElement.width * draggedElement.height);
                const totalArea = area1 + area2;
                const length = Math.sqrt(totalArea);

                rectangles[i] = new Rectangles(
                    currentMovedItemX,
                    currentMovedItemY,
                    length,
                    length,
                    false,
                    addTwoColorBasedOnPercent(item.color, draggedElement.color, (area1 / area2)/10),
                    true
                );
                colisionFlag = true;
            }
        }
    return colisionFlag;
}

export const setDragging = (x: number, y: number, rectangles: Array<Rectangles>) => {
    let dragging = false;
    for (const item of rectangles) {
        if (x >= item.x && x <= item.x + item.width && y >= item.y && y <= item.y + item.height) {
            item.isDragging = true;
            dragging = true;
            break;
        }
    }
    return dragging;
}

export const clearDragging = (rectangles, dragX, dragY): void => {
    for (const item of rectangles) {
        if (item.isDragging) {
            item.isDragging = false;
            item.x += dragX;
            item.y += dragY;
        }
    }
}