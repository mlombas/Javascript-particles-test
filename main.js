var force, resistance; //resistance in % of movement
var mouse;
var maxParticles, particles[];
var canvas;

function start() {
	alert("hey");
	force = 1;
	resistance = 0.3;
	mouse = new vec(0,0);
	maxParticles = 500;
	for(var i = 0; i < maxParticles; i++) particles[i] = new particle();
	canvas = document.getElementById("particleField"), gfx = canvas.getContext("2d");
	canvas.addEventListener("mousedown",alert("hey"));
}

function particle() {
	this.radius = 5;
	this.pos = new vec(Math.random() * (canvas.width - 1), Math.random() * (canvas.height - 1));
	this.f = new vec(0,0); 
	this.draw = function(g) {
		g.fillStyle = "#c47a35";
		g.fillRect(pos.x - radius, pos.y - radius, pos.x + radius, pos.y + radius);
	}
	this.update = function(mousePos) {
		var toMouse = new vec(mousePos.x - pos.x, mousePos.y - pos.y);
		toMouse.normalize();
		f.x += toMouse.x * force - f.x * resistance;
		f.y += toMouse.y * force - f.y * resistance;
		if(pos.x + f.x + radius > canvas.width || pos.x + f.x - radius < 0)
			f.x = -f.x;
		if(pos.y + f.xy+ radius > canvas.height || pos.y + f.y - radius < 0)
			f.y = -f.y;
	}
}

function vec(x,y) {
	this.x = x;
	this.y = y;
	this.length = function() { sqrt(x*x + y*y); }
	this.normalize = function() {
		this.x /= this.length();
		this.y /= this.length();
	}
}