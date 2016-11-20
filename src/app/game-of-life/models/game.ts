import Cell from './cell';
import Position from './position';
import * as _ from 'lodash';

export default class Game {
  public rows: number;
  public columns: number;
  public generation: number;
  public cells: Cell[];

  constructor(rows = 0, columns = 0) {
    this.rows = rows;
    this.columns = columns;
    this.generation = 0;
    this.cells = this.createCells();
  }

  nextGeneration() {
    _.map(this.cells, (cell) => {
      cell.checkNextGenerationStatus();
    });

    this.generation++;

    _.map(this.cells, (cell) => {
      cell.setNextGenerationStatus();
    });
  }

  createCells() {
    let x = 0;
    let y = 0;
    let cells: Cell[] = [];
    while (y < this.columns) {
      if (x == this.rows) {
        y++;
        x = 0;
      }

      if (y == this.columns) {
        _.map(cells, (cell: Cell) => {
          cell.findNeighbours(cells);
        });
        return cells;
      }

      cells.push(
        new Cell(
          new Position(x, y)
        )
      );

      x++;
    }
  }
}
