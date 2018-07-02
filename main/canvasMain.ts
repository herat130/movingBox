import Rectangles from '../modules/Rectangles';
import * as $ from 'jquery';
import { applyPolyfills } from '../utills/polyfill';
import { getRandomPosition, getRandomColor, collisiondetected, clearDragging, setDragging, getRandomLength } from './canvasOperations';
import { RECT_MIN_LENGTH, RECT_MAX_LENGTH } from '../constants/constants';

applyPolyfills();

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c: CanvasRenderingContext2D = canvas.getContext('2d');
const canvasOffset = $("#canvas").offset();
const offsetX = canvasOffset.left;
const offsetY = canvasOffset.top;

let rectangles: Array<Rectangles> = [];
let isMouseDown = false;
let startX: number;
let startY: number;
let dragX: number;
let dragY: number;

//setInterval(shuffle,5000);

export const shuffle = () => {
    for (let rect of rectangles) {
        rect.updatePosition(getRandomPosition(canvas.width), getRandomPosition(canvas.height));
    }
    draw();
}

export const draw = () => {

    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let item of rectangles) {
        if (!item.isDrawable) {
            continue;
        }
        item.drawReactangle(c, dragX, dragY);
    }
}

export const getRectangles = (itemCount: number, width?: number, height?: number) => {
    for (var i = 0; i < itemCount; i++) {
        const length = width ? width : getRandomLength(RECT_MIN_LENGTH, RECT_MAX_LENGTH);
        rectangles.push(
            new Rectangles(
                getRandomPosition(canvas.width - length),
                getRandomPosition(canvas.height - length),
                length,
                length,
                false,
                getRandomColor(),
                true,
                false
            ));
    }
}

/** Mouse Events on Canvas */
export const handleMouseDown = (e: MouseEvent) => {
    const mouseX = parseInt((e.clientX - offsetX).toString());
    const mouseY = parseInt((e.clientY - offsetY).toString());
    startX = mouseX;
    startY = mouseY;
    isMouseDown = true;
}

export const handleMouseUp = (e: MouseEvent) => {
    const mouseX = parseInt((e.clientX - offsetX).toString());
    const mouseY = parseInt((e.clientY - offsetY).toString());
    isMouseDown = false;
    if (collisiondetected(mouseX, mouseY, getMovedBox(), rectangles)) {
        deleteMovedBox();
        draw();
    } else {
        clearDragging(rectangles, dragX, dragY);
    }

}

export const handleMouseOut = (e: MouseEvent) => {
    const mouseX = parseInt((e.clientX - offsetX).toString());
    const mouseY = parseInt((e.clientY - offsetY).toString());
    isMouseDown = false;
    clearDragging(rectangles, dragX, dragY);
}

export const handleMouseMove = (e: MouseEvent) => {
    const mouseX = parseInt((e.clientX - offsetX).toString());
    const mouseY = parseInt((e.clientY - offsetY).toString());
    if (isMouseDown) {
        if (setDragging(startX, startY, rectangles)) {
            dragX = mouseX - startX;
            dragY = mouseY - startY;
            draw();
        };
    };
}

export const handleDoubleClick = (e: MouseEvent) => {
    let foundElemet = false;
    const mouseX = parseInt((e.clientX - offsetX).toString());
    const mouseY = parseInt((e.clientY - offsetY).toString());
    for (const item of rectangles) {
        if ((mouseX >= item.x && mouseX <= item.x + item.width) &&
            (mouseY >= item.y && mouseY <= item.y + item.height)) {
            item.isSplit = true;
            const getRandomWidth = splitRandomAreas(item.width * item.height) || [];
            for (const width of getRandomWidth) {
                getRectangles(1, parseFloat(width), parseFloat(width));
            }
            foundElemet = true;
            break;
        }
    }
    if (foundElemet) {
        removedSplitedItem();
        draw();
    }
}

/** Split the Square in two half */
const splitRandomAreas = (totalArea: number) => {
    const p1 = Math.floor(Math.random() * 100);
    const area1 = parseFloat(((totalArea * p1) / 100).toFixed(2));
    const area2 = parseFloat((totalArea - area1).toFixed(2));
    const width1 = (Math.sqrt(area1)).toFixed(2);
    const width2 = (Math.sqrt(area2)).toFixed(2);
    return [width1, width2];
}

/** utility methods */
const getMovedBox = (): Rectangles => {
    return (rectangles || []).find((rect: Rectangles) => rect.isDragging == true);
}
const deleteMovedBox = (): void => {
    rectangles = rectangles.filter(rect => rect.isDragging != true) || [];
}
const removedSplitedItem = (): void => {
    rectangles = rectangles.filter(rect => rect.isSplit != true) || [];
}

/** Apply Gravity */
export const applyGravity = () => {
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (const item of rectangles) {
        if (!item.isDrawable) {
            continue;
        }
        item.newPos(canvas);
        item.drawReactangle(c);
    }
}