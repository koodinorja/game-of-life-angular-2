import { GameOfLifeAngular2Page } from './app.po';

describe('game-of-life-angular2 App', function() {
  let page: GameOfLifeAngular2Page;

  beforeEach(() => {
    page = new GameOfLifeAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
