import { ClickableArea } from "./clickable-area";
import "../styles/game.css";
import { Shop, shopItems } from "./shop";
import { RandomSpawn } from "./random-spawn";

export class Game {
  // Propriétés de base
  cookies = 0;
  passiveGain = 0;

  // Élément racine et affichage du score
  gameElement  = null;
  scoreElement = null;

  // Composants du jeu
  clickableArea = null;
  shop          = null;
  randomSpawn   = null;

  constructor(config) {
    // Chargement depuis localStorage si existant
    const saved = this.load();
    const cfg   = saved || config;

    // Initialisation de l'état
    this.cookies     = cfg.cookies     ?? 0;
    this.passiveGain = cfg.passiveGain ?? 0;

    // Sélecteur DOM
    this.gameElement = document.querySelector("#game");

    // Zone cliquable
    this.clickableArea = new ClickableArea(
      this.gameElement,
      this.onClickableAreaClick
    );

    // Boutique
    this.shop = new Shop(
      this.gameElement,
      this.onItemClick
    );

    // Réinjecte les prix sauvegardés
    if (cfg.items) {
      cfg.items.forEach(savedItem => {
        const it = shopItems.find(i => i.name === savedItem.name);
        if (it) it._prix = savedItem.prix;
      });
    }

    // Système d'apparition aléatoire
    this.randomSpawn = new RandomSpawn(this.gameElement, this);
  }

  // Démarrage du jeu
  start() {
    this.render();
    // Démarre les golden cookies
    this.randomSpawn.start();
    // Sauvegarde initiale
    this.save();

    // Boucle de gain passif
    setInterval(() => {
      this.cookies += this.passiveGain;
      window.requestAnimationFrame(() => this.updateScore());
      this.save();
    }, 1000);
  }

  // Rendu des éléments
  render() {
    const section_game = document.createElement("section");
    section_game.id = "section_game";

    this.renderScore(section_game);
    this.clickableArea.render(section_game);
    this.gameElement.append(section_game);
    this.shop.render();

    this.updateScore();
  }

  // Affichage du score
  renderScore(parent) {
    const titleEl = document.createElement("div");
    titleEl.id = "title";
    titleEl.innerHTML = `<h1>Bienvenue sur Cookie Clicker !</h1>`;
    parent.append(titleEl);

    this.scoreElement = document.createElement("div");
    this.scoreElement.id = "game-score";
    parent.append(this.scoreElement);
  }

  // Mise à jour du score à l'écran
  updateScore() {
    this.scoreElement.innerHTML = `
      <span>${this.cookies} cookies — ${this.passiveGain} bonus</span>
    `;
  }

  // Clic manuel
  onClickableAreaClick = () => {
    this.cookies += 1;
    window.requestAnimationFrame(() => this.updateScore());
    this.save();
  };

  // Achat d'un item
  onItemClick = (item, button) => {
    if (this.cookies < item.prix) {
      return alert("Vous n'avez pas assez de cookies !");
    }
    this.cookies     -= item.prix;
    this.passiveGain += item.gainPassif;

    // Recalcule le prix via le setter défini dans shop.js
    item.prix = item.prix;

    // Mise à jour du bouton dans la boutique
    this.shop.updatePrice(item, button);

    window.requestAnimationFrame(() => this.updateScore());
    this.save();
  };

  // Enregistre l'état dans localStorage
  save() {
    const cfg = {
      cookies:     this.cookies,
      passiveGain: this.passiveGain,
      items: shopItems.map(i => ({ name: i.name, prix: i._prix }))
    };
    localStorage.setItem("cookieClickerSave", JSON.stringify(cfg));
  }

  // Charge la configuration depuis localStorage
  load() {
    const raw = localStorage.getItem("cookieClickerSave");
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
}
