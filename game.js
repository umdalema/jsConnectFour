var position_dictionary = { tl: [80, 80],
							tm: [240, 80],
							tr: [400, 80],
							ml: [80, 240],
							mm: [240, 240],
							mr: [400, 240],
							ll: [80, 400],
							lm: [240, 400],
							lr: [400, 400]}
var pieces_arr = []; 

function startGame(){
	init()
}
var turn = 0; 

function init() {
	canvas = document.createElement("canvas");
	canvas.width = 480; 
	canvas.height = 480; 
	document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	canvas.addEventListener("click", onClick, false);
	drawBoard(); 
	pieces_arr.clear();
	pieces_arr.length = 8; 
	for item in pieces_arr {
			alert("hi");
	}
    //draw_piece(position_dictionary.tr, 'X'); 
}

function onClick(e){
	var bounds = canvas.getBoundingClientRect(); 
	var pos; 

	var offsetX = e.clientX - bounds.left;  
	var offsetY = e.clientY - bounds.top; 
	//alert("x = " +offsetX);
	//alert("y = " +offsetY);
	
	if (offsetX < 160){
		if (offsetY < 160){
			pos = position_dictionary.tl;
		} else if (offsetY > 160 && offsetY < 320){
			pos = position_dictionary.ml;
		} else if (offsetY > 320){
			pos = position_dictionary.ll; 
		} 
	} else if (offsetX > 160 && offsetX < 320){
		if (offsetY < 160){
			pos = position_dictionary.tm;
		} else if (offsetY > 160 && offsetY < 320){
			pos = position_dictionary.mm;
		} else if (offsetY > 320){
			pos = position_dictionary.lm; 
		} 
	} else if (offsetX > 320){
		if (offsetY < 160){
			pos = position_dictionary.tr;
		} else if (offsetY > 160 && offsetY < 320){
			pos = position_dictionary.mr;
			//alert("mr");
		} else if (offsetY > 320){
			pos = position_dictionary.lr; 
		} else {
			alert("whoops")
		}
	} else {
		alert("you didn't choose an actual squre");
	} 

	if ((turn % 2) == 0){
		draw_piece(pos, 'X');

	} else{
		draw_piece(pos, 'O');
	}
	turn += 1; 
}
/*
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}


*/

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