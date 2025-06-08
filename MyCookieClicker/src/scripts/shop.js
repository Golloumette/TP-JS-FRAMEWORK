import "../styles/shop.css";

const shopItem = [
  { name: "Cursor",  prix: 20,   gainPassif: 0.1 },
  { name: "grandMa", prix: 100,  gainPassif: 5   },
  { name: "ferme",   prix: 250,  gainPassif: 15  },
  { name: "mine",    prix: 500,  gainPassif: 50  },
  { name: "usine",   prix: 1000, gainPassif: 100 },
  { name: "banque",  prix: 2000, gainPassif: 200 }
];

// ─── Initialisation du getter/setter sur chaque item ───
shopItem.forEach(item => {
  // 1) copie la valeur de base dans un champ privé
  item._prix = item.prix;

  // 2) définit la propriété 'prix' avec notre formule
  Object.defineProperty(item, "prix", {
    configurable: true,
    enumerable:   true,
    get() {
      return this._prix;
    },
    set(base) {
      const calc = 10 + base * 3;
      if (typeof calc !== "number" || calc < 0) {
        throw new Error("Calcul du prix invalide");
      }
      this._prix = calc;
    }
  });
});
// ─────────────────────────────────────────────────────────

function createButton(nomButton) {
  const button = document.createElement("button");
  button.innerText = nomButton;
  button.classList.add("shop-button");
  return button;
}

export class Shop {
  shopElement  = null;
  gameElement  = null;
  onItemClick  = null;

  constructor(gameElement, onItemClick) {
    this.gameElement = gameElement;
    this.onItemClick = onItemClick;
  }

  render() {
    this.shopElement = document.createElement("section");
    this.shopElement.id = "game-shop";
    this.shopElement.innerHTML = `<h2>Shop</h2>`;

    shopItem.forEach(item => {
      const button = createButton(item.name);
      button.innerText = `${item.name} - ${item.prix} cookies`;
          button.addEventListener("click", () => {
       this.onItemClick(item, button);
    });
      this.shopElement.appendChild(button);
    });

    this.gameElement.append(this.shopElement);
  }
}
