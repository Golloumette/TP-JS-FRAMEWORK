import CookieIMG from "../assets/cookie.png";

export class ClickableArea {
  gameElement = null;
  onClick = null;

  constructor(gameElement, onClick) {
    this.gameElement = gameElement;
    this.onClick = onClick;
  }

  render() {
    // On crée un nouvel élément du DOM.
    const clickableAreaElement = document.createElement("section");

	clickableAreaElement.id = "game-clickable-area";
    // On modifie son HTML.
    clickableAreaElement.innerHTML = `
        <img id="cookie" src=${CookieIMG} width="256px" height="256px" alt="An awesome cookie." />
    `;
    // On ajoute un listener sur l'évènement "click" à l'élément.
    clickableAreaElement.addEventListener("click", this.onClick);
    // Il faut ajouter l'élément au DOM pour pouvoir le voir
    // On l'ajoute donc à notre élément Game.
    this.gameElement.append(clickableAreaElement);
  }
}
