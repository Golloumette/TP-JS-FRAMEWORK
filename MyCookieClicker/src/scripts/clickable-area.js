import CookieIMG from "../assets/cookie.png";

export class ClickableArea {
  gameElement = null;
  onClick = null;

  constructor(gameElement, onClick) {
    this.gameElement = gameElement;
    this.onClick = onClick;
  }

  // clickable-area.js
// Il faut ajouter dans les propriétés de la classe
// la propriété "clickableAreaElement"

render(parentElement) {
    // On crée un nouvel élément du DOM.
    this.clickableAreaElement = document.createElement("div");
    this.clickableAreaElement.id = "game-clickable-area";
    // On modifie son HTML.
    this.clickableAreaElement.innerHTML = `
        <img id="cookie" src=${CookieIMG} width="256px" height="256px" alt="An awesome cookie." />
    `;
    // On ajoute un listener sur l'évènement "click" à l'élément.
    this.clickableAreaElement.addEventListener("click", () => {
    	// On ajoute ici la logique d'animation pour la réaction au clique.
      window.requestAnimationFrame(() => {
        this.clickableAreaElement.classList.add("active");
        setTimeout(() => {
          window.requestAnimationFrame(() => {
            this.clickableAreaElement.classList.remove("active");
          });
        }, 100);
      });
      this.onClick();
    });
    // Il faut ajouter l'élément au DOM pour pouvoir le voir
    // On l'ajoute donc à notre élément Game.
    parentElement.append(this.clickableAreaElement);
}
}
