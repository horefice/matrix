function Point2D(x,y) {
	this.x = x;
	this.y = y;

	this.update = function(H) {
		m = [this.x,this.y,1];

		r = [0,0,0];
		for(i=0; i<3; i++){
			for (var j=0; j<3; j++) {
				r[i] += H[i][j] * m[j];
			}
		}
		return new Point2D(r[0],r[1]);
	}

	this.rotate = function(angle) {
		var rad = angle * Math.PI / 180;
		x = Math.cos(rad)*this.x + Math.sin(rad)*this.y
		y = - Math.sin(rad)*this.x + Math.cos(rad)*this.y
		return new Point2D(x,y);
	}
}

function CanvasController(m) {
	this.m = m;
	this.t = m;

	this.apply = function() {
		this.t = [];

		for (var i=0; i<this.m.length; i++) {
			this.t.push(this.m[i].rotate(parseFloat($("input[name='rotation']").val()))
					.update([[parseFloat($("input[name='scaleX']").val()),parseFloat($("input[name='shearX']").val()),parseFloat($("input[name='transX']").val())],
							[parseFloat($("input[name='shearY']").val()),parseFloat($("input[name='scaleY']").val()),parseFloat($("input[name='transY']").val())],
							[0,0,1]]));
		}

		this.draw();
	}

	this.draw = function() {
		console.log(this.t);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.beginPath()
		ctx.moveTo(this.t[0].x,this.t[0].y)
		for(var i=1; i<this.t.length; i++) {
			ctx.lineTo(this.t[i].x,this.t[i].y);
		}
		ctx.closePath()
		
		ctx.stroke()
	}
}

$(document).ready(function() {
	canvas = $("#canvas")[0];
	ctx = canvas.getContext("2d");

	canvasController = new CanvasController([new Point2D(0,0),
		// Small square
		new Point2D(0,.1),new Point2D(.1,.1),new Point2D(.1,0),new Point2D(0,0),
		new Point2D(0,1),
		new Point2D(1,1),
		new Point2D(1,0)]);

	canvasController.apply();
	$( "input" ).change(function() {
		canvasController.apply();
	});
});
