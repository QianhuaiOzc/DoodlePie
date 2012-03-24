(function () {

    var main;
    var save;

    function init() {
        main = $("#main");
        main.empty();

        // canvas
        var mainCanvas = $("<canvas></canvas>").appendTo(main);
        mainCanvas.css({
            position: "absolute",
            // border: "1px solid red",
            left: 132,
            top: 120
        });

        mainCanvas.attr({
            "width": 800,
            "height": 600
        });

        var crayonTextureImage = new Image();
        crayonTextureImage.src = "images/crayon-texture.png"

        var canvas = mainCanvas.get(0);
        var context = canvas.getContext("2d");

        var currColor;
        var currSize;
        var drawing = false;

        var pathes = [];
        var currPath;

        var undo = function () {
            debugger;
            if (pathes.length > 0) {
                pathes.pop();
            }

            repaint();
        }

        var reset = function () {
            pathes.length = 0;
            repaint();
        } 

        var sizeSelected = function (size) {
            currSize = size;
        };

        var colorSelected = function (color) {
            currColor = color;
        };

        $.crayon({
            main: main,
            colorSelected: colorSelected,
            sizeSelected: sizeSelected,
            undo: undo,
            reset: reset
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

        save = $("#save");
        save.live("click", function () {
            game.fillFinished();

            try {
                var dataUrl = canvas.toDataURL("image/png");
                window.open(dataUrl);
            } catch (ex) {
                console.log(ex);
            }
        });

        var repaint = function () {

            context.fillStyle = '#ffffff'; // Work around for Chrome
            context.fillRect(0, 0, canvas.width, canvas.height); // Fill in the canvas with white

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

            context.globalAlpha = 0.5;
            context.drawImage(crayonTextureImage, 0, 0, crayonTextureImage.width, crayonTextureImage.height);
            
            context.globalAlpha = 1;
        }
    }

    function dispose() {
        main = null;

        save.die();
        save;
    }

    modules["part2"] = {
        init: init,
        dispose: dispose
    }
})();
