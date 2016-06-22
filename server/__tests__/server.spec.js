import { expect } from 'chai';
import createGame from '../game.js';

describe('Gmae Logic', () => {
  it('draw card should draw from deck', () => {
    const game = createGame();
    const card = game.drawCard('bot');
    expect(card).to.not.be.oneOf(game.deck.bot).and.to.be.oneOf(game.curCard);
  });

  it('init draw should draw four card', () => {
    const game = createGame();
    game.initDraw();
    expect(game.curCard).to.have.length.equal(4);
  });
});

