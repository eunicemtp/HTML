'use strict'

import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";




const button = document.querySelector('.buttonplay');

let pixelElements = [];

button.addEventListener('mouseenter', () => {
  // Vider les anciens pixels avant d'en générer de nouveaux
  pixelElements.forEach(pixel => pixel.remove());
  pixelElements = [];

  const pixelSize = 6;
  const cols = Math.floor(button.offsetWidth / pixelSize);
  const rows = Math.floor(button.offsetHeight / pixelSize);

  // Créer les pixels et les ajouter au bouton
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel', 'up');
      pixel.style.left = `${x * pixelSize}px`;
      pixel.style.top = `${y * pixelSize}px`;
      pixel.style.animationDelay = `${Math.random() * 2}s`;
      button.appendChild(pixel);
      pixelElements.push(pixel);
    }
  }
});

button.addEventListener('mouseleave', () => {
  // Appliquer l'animation "down" sur les pixels à la sortie
  pixelElements.forEach(pixel => {
    pixel.classList.remove('up');
    pixel.classList.add('down');
    pixel.style.animationDelay = `${Math.random() * 2}s`;
  });

  // Nettoyage après l'animation
  setTimeout(() => {
    pixelElements.forEach(pixel => pixel.remove());
    pixelElements = [];
  }, 400);
});

gsap.to(".carre3", {x:"-100%", duration: 1, ease: "power3.out"});
gsap.to(".carre2", {x:"-100%", duration: 1, delay:0.3, ease: "power3.out"});
gsap.to(".carre1", {x:"-100%",duration: 1, delay:0.5, ease: "power3.out"});


// Mouse particles
var canvas = $('canvas').get(0);
var ctx = canvas.getContext('2d');
var particles = [];
var mousePos = {
	x: window.innerWidth / 2,
	y: window.innerHeight / 2
};
 
console.log(mousePos);
 
var multiply = 50;
 
function draw() {
	ctx.clearRect(0,0,canvas.width, canvas.height);
	if (particles.length < multiply) {
		for(let i = 0; i < multiply; i++) {
			let p = new Particle();
			particles.push(p);
		}
	}
 
	for(let i = particles.length - 1; i >= 0; i--) {
		particles[i].update();
		particles[i].draw();
	}
	requestAnimationFrame(draw);
}
 
 
class Particle {
	constructor(){
		this.reset();
	}
	reset() {
		this.radius = 10;
		this.x = mousePos.x;
		this.y = mousePos.y;
		this.explosionRadius = 2;
		this.angle = random(0 ,Math.PI * 2);
		this.color = 250;
		this.velocity = {
			x: Math.sin(this.angle) * this.explosionRadius,
			y: Math.cos(this.angle) * this.explosionRadius,
		};
		this.alpha = Math.random();
	}
	/*draw() {
		ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 1, 2 * Math.PI, false);
    ctx.fillStyle = `rgba(66, 245, 203, ${this.alpha})`;
    ctx.fill();
	}*/
	draw() {
    ctx.fillStyle = `rgba(173, 218, 189, ${this.alpha})`;
    // Dessine un carré avec un côté de taille égale à 2 * this.radius
    ctx.fillRect(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius);
}
	update() {
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		this.alpha -= 0.01;
		this.color = Math.abs(this.color - 5);
		if (this.alpha < 0) {
			this.reset();
		}
	}
}

 
function follow(e) {
	mousePos.x = e.clientX;
	mousePos.y = e.clientY;
}
 
 
function random(min,max) {
	return Math.random()*(max-min+1)+min;
}
function resize() {
	canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
$(function(){
	$(window).on('resize', resize);
	$(canvas).on('mousemove', follow);
	resize();
	draw();
});
