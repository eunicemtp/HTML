'use strict'

import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";




const button = document.querySelector('.buttonplay');
const overlay = button.querySelector('.pixel-overlay');

let pixelElements = [];

button.addEventListener('mouseenter', () => {
  overlay.innerHTML = '';
  const pixelSize = 6;
  const cols = Math.floor(button.offsetWidth / pixelSize);
  const rows = Math.floor(button.offsetHeight / pixelSize);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixel', 'up');
      pixel.style.left = `${x * pixelSize}px`;
      pixel.style.top = `${y * pixelSize}px`;
      pixel.style.animationDelay = `${Math.random() * 0.5}s`;
      overlay.appendChild(pixel);
      pixelElements.push(pixel);
    }
  }
});

button.addEventListener('mouseleave', () => {
  pixelElements.forEach(pixel => {
    pixel.classList.remove('up');
    pixel.classList.add('down');
    pixel.style.animationDelay = `${Math.random() * 0.3}s`;
  });

  // Nettoyage après animation
  setTimeout(() => {
    overlay.innerHTML = '';
    pixelElements = [];
  }, 500);
});




