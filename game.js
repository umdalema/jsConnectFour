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
	//canvas = document.createElement("canvas");
	canvas = document.getElementById("canvas"); 
	//ctx = canvas.getContext("2d");
	canvas.width = 480; 
	canvas.height = 480; 
	//document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	canvas.addEventListener("click", onClick, false);
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

function update_score(piece){
	var id = piece + "_score";
	var elt = document.getElementById(id);
	elt.innerHTML = (parseInt(elt.innerHTML) + 1);
}

function onClick(e){
	var bounds = canvas.getBoundingClientRect(); 
	var offsetX = e.clientX - bounds.left;  
	var offsetY = e.clientY - bounds.top; 
	var pos = get_correct_square(offsetX, offsetY);
	
	if (pos[2] != EMPTY_SQURE){
		alert("that square has been taken please schoose another one");
		return; 
	}

	// condition ? expr1 : expr2 

	var piece = ((turn % 2) == 0) ? 'X' : 'O';

	draw_piece(pos, piece); 
	pos[2] = piece

	if (check_for_soultion(piece)){
		// call reset function. 
		// wait for the piece to board to finish drawing. 
		setTimeout(function(){alert(piece + " won!");}, 100); 
		setTimeout(resetGame, 101); 
		setTimeout(update_score(piece), 102); 
	} else{
		//alert(turn); 
		if (turn == 8){
			// no one won the game: 
			setTimeout(function(){alert("Cat's game!");}, 100); 
			setTimeout(resetGame, 101); 
		}
	}
	turn += 1; 
}

function resetGame() {

	var ctx = canvas.getContext('2d');
	//context.clearRect(0, 0, canvas.width, canvas.height);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBoard(); 

	$.each(position_dictionary, function(i, val){
		//alert(val[2]);
		val[2] = EMPTY_SQURE; 
	}); 

	turn = 0; 
	
}


function drawBoard(){

	//var elts = document.getElementsByTagName("canvas");
	//var canvas = elts[0]; 

	 
    var ctx = canvas.getContext("2d");
    //ctx.fillStyle = "#FFFFFF"
    // top to bottom
    ctx.beginPath();
    ctx.moveTo(160, 0);
    ctx.lineTo(160, 480);
    ctx.moveTo(320, 0);
    ctx.lineTo(320, 480);

    // left to right
    ctx.moveTo(0, 160);
    ctx.lineTo(480, 160);
    ctx.moveTo(0, 320);
    ctx.lineTo(480, 320);

    ctx.closePath(); 
    ctx.stroke(); 
}

function draw_piece(postion_arr, piece){
	//var elts = document.getElementsByTagName("canvas");
	//var canvas = elts[0]; 

	var ctx = canvas.getContext("2d");
	//alert(postion_arr[0]);
	//alert(postion_arr[1]);

	ctx.font = '150px serif';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(piece, postion_arr[0], postion_arr[1]);
}