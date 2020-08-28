import Game from "./battleshipmodel.js";

const color = ["red", "yellow", "green"];
const colorMap = Game.Piece.types.reduce((a, b, index) => {
  a[b.name] = { color: color[index], squares: b.squares };
  return a;
}, {});
const vue = new Vue({
  el: "#app",
  data: {
    game: null,
    board: null,
    colorMap: colorMap,
    hit: 0,
    miss: 0,
    done: false
  },
  methods: {
    startGame() {
      console.log("Starting the game");
      this.game = new Game.BattleShip();
      this.game.startGame();
      this.board = this.getBoard();
      console.log(this.game.board);
    },
    getBoard() {
      return this.game.board.map((row) => {
        return row.map((col) => {
          console.log(col);
          return col.targeted
            ? col.ship == null
              ? "blue"
              : colorMap[col.ship.getName()].color
            : "";
        });
      });
    },
    shoot(row, col) {
      const result = this.game.shoot(row, col);
      this.board = this.getBoard();
      this.hit = this.game.touch.hit;
      this.miss = this.game.touch.miss;
      this.done = result.done;
    },
    replay() {
      this.done = false;
      this.hit = 0;
      this.miss = 0;
      this.startGame();
    }
  },
  mounted() {
    console.log("Initializing the vue of the game");
    const color = ["yellow", "red", "green"];
  }
});
