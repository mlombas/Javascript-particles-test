//Variable declarations
var canvas;
var mouse, mouseIsDown;
var force, resistance; //resistance in % of movement
var maxParticles, particles; //particles is an array
var loop;
//End of variable declarations
//Classes definitions
class particle {
	constructor(x,y) {
		this.radius = 0.5;
		this.pos = new vec(x, y);
		this.f = new vec(0,0); 
	}
	draw(g) {
		g.fillStyle = "#c47a35";
		g.fillRect(this.pos.x - this.radius, this.pos.y - this.radius,2 * this.radius, 2 * this.radius);
	}
	update(mousePos) {
		if(mouseIsDown){
			var toMouse = new vec(mousePos.x - this.pos.x, mousePos.y - this.pos.y);	
			toMouse.normalize();	
			this.f.x += toMouse.x * force;
			this.f.y += toMouse.y * force;
		}
		this.f.x -= this.f.x * resistance;
		this.f.y -= this.f.y * resistance;
		if(this.pos.x + this.f.x + this.radius > canvas.width || this.pos.x + this.f.x - this.radius < 0)
			this.f.x = -this.f.x;
		if(this.pos.y + this.f.y + this.radius > canvas.height || this.pos.y + this.f.y - this.radius < 0)
			this.f.y = -this.f.y;
		this.pos.x += this.f.x;
		this.pos.y += this.f.y;
	}
}

class vec {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	length(){ return Math.sqrt(this.x * this.x + this.y * this.y); }
	normalize(){
		this.x /= this.length();
		this.y /= this.length();
	}
}
//End of classes definitions

function reset() {
	clearInterval(loop);
	console.log("reseting");
	force = document.getElementById("force").value;
	resistance = document.getElementById("resistance").value;
	maxParticles = document.getElementById("particles").value;
	particles = [maxParticles];
	for(var i = 0; i < maxParticles; i++) particles[i] = new particle(Math.random() * (canvas.width - 1), Math.random() * (canvas.height - 1));
	loop = setInterval(mainLoop, 16);
}

function start() {
	canvas = document.getElementById("particleField"), gfx = canvas.getContext("2d");
	mouse = new vec(0,0);
	mouseIsDown = false;
	canvas.onmousedown = function(e){mouseIsDown = true; mouse = getMousePos(canvas, e)};
	canvas.onmouseup = function(e){mouseIsDown = false};
	canvas.onmousemove = function(e){if(mouseIsDown) {mouse = getMousePos(canvas, e)} };
	reset();
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
}

function  getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(),
      scaleX = canvas.width / rect.width,
      scaleY = canvas.height / rect.height;

  return new vec((evt.clientX - rect.left) * scaleX, (evt.clientY - rect.top) * scaleY );
}
