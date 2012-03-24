(function () {

	var main;
	var mainCanvas;
    var context;
    var paint = false;
    var startX;
    var startY;
    var curColor;
    var shape;

	function init() {
		main = $("#main");
		main.empty();

		// canvas
		mainCanvas = $("<canvas></canvas>").appendTo(main);
		mainCanvas.css({
			position: "absolute",
			border: "1px solid red",
			left: 200,
			top: 20
		});

        mainCanvas.attr({
            width: 800,
            height: 600
        });

        var colorSelected = function (color) {
            curColor = color;
        }

        $.crayon({
            main: main,
            colorSelected: colorSelected
        });

        context = mainCanvas[0].getContext('2d');
        shape = 'rectangle';

        mainCanvas.mousedown(function(e) {
            startX = e.offsetX;
            startY = e.offsetY;
            //alert("x: " + startX + ", y:" + startY);
            paint = true;
            clearCanvas();
        });

        mainCanvas.mouseup(function(e) {
            paint = false;
        });

        mainCanvas.mousemove(function(e) {
            if(paint == true) {
                clearCanvas();
                context.strokeStyle = curColor;
                var curX = e.offsetX;
                var curY = e.offsetY;
                if (shape == 'rectangle') {
                    var width = curX - startX;
                    var height = curY - startY;
                    context.strokeRect(startX, startY, width, height);
                } else if (shape == 'round') {
                    drawEllipse(context, startX, startY, (curX - startX), (curY - startY));
                } else if (shape == 'triangle') {
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

        $('#triangle').click(function(e) {
            shape = 'triangle';
        });
        $('#round').click(function(e) {
            shape = 'round';
        });
        $('#rectangle').click(function(e) {
            shape = 'rectangle';
        });
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
