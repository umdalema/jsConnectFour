var position_dictionary = { tl: [80, 80, '-'],
							tm: [240, 80, '-'],
							tr: [400, 80, '-'],
							ml: [80, 240, '-'],
							mm: [240, 240, '-'],
							mr: [400, 240, '-'],
							ll: [80, 400, '-'],
							lm: [240, 400, '-'],
							lr: [400, 400, '-']}
const EMPTY_SQURE = '-';

function startGame(){
	init()
}

function init() {
	
	turn = 0; 
	squaresPlayedIn = 0; 
	xPlayedFirst = true; 
	
	$('#canvas').click(handleSquareSelection);
	
	drawBoard(); 
}
function check_for_soultion (piece){
	//alert("here");
	if ((position_dictionary.tl[2] == position_dictionary.tm[2]  && position_dictionary.tl[2] == position_dictionary.tr[2] && position_dictionary.tl[2] != EMPTY_SQURE) ||
		// all the same top row. 
	    (position_dictionary.ml[2] == position_dictionary.mm[2]  && position_dictionary.ml[2] == position_dictionary.mr[2] && position_dictionary.ml[2] != EMPTY_SQURE) ||
		// all same middle row. 
	    (position_dictionary.ll[2] == position_dictionary.lm[2]  && position_dictionary.ll[2] == position_dictionary.lr[2] && position_dictionary.ll[2] != EMPTY_SQURE) ||

	    (position_dictionary.tl[2] == position_dictionary.ml[2]  && position_dictionary.tl[2] == position_dictionary.ll[2] && position_dictionary.tl[2] != EMPTY_SQURE) ||

		(position_dictionary.tm[2] == position_dictionary.mm[2]  && position_dictionary.tm[2] == position_dictionary.lm[2] && position_dictionary.tm[2] != EMPTY_SQURE)  ||

		(position_dictionary.tr[2] == position_dictionary.mr[2]  && position_dictionary.tr[2] == position_dictionary.lr[2] && position_dictionary.tr[2] != EMPTY_SQURE)  ||

		(position_dictionary.tl[2] == position_dictionary.mm[2]  && position_dictionary.tl[2] == position_dictionary.lr[2] && position_dictionary.tl[2] != EMPTY_SQURE)  ||

		(position_dictionary.ll[2] == position_dictionary.mm[2]  && position_dictionary.ll[2] == position_dictionary.tr[2] && position_dictionary.ll[2] != EMPTY_SQURE)){
		return true; 
	} else {
		return false; 
	}
}
function get_correct_square(x_position, y_position){

	if (y_position < 160){
		if (x_position < 160){
			return position_dictionary.tl; 
		} else if (x_position > 160 && x_position < 320){
			return position_dictionary.tm; 
		} else {
			return position_dictionary.tr; 
		}
	} else if (y_position > 160 && y_position < 320){
		if (x_position < 160){
			return position_dictionary.ml; 
		} else if (x_position > 160 && x_position < 320){
			return position_dictionary.mm; 
		} else {
			return position_dictionary.mr; 
		}
	} else {
		if (x_position < 160){
			return position_dictionary.ll; 
		} else if (x_position > 160 && x_position < 320){
			return position_dictionary.lm; 
		} else {
			return position_dictionary.lr; 
		}
	}
}

function updateScore(piece){

	// scoreElement is a <span /> that contains the number of each score. 
	var scoreElement = $("#"+ piece + "_score"); 

	// get the current score and increment it 
	scoreElement.text( parseInt(scoreElement.text()) + 1); 
}

function handleSquareSelection(event) {
	
	// get the x and y positions on the board where the player clicked: 
	var bounds = canvas.getBoundingClientRect(); 
	var offsetX = event.clientX - bounds.left;  
	var offsetY = event.clientY - bounds.top; 

	// from the x and y positon get the correct square we should be playing in
	// pos, a position in position_dictonary, is defined by [x_coordinate, y_coordinate, piece]
	var pos = get_correct_square(offsetX, offsetY);
	
	// if the square has already been played in
	if (pos[2] != EMPTY_SQURE){
		alert("that square has been taken please schoose another one");
		return; 
	}

	// based on who's turn it is, get the correct piece char
	var piece = ((turn % 2) == 0) ? 'X' : 'O';

	// draw the piece of the person who played on the board and then update 
	// position dictionary
	drawPiece(pos, piece); 
	pos[2] = piece
	squaresPlayedIn += 1; 

	// check if a player has won the game 
	if (check_for_soultion(piece)) {
		// timeout statements are to ensure that things happen in a particular order. 
		// without them the order of animations has always looked funny to me.

		// announce which piece won the game, reset the board and update the score: 
		setTimeout(function(){alert(piece + " won!");}, 100); 
		setTimeout(resetGame, 101); 
		setTimeout(updateScore(piece), 102); 		
	} else{
		// no one has won, but if the turn is 8 then all the squares have been played on. 
		if (squaresPlayedIn == 8){
			setTimeout(function(){alert("Cat's game!");}, 100); 
			setTimeout(resetGame, 101); 
		}
	}

	// increment the turn by one
	turn += 1; 
}

function resetGame() {

	var context = canvas.getContext('2d');

	// clear the board and then redraw the empty board
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawBoard(); 

	// reset each piece in the positon_dictionary to be empty squares. 
	$.each(position_dictionary, function(i, val){
		val[2] = EMPTY_SQURE; 
	}); 

	// reset vars based on whether x went first last time or not. 
	if (xPlayedFirst) {
		xPlayedFirst = false; 
		turn = 1; 
		// still debating on including this: 
		//alert("X played first last game so O plays first now!"); 
	} else {
		xPlayedFirst = true; 
		turn = 0; 
	}

	// need to reset this back to zero 
	squaresPlayedIn = 0; 
}


function drawBoard() {

	// get the canvas context and prepare to draw: 
	var context = canvas.getContext("2d"); 
	context.beginPath(); 

	// top to bottom lines: 

	// left line
	context.moveTo(160, 0); 
	context.lineTo(160, 480); 
	// right line: 
	context.moveTo(320, 0); 
	context.lineTo(320, 480); 

	// left to right
	// top line
    context.moveTo(0, 160);
    context.lineTo(480, 160);
    // bottom line
    context.moveTo(0, 320);
    context.lineTo(480, 320);

	context.stroke(); 
}

function drawPiece(postion_arr, piece) {

	// get context of the canvas
	var context = canvas.getContext("2d");
	
	// update styling information
	context.font = '150px serif';
	context.textAlign = 'center';
	context.textBaseline = 'middle';

	// draw the new piece on the canvas. 
	context.fillText(piece, postion_arr[0], postion_arr[1]);
}


/* running log of what's changed in this commit version

		- rewrote updateScore to use Jquery (shorter) and add comments. 
		- commented drawPiece and deleted unneeded comments
		- chaged ctx to context in drawPiece
		- updated resetGame to chang vars based on whether x went first last time or not
 */
	