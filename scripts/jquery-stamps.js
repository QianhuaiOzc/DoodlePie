(function ($) {
    var stampsList = [ "ball", "flower", "heart", "music", "star" ];

    var stampTop = -10;
    var stampFirstLeft = 200;
    var stampSpacing = 30;
    var stampHeight = 109;
    var stampWidth = 106;

    $.stamp = function(options) {
        var main = options.main;

        var stampDivList = [];

        var select = function(stampDiv) {
            var stamp = stampDiv.attr('shape');
            //options.stampSelected(stamp); 
        }
        
        for (var i = 0; i < stampsList.length; i++) {
            var stamp = stampsList[i];

            var stampDiv = $('<div></div>').appendTo(main);
            stampDiv.attr('stamp', stamp);
            stampDiv.css({
                "position": "absolute",
                "background": "url('images/stamps/"+stamp+".png') no-repeat",
                "top": stampTop,
                "height": stampHeight,
                "width": stampWidth,
                "left": stampFirstLeft + i * (stampWidth + stampSpacing)
            });

            stampDiv.click(function() {
                select($(this));
            });

            stampDivList.push(stampDiv);
        }

    }
     
 
})(jQuery);
