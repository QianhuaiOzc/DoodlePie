(function ($) {

    var colorList = [
        "000000",
        "111111",
        "222222",
        "333333",
        "444444",
        "555555",
        "666666",
        "777777",
        "888888",
        "999999",
        "AAAAAA",
        "BBBBBB"
    ];

    var penFirstTop = 10;
    var penHeight = 20;
    var penWidth = 100;
    var penSpacing = 10;
    var penUnselectedLeft = -50;
    var penSelectedLeft = -20;

    $.crayon = function (options) {
        var main = options.main;

        var divPenList = [];
        var selectedDivPen;

        var select = function (divPen) {
            if (selectedDivPen) {
                if (divPen.get() == selectedDivPen.get()) return;
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
                "background-color": "#" + color,
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