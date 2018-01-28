// We'll use JS to give each block a different color.
var numSquares = 6;
var colors = [];
var pickedColor;
init();

function init() {
	//mode button event listeners
	setUpModeButtons();
	setUpSquares();
	reset();
}

function setUpModeButtons() {
	$(".mode").on("click", function() {
		$(".mode").removeClass("selected");
		$(this).addClass("selected");

		if ($(this).text() === "Easy")
			numSquares = 3;
		else
			numSquares = 6;
		reset();
	});
}


function setUpSquares() {
	$(".square").each(function(index) {
		$(this).css("backgroundColor", colors[index]);

		$(this).on("click", function() {
			var clickedColor = $(this).css("backgroundColor");
			console.log($(this).css("backgroundColor"));
			if (clickedColor === pickedColor) {
				$("#message").text("Correct!");
				$("#reset").text("Play Again?");
				changeColors(clickedColor);
				$("h1").css("backgroundColor", clickedColor);
				return;
			}
			else {
				$(this).css("backgroundColor", "#232323");
				$("#message").text("Try Again");
			}
		});
	});
}

function reset() {
	// generate all new colors
	colors = generateRandomColors(numSquares);
	// pick a new random color from array
	pickedColor = pickColor();
	// change colorDisplay to match picked color
	$("#colorDisplay").text(pickedColor);
	// change colors of squares
	$(".square").each(function(index) {
		if (colors[index]) {
			$(this).css("display", "block");
			$(this).css("backgroundColor", colors[index]);
		}
		else
			$(this).css("display", "none");
	});
	// reset the header
	$("h1").css("backgroundColor", "steelblue");
	// change play again
	$("#reset").text("New Colors");
	$("#message").text("");
}

$("#reset").on("click", function() {
	reset();
});

function changeColors(color) {
	//loop through all squares
	$(".square").css("backgroundColor", color);
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	// make an array
	var arr = [];
	// add num random colors to array
	for (var i = 0; i < num; i++) {
		//get random color and push into array
		arr.push(randomColor());
	}
	// return that array
	return arr;
}

function randomColor() {
	//pick a "red" from 0 to 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 to 255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 to 255
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}