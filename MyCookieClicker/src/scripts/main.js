import "../styles/style.css";
import { Game } from "./game";
import { Shop } from "./shop";

document.querySelector("#app").innerHTML = `
    
    <main id="game">
    
    </main>
`;

const game = new Game({
  cookies: 0,
});


game.start();

