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

test('deal a card', t => {
    let deck: Deck = new Deck();
    deck.shuffle();
    let lastCard: Card = deck.cards.slice(deck.cards.length - 1)[0];
    let dealCard: Card = deck.deal();
    t.is(53, deck.cards.length);
    t.is(lastCard, dealCard);
});

test('deal cards', t => {
    t.pass();
});