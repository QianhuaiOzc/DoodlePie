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
			width: 800,
			height: 600,
			left: 200,
			top: 20
		});
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