(function ($) {

    var colorList = [
        "f1009c",
        "fc0400",
        "ff852e",
        "fec900",
        "d1f800",
        "47d329",
        "29d4a3",
        "29b0d2",
        "2859cf",
        "986ad7",
        "c7bbbb",
        "000000",
        "ffffff"
    ];

    var penFirstTop = 8;
    var penHeight = 49;
    var penWidth = 238;
    var penSpacing = 8;
    var penUnselectedLeft = -138;
    var penSelectedLeft = -100;

    $.crayon = function (options) {
        var main = options.main;

        var divPenList = [];
        var selectedDivPen;

        var select = function (divPen) {
            if (selectedDivPen) {
                selectedDivPen.css("left", penUnselectedLeft);
            }

            selectedDivPen = divPen;

            divPen.css("left", penSelectedLeft);

            var color = divPen.attr("color");
            options.colorSelected(color);
        }

        for (var i = 0; i < colorList.length; i++) {
            var color = colorList[i];

            var divPen = $("<div></div>").appendTo(main);
            divPen.attr("color", color);
            divPen.css({
                "position": "absolute",
                // "background-color": "#" + color,
                "background-image": "url(images/crayon-pens/" + i + "_" + color + ".png)",
                "top": penFirstTop + i * ( penHeight + penSpacing),
                "height": penHeight,
                "width": penWidth,
                "left": penUnselectedLeft
            });

            divPen.click(function () {
                select($(this));
            });

            divPenList.push(divPen);
        }

        select(divPenList[0]);
    }

})(jQuery);