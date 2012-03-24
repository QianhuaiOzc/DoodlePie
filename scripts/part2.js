(function () {

    var main;
    var mainCanvas;

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
            "width": 800,
            "height": 600
        });

        var crayonTextureImage = new Image();
        crayonTextureImage.src = "images/crayon-texture.png"

        var context = mainCanvas.get(0).getContext("2d");

        var currColor;
        var currSize = 5;
        var drawing = false;

        var pathes = [];
        var currPath;

        var colorSelected = function (color) {
            currColor = color;
        }

        $.crayon({
            main: main,
            colorSelected: colorSelected
        });

        mainCanvas.mousedown(function (ev) {
            drawing = true;

            currPath = {
                color: currColor,
                size: currSize,
                points: [ {
                    x: ev.offsetX,
                    y: ev.offsetY
                } ]
            };

            pathes.push(currPath);

            repaint();
        });

        mainCanvas.mouseup(function (ev) {
            drawing = false;
        });

        mainCanvas.mousemove(function (ev) {
            if (!drawing) return;

            currPath.points.push({
                x: ev.offsetX,
                y: ev.offsetY
            });

            repaint();
        });

        var repaint = function () {

            context.fillStyle = '#ffffff'; // Work around for Chrome
            context.fillRect(0, 0, mainCanvas.attr("width"), mainCanvas.attr("height")); // Fill in the canvas with white

            for (var i = 0; i < pathes.length; i++) {
                var path = pathes[i];

                context.beginPath();
                context.strokeStyle = "#" + path.color;
                context.lineWidth = path.size;
                context.lineJoin = "round";

                context.moveTo(path.points[0].x, path.points[0].y);

                for (var j = 1; j < path.points.length; j++) {
                    context.lineTo(path.points[j].x, path.points[j].y);
                }

                context.stroke();
                context.closePath();
            }

            context.globalAlpha = 0.4;
            context.drawImage(crayonTextureImage, 0, 0, crayonTextureImage.width, crayonTextureImage.height);

            context.globalAlpha = 1;
        }
    }

    function dispose() {
        main = null;
        mainCanvas = null;
    }

    modules["part2"] = {
        init: init,
        dispose: dispose
    }
})();