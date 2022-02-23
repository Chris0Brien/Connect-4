// $ names means that jquery is being used in it
class Connect4 { // build up Grid
  constructor(selector) {
    this.ROWS = 6;
    this.COLS = 7;
    this.player = "red";
    this.selector = selector; // keep track of the selector
    this.isGameOver = false;
    this.onPlayerMove = function () {};
    this.createGrid();
    this.setupEventListeners();
  }

  createGrid() { // filling the grid; if time swap rows and col
    const $board = $(this.selector);
    $board.empty();
    this.isGameOver = false;
    this.player = "red";
    for (let row = 0; row < this.ROWS; row++) {
      const $row = $("<div>").addClass("row");
      for (let col = 0; col < this.COLS; col++) {
        const $col = $("<div>")
          .addClass("col empty") // keep track of available cells
          .attr("data-col", col) // keep track of what col u are on
          .attr("data-row", row); // keep track of what row u are on
        $row.append($col);
      }
      $board.append($row);
    }
  }

  setupEventListeners() {
    const $board = $(this.selector);
    const that = this;

    function findLastEmptyCell(col) {
      const cells = $(`.col[data-col='${col}']`);
      for (let i = cells.length - 1; i >= 0; i--) {
        const $cell = $(cells[i]);
        if ($cell.hasClass("empty")) {
          return $cell;
        }
      }
      return null;
    }

// 
    $board.on("mouseenter", ".col.empty", function () {
      if (that.isGameOver) return;
      const col = $(this).data("col");
      const $lastEmptyCell = findLastEmptyCell(col);
      $lastEmptyCell.addClass(`next-${that.player}`);
    });

    $board.on("mouseleave", ".col", function () {
      $(".col").removeClass(`next-${that.player}`);
    });

    $board.on("click", ".col.empty", function () {
      if (that.isGameOver) return;
      const col = $(this).data("col");
      const $lastEmptyCell = findLastEmptyCell(col);
      $lastEmptyCell.removeClass(`empty next-${that.player}`);
      $lastEmptyCell.addClass(that.player);
      $lastEmptyCell.data("player", that.player);

      const winner = that.checkForWinner(
        $lastEmptyCell.data("row"),
        $lastEmptyCell.data("col")
      );
      if (winner) {
        that.isGameOver = true;
        alert(`Game Over! Player ${that.player} has won!`);
        $(".col.empty").removeClass("empty");
        return;
      }

      that.player = that.player === "red" ? "black" : "red";
      that.onPlayerMove();
      $(this).trigger("mouseenter");
    });
  }

  checkForWinner(row, col) {
    const that = this;

    function $getCell(x, y) {
      return $(`.col[data-row='${x}'][data-col='${y}']`);
    }

    function checkWinDirection(direction) {
      let total = 0;
      let x = row + direction.x;
      let y = col + direction.y;
      let $next = $getCell(x, y);
      while (
        x >= 0 &&
        x < that.ROWS &&
        y >= 0 &&
        y < that.COLS &&
        $next.data("player") === that.player
      ) {
        total++;
        x += direction.x;
        y += direction.y;
        $next = $getCell(x, y);
      }
      return total;
    }

    function checkWin(directionA, directionB) {
      const total = 1 + checkWinDirection(directionA) + checkWinDirection(directionB);
      return  (total >= 4) ? that.player : null;
    }

    function checkDiagonalBLtoTR() {
      return checkWin({ x: 1, y: -1 }, { x: 1, y: 1 });
    }

    function checkDiagonalTLtoBR() {
      return checkWin({ x: 1, y: 1 }, { x: -1, y: -1 });
    }

    function checkVerticals() {
      return checkWin({ x: -1, y: 0 }, { x: 1, y: 0 });
    }

    function checkHorizontals() {
      return checkWin({ x: 0, y: -1 }, { x: 0, y: 1 });
    }

    return (
      checkVerticals() ||
      checkHorizontals() ||
      checkDiagonalBLtoTR() ||
      checkDiagonalTLtoBR()
    );
  }

  restart() {
    this.createGrid();
    this.onPlayerMove();
  }
}
