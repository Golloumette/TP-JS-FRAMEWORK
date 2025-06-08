// shop.js
import "../styles/shop.css";

export const shopItems = [
  { name: "Cursor",  prix: 20,   gainPassif: 0.1 },
  { name: "grandMa", prix: 100,  gainPassif: 5   },
  { name: "ferme",   prix: 250,  gainPassiv: 15  },
  { name: "mine",    prix: 500,  gainPassif: 50  },
  { name: "usine",   prix: 1000, gainPassif:100  },
  { name: "banque",  prix: 2000, gainPassif:200  }
];

// Initialisation du getter/setter sur chaque item
shopItems.forEach(item => {
  item._prix = item.prix;
  Object.defineProperty(item, "prix", {
    configurable: true,
    enumerable:   true,
    get() { return this._prix; },
    set(base) {
      const calc = 10 + base * 3;
      if (typeof calc !== "number" || calc < 0) {
        throw new Error("Calcul du prix invalide");
      }
      this._prix = calc;
    }
  });
});

function createButton(nomButton) {
  const button = document.createElement("button");
  button.innerText = nomButton;
  button.classList.add("shop-button");
  return button;
}

export class Shop {
  shopElement = null;
  gameElement = null;
  items       = shopItems;    // ← on expose la liste

  constructor(gameElement, onItemClick) {
    this.gameElement = gameElement;
    this.onItemClick = onItemClick;
  }

  render() {
    this.shopElement = document.createElement("section");
    this.shopElement.id = "game-shop";
    this.shopElement.innerHTML = `<h2>Shop</h2>`;

    this.items.forEach(item => {
      const button = createButton(item.name);
      button.innerText = `${item.name} — ${item.prix} cookies`;
      button.addEventListener("click", () => {
        this.onItemClick(item, button);
      });
      this.shopElement.appendChild(button);
    });

    this.gameElement.append(this.shopElement);
  }

  updatePrice(item, button) {
    button.innerText = `${item.name} — ${item.prix} cookies`;
  }
}
