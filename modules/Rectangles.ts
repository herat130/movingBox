import { DEFAULT_GRAVITY, DEFAULT_GRAVITY_SPEED, DEFAULT_ACCELERATE_DOWNWARDS, DEFAULT_ACCELERATE_UPWARDS } from "../constants/constants";
import { invertColor } from "../utills/utills";

export default class Rectangles {
    x: number;
    y: number;
    width: number;
    height: number;
    isDragging: boolean;
    color: string;
    isDrawable: boolean;
    isSplit: boolean;
    speedX: number;
    speedY: number;
    gravity: number;
    gravitySpeed: number;
    bounce: boolean;

    constructor(x: number, y: number, width: number, height: number,
        dragging: boolean, color: string, drawable: boolean, split?: boolean) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isDragging = dragging;
        this.color = color;
        this.isDrawable = drawable;
        this.isSplit = split;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = DEFAULT_GRAVITY;
        this.gravitySpeed = DEFAULT_GRAVITY_SPEED;
        this.bounce = false;
    }

    updatePosition(x, y) {
        this.x = x;
        this.y = y;
    }

    newPos(c: HTMLCanvasElement) {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom(c);
    }

    hitBottom(c: HTMLCanvasElement) {
        var rockbottom = c.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
        if (!this.bounce && this.y == c.height - this.height) {
            this.accelerate(DEFAULT_ACCELERATE_UPWARDS);
        }
        if (this.bounce && this.y < c.height - 100) {
            this.accelerate(DEFAULT_ACCELERATE_DOWNWARDS);
        }
    }

    accelerate(n) {
        this.gravity = n;
        this.bounce = true;
    }

    drawReactangle(c: CanvasRenderingContext2D, dragX?: number, dragY?: number) {
        c.beginPath();
        /** Draw Rect */
        if (this.isDragging) {
            c.rect(this.x + dragX, this.y + dragY, this.width, this.height);
        } else {
            c.rect(this.x, this.y, this.width, this.height);
        }
        c.fillStyle = this.color;
        c.fill();
        /** Draw Border  */
        c.lineWidth = 2;
        c.strokeStyle = "#fff";
        c.stroke();
        /** Draw Text  */
        c.fillStyle = invertColor(this.color);  // invert text color based on bg object
        c.textAlign = "left";
        c.font = (this.width / this.height * 10) + "px Arial";
        if (this.isDragging) {
            c.fillText((this.width * this.height).toFixed(2) + "px2", this.x + 10 + dragX, this.y + 10 + dragY);
        } else {
            c.fillText((this.width * this.height).toFixed(2) + "px2", this.x + 10, this.y + 10);
        }
    }
}
