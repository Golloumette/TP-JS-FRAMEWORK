import { ClickableArea } from "./clickable-area";
import "../styles/game.css";
import { Shop } from "./shop";
import { RandomSpawn } from "./random-spawn";


export class Game {
  // Game Properties
  cookies = 0;
  passiveGain = 0;

  // Game Elements
  gameElement = null;
  scoreElement = null;

  // Game Components
  clickableArea = null;
  shop = null;

  constructor(config) {
    // Récupère le nombre de cookies de base via la configuration.
    this.cookies = config.cookies;

    // Récupère l'élément avec l'id #game.
    this.gameElement = document.querySelector("#game");
    this.randomSpawn = new RandomSpawn(this.gameElement, this);


    // Initialise la zone cliquable.
    this.clickableArea = new ClickableArea(
      this.gameElement,
      this.onClickableAreaClick
    );

    // Initialise la boutique.
    this.shop = new Shop(
      this.gameElement,
      this.onItemClick
    );
  }

  // Démarre la boucle de jeu (gain passif).
  start() {
    this.render();
    this.randomSpawn.start();
    setInterval(() => {
      this.cookies += this.passiveGain;
      window.requestAnimationFrame(() => {
        this.updateScore();
      });
    }, 1000);
  }

  // Rend les éléments du jeu.
  render() {
    const section_game = document.createElement("section");
    section_game.id = "section_game";

    this.renderScore(section_game);
    this.clickableArea.render(section_game);
    this.gameElement.append(section_game);

    this.shop.render();
  }

  // Crée l’affichage du score.
  renderScore(parentElement) {
    // Titre
    const titleEl = document.createElement("div");
    titleEl.id = "title";
    titleEl.innerHTML = `<h1>Bienvenue sur Cookie Clicker !</h1>`;
    parentElement.append(titleEl);

    // Score
    this.scoreElement = document.createElement("div");
    this.scoreElement.id = "game-score";
    parentElement.append(this.scoreElement);

    this.updateScore();
  }

  // Met à jour le score à l’écran.
  updateScore() {
    this.scoreElement.innerHTML = `
      <span>${this.cookies} cookies — ${this.passiveGain} bonus</span>
    `;
  }

  // Clic manuel sur le cookie.
  onClickableAreaClick = () => {
    this.cookies += 1;
    window.requestAnimationFrame(() => {
      this.updateScore();
    });
  };

  // Achat d’un item dans la boutique.
 onItemClick = (item, button) => {
  console.log("Prix actuel :", item.prix, "| Cookies :", this.cookies);

  if (this.cookies >= item.prix) {
    this.cookies -= item.prix;
    this.passiveGain += item.gainPassif;

    // déclenche le setter (défini dans shop.js)
    item.prix = item.prix;

    // ——> mise à jour du texte du bouton :
    button.innerText = `${item.name} - ${item.prix} cookies`;

    window.requestAnimationFrame(() => this.updateScore());
  } else {
    alert("Vous n'avez pas assez de cookies !");
  }
};
}
