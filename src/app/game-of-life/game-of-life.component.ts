import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import Game from './models/game';
import Cell from './models/cell';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.scss']
})
export class GameOfLifeComponent implements OnInit {
  public game: Game;
  public intervalTime: number;
  public gameRunning: boolean;
  public playing: Observable<any>;
  public sub: Subscription;

  constructor() { }

  ngOnInit() {
    this.game = new Game(40, 40);
    this.gameRunning = false;
    this.intervalTime = 350;
    this.playing = Observable.interval(this.intervalTime);
  }

  increasSpeed() {
    this.intervalTime -= 50;

    if (this.gameRunning) {
      this.sub.unsubscribe();
      this.gameRunning = !this.gameRunning;
    }
    this.playing = Observable.interval(this.intervalTime);
    this.toggleGame();
  }

  decreaseSpeed() {
    this.intervalTime += 50;

    if (this.gameRunning) {
      this.sub.unsubscribe();
      this.gameRunning = !this.gameRunning;
    }
    this.playing = Observable.interval(this.intervalTime);
    this.toggleGame();
  }

  toggleGame() {
    if (this.gameRunning) {
      this.sub.unsubscribe();
    } else {

      this.sub = this.playing.subscribe(generation => {
        this.game.nextGeneration();
      });
    }

    this.gameRunning = !this.gameRunning;
  }

  toggleCell(cell: Cell) {
    cell.alive = !cell.alive;
  }

}
