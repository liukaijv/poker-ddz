import test from 'ava';
import {Card, CardSuit} from '../src/card';

test('The card', t => {
    let card: Card = new Card(CardSuit.Club, '2');
    t.is(card.rank, 15);
    t.is(card.value, '2');
    t.is(card.toString(), '2Club');
});

test('The red and black joker', t => {
    let redJoker: Card = new Card(CardSuit.Joker, 'Red');
    t.is(redJoker.rank, 17);
    let blackJoker: Card = new Card(CardSuit.Joker, 'Black');
    t.is(blackJoker.rank, 16);
    t.is(blackJoker.toString(), 'BlackJoker');
});