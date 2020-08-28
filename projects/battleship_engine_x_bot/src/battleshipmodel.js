class Piece {
  static DESTROYER = Object.freeze(new Piece("DESTROYER", 2));
  static CRUISER = Object.freeze(new Piece("CRUISER", 3));
  static BATTLESHIP = Object.freeze(new Piece("BATTLESHIP", 4));
  static types = this.getTypes();
  constructor(name, squares) {
    this.name = name;
    this.squares = squares;
  }
  static getTypes() {
    return Object.freeze([Piece.DESTROYER, Piece.CRUISER, Piece.BATTLESHIP]);
  }
}
class Direction {
  static DOWN = Object.freeze(new Direction("DOWN", Object.freeze([1, 0])));
  static LEFT = Object.freeze(new Direction("RIGHT", Object.freeze([0, 1])));
  static types = this.getTypes();
  constructor(name, dirArr) {
    this.name = name;
    this.dirArr = dirArr;
  }
  static getTypes() {
    return Object.freeze([Direction.DOWN, Direction.LEFT]);
  }
}
class Ship {
  constructor(pieceType) {
    this.pieceType = pieceType;
    this.life = this.pieceType.squares;
  }
  getName() {
    return this.pieceType.name;
  }
}

class BattleShip {
  board = [];
  ships = [];
  started = false;
  touch = { miss: 0, hit: 0 };

  constructor() {}
  startGame() {
    if (this.started) {
      return;
    }
    for (let i = 0; i < 8; i++) {
      this.board.push([]);
      for (let j = 0; j < 8; j++) {
        this.board[i].push({ ship: null, targeted: false });
      }
    }
    this.started = true;
    const startingPiece = [Piece.DESTROYER, Piece.BATTLESHIP, Piece.CRUISER];
    for (let shipPiece of startingPiece) {
      this.putRandomPiece(shipPiece);
    }
    return this.board;
  }
  putRandomPiece(piece) {
    let i = 100;
    let top;
    let left;
    let direction;

    do {
      top = Math.round(Math.random() * 7);
      left = Math.round(Math.random() * 7);
      direction = Math.round(Math.random());
      i -= 1;
    } while (
      i > 0 &&
      !this.putPiece(piece, [top, left], Direction.types[direction])
    );
    return i >= 0;
  }
  putPiece(piece, topleftsquare, direction) {
    let positions = [];
    let sq = piece.squares;
    for (
      let i = topleftsquare[0], j = topleftsquare[1];
      i < this.board.length &&
      i < topleftsquare[0] + piece.squares &&
      j < this.board[i].length &&
      j < topleftsquare[1] + piece.squares;
      i += direction.dirArr[0], j += direction.dirArr[1]
    ) {
      if (!this.cellEmpty(i, j)) {
        return false;
      }
      sq -= 1;
      positions.push([i, j]);
    }
    if (sq == 0) {
      const ship = new Ship(piece);
      this.setPiece(ship, positions);

      return true;
    }
    return false;
  }

  cellEmpty(i, j) {
    return this.board[i][j].ship == null;
  }
  setPiece(ship, positions) {
    for (let position of positions) {
      this.board[position[0]][position[1]].ship = ship;
    }
    this.ships.push(ship);
  }
  shoot(i, j) {
    const result = {};
    result.justDestroyedShip = null;
    result.totalhit = this.touch.hit;
    result.totalMiss = this.touch.miss;
    result.hit = false;
    result.done = false;
    if (!this.board[i][j].targeted) {
      if (this.board[i][j].ship != null) {
        this.touch.hit += 1;
        this.board[i][j].ship.life -= 1;
        result.hit = true;
        result.justDestroyedShip =
          this.board[i][j].ship.life == 0 ? this.board[i][j].ship : null;
        result.totalhit = this.touch.hit;
      } else {
        this.touch.miss += 1;
        result.totalMiss = this.touch.miss;
      }
      this.board[i][j].targeted = true;
    }
    result.done = this.isDone();
    return result;
  }
  isDone() {
    for (let row of this.board) {
      for (let col of row) {
        if (col.ship != null && col.ship.life > 0) {
          return false;
        }
      }
    }
    return true;
  }
}

export default { BattleShip, Piece };
