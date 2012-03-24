(function () {

	var main;
	var mainCanvas;
    var context;
    var paint = false;
    var startX;
    var startY;
    var style;
    var shape;

	function init() {
		main = $("#main");
		main.empty();

		// canvas
		mainCanvas = $("<canvas></canvas>").appendTo(main);
		mainCanvas.css({
			position: "absolute",
			border: "1px solid red",
			//width: 800,
			//height: 600,
			left: 200,
			top: 20
		});

        mainCanvas.attr({
            width: 800,
            height: 600
        });

        context = mainCanvas[0].getContext('2d');

        mainCanvas.mousedown(function(e) {
            startX = e.layerX;
            startY = e.layerY;
            //alert("x: " + startX + ", y:" + startY);
            paint = true;
            style = '#FF0000';
            shape = 'rectangle';
            //shape = 'round';
            //shape = 'triangle';
        });

        mainCanvas.mouseup(function(e) {
            paint = false;
        });

        mainCanvas.mousemove(function(e) {
            if(paint == true) {
                clearCanvas();
                //console.log("startX: " + startX + ", startY: " + startY + ",x: " + curX + ", y: " + curY);
                if (shape == 'rectangle') {
                    var width = e.layerX - startX;
                    var height = e.layerY - startY;
                    context.strokeRect(startX, startY, width, height);
                    context.strokeStyle = style;
                } else if (shape == 'round') {
                    var curX = e.layerX;
                    var curY = e.layerY;
                    var x = (curX - startX) / 2;
                    var y = (curY - startY) / 2;
                    context.beginPath();
                    context.arc(x, y, x, 0, Math.PI * 2, true);
                    context.closePath();
                } else {
                    var curX = e.layerX;
                    var curY = e.layerY;
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
	}

    function clearCanvas() {
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, 800, 600);
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
