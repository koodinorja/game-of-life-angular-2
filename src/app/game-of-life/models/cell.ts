import * as _ from 'lodash';
import Position from './position';

export default class Cell {
  public alive: boolean;
  public aliveNextGeneration: boolean;
  public neighbours: any[];
  public Position: Position;
  public cellColor: string;

  constructor(Position) {
    this.alive = false;
    this.aliveNextGeneration = false;
    this.neighbours = [];
    this.Position = Position;
  }

  checkNextGenerationStatus() {
    this.aliveNextGeneration = this.alive ? this.shouldDieOrLive() : this.shoulRebirth();
  }

  setNextGenerationStatus() {
    this.alive = this.aliveNextGeneration;
  }

  findNeighbours(cells) {
    _.filter(cells, (anotherCell: Cell) => {
      if (Math.abs(this.Position.x - anotherCell.Position.x) <= 1
        && Math.abs(this.Position.y - anotherCell.Position.y) <= 1) {
        if (!(this.Position.x == anotherCell.Position.x && this.Position.y == anotherCell.Position.y)) {
          this.neighbours.push(anotherCell);
        }
      }
    });
  }

  shoulRebirth() {
    let liveNeighbours = this.getLiveNeighbours();
    return liveNeighbours.length == 3 ? true : false;
  }

  shouldDieOrLive() {
    let liveNeighbours = this.getLiveNeighbours();
    if (liveNeighbours.length < 2 || liveNeighbours.length > 3) {
      return false;
    }

    return true;
  }

  setColor() {
    let colors = [];
    let liveNeighbours = this.getLiveNeighbours();
    this.alive ? this.cellColor = 'green'
               : this.cellColor = 'white';
  }

  getLiveNeighbours() {
    return _.filter(this.neighbours, { alive: true });
  }
}
