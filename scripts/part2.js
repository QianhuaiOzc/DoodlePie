(function () {

    var main;

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
        var currSize = 10;
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

        var saveImage = function () {
            var dataUrl = canvas.toDataURL("image/png");
            window.open(dataUrl);
            game.fillFinished();
        }

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
        }

        var button = $('<input type="button" value="Save" />').appendTo(main);
        button.click(function () {
            saveImage();
        })
    }

    function dispose() {
        main = null;
    }

    modules["part2"] = {
        init: init,
        dispose: dispose
    }
})();