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

