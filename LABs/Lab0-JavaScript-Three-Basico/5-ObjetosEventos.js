var objPto = function(x,y,cor) {
		this.x 		= x;
		this.y 		= y;		
		this.cor	= cor;
		this.draw	= function(ctx) {
						ctx.fillStyle = this.cor;
						ctx.fillRect(this.x-1, this.y-1, 2, 2);
						}
		};
		
var ptos = new Array();
var canvas;
var ctx; 
	
function initCanvas() {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	}
	
function getPoint(event) {
	var rect = canvas.getBoundingClientRect();
	var pto = new objPto(event.clientX - rect.left, event.clientY - rect.top, "#FF0000");
	ptos.push(pto);
	draw();
	}
	
function draw() {
	for (i = 0 ; i < ptos.length ; i++) {
		var p = ptos[i];
		p.draw(ctx);
		}
	}
