import * as $ from 'jquery';
import { getRectangles, draw, handleDoubleClick, handleMouseOut, handleMouseUp, handleMouseMove, handleMouseDown, shuffle, applyGravity } from "./canvasMain";

(function () {
    let interval: any;
    // $('body').append('<canvas id="canvas" class="canvas-bg"></canvas>');
    $('body').append('<button class="button" id="generate">Populate</button>');
    $('body').append('<button class="button" id="shuffle">Shake</button>');
    $('body').append('<button class="button" id="gravity">Gravity</button>');

    $("#generate").on('click', () => {
        getRectangles(20);
        draw();
    });

    $("#shuffle").on('click', () => {
        shuffle();
    });

    $("#gravity").on('click', () => {
        interval = setInterval(applyGravity, 30);
        // clearInterval(interval);
    });

    $("#canvas").mousedown(function (e) {
        handleMouseDown(e as any);
    });
    $("#canvas").mousemove(function (e) {
        handleMouseMove(e as any);
    });
    $("#canvas").mouseup(function (e) {
        handleMouseUp(e as any);
    });
    $("#canvas").mouseout(function (e) {
        handleMouseOut(e as any);
    });
    $("#canvas").dblclick(function (e) {
        handleDoubleClick(e as any);
    });
}());