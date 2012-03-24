(function () {

    var main;
    var mainCanvas;
    var context;
    var paint = false;
    var startX;
    var startY;
    var curColor;
    var curShape;

    // shape list
    var shapeList = [ 'rectangle', 'triangle', 'round' ]; 
    var shapeTop = 0;
    var shapeFirstLeft = 450;
    var shapeSpacing = 50;
    var shapeHeight = 100;
    var shapeWidth = 100;

    function init() {
        main = $("#main");
        main.empty();

        // canvas
        mainCanvas = $("<canvas></canvas>").appendTo(main);
        mainCanvas.css({
            position: "absolute",
            //border: "1px solid red",
            left: 132,
            top: 120
        });

        mainCanvas.attr({
            width: 800,
            height: 600
        });

        var colorSelected = function (color) {
            curColor = color;
        };

        $.crayon({
            main: main,
            colorSelected: colorSelected
        });
        context = mainCanvas[0].getContext('2d');

        mainCanvas.mousedown(function(e) {
            startX = e.offsetX;
            startY = e.offsetY;
            //alert("x: " + startX + ", y:" + startY);
            paint = true;
            clearCanvas();
        });

        mainCanvas.mouseup(function(e) {
            paint = false;
            setTimeout(nextStep, 2000);
            
        });

        mainCanvas.mousemove(function(e) {
            if(paint == true) {
            clearCanvas();
            context.strokeStyle = curColor;
            var curX = e.offsetX;
            var curY = e.offsetY;
            if (curShape == 'rectangle') {
            var width = curX - startX;
            var height = curY - startY;
            context.strokeRect(startX, startY, width, height);
            } else if (curShape == 'round') {
            drawEllipse(context, startX, startY, (curX - startX), (curY - startY));
            } else if (curShape == 'triangle') {
            context.beginPath();
            context.moveTo((curX + startX)/2, startY);
            context.lineTo(curX, curY);
            context.lineTo(startX, curY);
            context.closePath();
            }
            context.stroke();
            context.restore();
            }
        });

        mainCanvas.mouseleave(function(e) {
            paint = false;
        });

        for (var i = 0; i < shapeList.length; i++) {
            var shape = shapeList[i];

            var shapeDiv = $('<div></div>').appendTo(main);
            shapeDiv.attr('shape', shape);
            shapeDiv.css({
                "position": "absolute",
                "background-color": "#555555",
                "top": shapeTop,
                "height": shapeHeight,
                "width": shapeWidth,
                "left": shapeFirstLeft + i * (shapeWidth + shapeSpacing)
            });

            shapeDiv.click(function() {
                select($(this)); 
            });
        }
    }

    var select = function(shapeDiv) {
        curShape = shapeDiv.attr('shape');
    };

    function nextStep() {
        clearCanvas();
        var image = new Image();
        image.src = 'images/fill-background.png';
        context.drawImage(image, 0, 0);
        //context.globalAlpha = 0.1;
        game.loadModule('part2');
    }

    function drawEllipse(ctx, x, y, w, h) {
        var kappa = .5522848;
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = x + w,           // x-end
        ye = y + h,           // y-end
        xm = x + w / 2,       // x-middle
        ym = y + h / 2;       // y-middle

        ctx.beginPath();
        ctx.moveTo(x, ym);
        ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
        ctx.closePath();
        ctx.stroke();
    }

    function clearCanvas() {
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, mainCanvas.attr("width"), mainCanvas.attr("height")); // Fill in the canvas with white
    }

    function dispose() {
        main = null;
        mainCanvas = null;
    }

    modules["part1"] = {
        init: init,
        dispose: dispose
    }
})();
