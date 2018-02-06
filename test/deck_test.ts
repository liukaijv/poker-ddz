import test from 'ava';
import {Card} from '../src/card';
import {Deck} from '../src/deck';

test('The deck', t => {
    let deck: Deck = new Deck();
    t.is(54, deck.cards.length);
});

test('Deck shuffle', t => {
    let deck: Deck = new Deck();
    deck.shuffle();
    t.is(54, deck.cards.length);
});

test('deal cards', t => {
    let deck: Deck = new Deck();
    deck.shuffle();
    let dealCard: Card[][] = deck.dealCards();
    t.is(4, dealCard.length);
    t.is(17, dealCard[0].length);
    t.is(17, dealCard[1].length);
    t.is(17, dealCard[2].length);
});