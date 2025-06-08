// random-spawn.js
import goldenCookieImg from '../assets/golden-cookie.png';

export class RandomSpawn {
  constructor(gameElement, game) {
    this.gameElement = gameElement;
    this.game = game;
    this.spawnTimeout = null;
  }

  start() {
    this.scheduleNextSpawn();
  }

  scheduleNextSpawn() {
    // Prochaine apparition dans 5 à 15 secondes
    const delay = Math.random() * 10000 + 5000;
    this.spawnTimeout = setTimeout(() => {
      this.spawnGoldenCookie();
      this.scheduleNextSpawn();
    }, delay);
  }

  spawnGoldenCookie() {
    const golden = document.createElement("img");
    golden.src = goldenCookieImg;
    golden.classList.add("golden-cookie");
    // Position aléatoire
    const size = 40; // correspond à la largeur/hauteur en CSS
    const x = Math.random() * (window.innerWidth - size);
    const y = Math.random() * (window.innerHeight - size);
    golden.style.left = `${x}px`;
    golden.style.top  = `${y}px`;

    this.gameElement.appendChild(golden);

    // Disparition automatique au bout de 5s
    setTimeout(() => {
      golden.remove();
    }, 5000);

    // Gain au clic
    golden.addEventListener("click", () => {
      const min   = 1;
      const max   = Math.max(min, Math.floor(this.game.passiveGain * 1000));
      const gain  = Math.floor(Math.random() * (max - min + 1)) + min;
      this.game.cookies   += gain;
      this.game.updateScore();
      golden.remove();
    });
  }

  stop() {
    clearTimeout(this.spawnTimeout);
  }
}
