//Variable declarations
var canvas;
var force, resistance; //resistance in % of movement
var mouse, mouseIsDown;
var maxParticles = 1, particles = [maxParticles]; //particles is an array
//End of variable declarations
//Object constructors
function particle() {
	this.radius = 5;
	this.pos = new vec(Math.random() * (canvas.width - 1), Math.random() * (canvas.height - 1));
	this.f = new vec(0,0); 
	this.draw = function(g) {
		g.fillStyle = "#c47a35";
		g.fillRect(this.pos.x - this.radius, this.pos.y - this.radius,2 * this.radius, 2 * this.radius);
	}
	this.update = function(mousePos) {
		if(!mouseIsDown) return;
		var toMouse = new vec(mousePos.x - this.pos.x, mousePos.y - this.pos.y);
		console.log(mousePos.x + " " + mousePos.y + "  " + toMouse.x + " " + toMouse.y);		
		toMouse.normalize();
		this.f.x += toMouse.x * force - this.f.x * resistance;
		this.f.y += toMouse.y * force - this.f.y * resistance;
		if(this.pos.x + this.f.x + this.radius > canvas.width || this.pos.x + this.f.x - this.radius < 0)
			this.f.x = -this.f.x;
		if(this.pos.y + this.f.y + this.radius > canvas.height || this.pos.y + this.f.y - this.radius < 0)
			this.f.y = -this.f.y;
	}
}

function vec(x,y) {
	this.x = x;
	this.y = y;
	this.length = function() { Math.sqrt(x*x + y*y); }
	this.normalize = function() {
		this.x /= this.length();
		this.y /= this.length();
	}
}
//End of object constructors

function start() {
	canvas = document.getElementById("particleField"), gfx = canvas.getContext("2d");
	force = 1;
	resistance = 0.3;
	mouse = new vec(0,0);
	mouseIsDown = false;
	canvas.onmousedown = function(e){mouseIsDown = true; mouse = getMousePos(canvas, e)};
	canvas.onmouseup = function(e){mouseIsDown = false};
	canvas.onmousemove = function(e){if(mouseIsDown) {mouse = getMousePos(canvas, e)} };
	for(var i = 0; i < maxParticles; i++) particles[i] = new particle();
	var loop = setInterval(mainLoop, 16);
}

function mainLoop() {
	update();
	draw();
}

function update() {
	for(var i = 0; i < maxParticles; i++) particles[i].update(mouse);
}

function draw() {
	gfx.clearRect(0,0,canvas.width,canvas.height);
	for(var i = 0; i < maxParticles; i++) particles[i].draw(gfx);
	gfx.fillStyle = "#FFFFFF";
	gfx.fillRect(mouse.x,mouse.y,1,1);
}

function  getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(),
      scaleX = canvas.width / rect.width,
      scaleY = canvas.height / rect.height;

  return new vec((evt.clientX - rect.left) * scaleX, (evt.clientY - rect.top) * scaleY );
}
