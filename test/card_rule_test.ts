import test from 'ava';
import {CardRule, RuleResult, RuleType} from '../src/card_rules';
import {Card, CardSuit, CardValue} from '../src/card';
import {Deck} from '../src/deck';


let deck: Deck = new Deck();
deck.shuffle();

test('Card rule', t => {

    let cards: Card[] = [];

    for (let i = 0; i < 4; i++) {
        cards.push(deck.deal());
    }

    let cardRule: CardRule = new CardRule(cards);
    t.is(4, cardRule.cards.length);

});

test('possible Straight', t => {
    let cardRule: CardRule = new CardRule([deck.deal()]);

    t.true(cardRule.possibleStraight([1, 2, 3, 4, 5, 6]));
    t.true(cardRule.possibleStraight([4, 5, 6]));
    t.true(cardRule.possibleStraight([6, 7, 8, 9]));
    t.false(cardRule.possibleStraight([1]));
});

test('is One', t => {
    let card: Card = new Card(CardSuit.Club, '4');

    let cardRule: CardRule = new CardRule([card]);
    let result: RuleResult = cardRule.make();

    t.is(RuleType.ONE, result.type);
});

test('is PAIRS', t => {
    let card1: Card = new Card(CardSuit.Club, '4');
    let card2: Card = new Card(CardSuit.Diamond, '4');

    let cardRule: CardRule = new CardRule([card1, card2]);
    let result: RuleResult = cardRule.make();

    t.is(RuleType.PAIRS, result.type);
});

test('is THREE', t => {
    let card1: Card = new Card(CardSuit.Club, '4');
    let card2: Card = new Card(CardSuit.Diamond, '4');
    let card3: Card = new Card(CardSuit.Spade, '4');

    let cardRule: CardRule = new CardRule([card1, card2, card3]);
    let result: RuleResult = cardRule.make();

    t.is(RuleType.THREE, result.type);
});

test('is THREE_WITH_ONE', t => {
    let card1: Card = new Card(CardSuit.Club, '4');
    let card2: Card = new Card(CardSuit.Diamond, '4');
    let card3: Card = new Card(CardSuit.Spade, '4');
    let card4: Card = new Card(CardSuit.Heart, '6');

    let cardRule: CardRule = new CardRule([card1, card2, card3, card4]);
    let result: RuleResult = cardRule.make();

    t.is(RuleType.THREE_WITH_ONE, result.type);
});

test('is THREE_WITH_PAIRS', t => {
    let card1: Card = new Card(CardSuit.Club, '4');
    let card2: Card = new Card(CardSuit.Diamond, '4');
    let card3: Card = new Card(CardSuit.Spade, '4');
    let card4: Card = new Card(CardSuit.Heart, '6');
    let card5: Card = new Card(CardSuit.Spade, '6');

    let cardRule: CardRule = new CardRule([card1, card2, card3, card4, card5]);
    let result: RuleResult = cardRule.make();

    t.is(RuleType.THREE_WITH_PAIRS, result.type);
});

test('is STRAIGHT', t => {
    let cards: Card[] = [];
    for (let i = 0; i < 6; i++) {
        cards.push(new Card(CardSuit.Club, <CardValue>('' + (i + 3))));
    }

    let cardRule: CardRule = new CardRule(cards);
    let result: RuleResult = cardRule.make();

    t.is(RuleType.STRAIGHT, result.type);
});

test('is STRAIGHT_PAIRS', t => {
    let cards: Card[] = [];
    for (let i = 0; i < 6; i++) {
        cards.push(new Card(CardSuit.Club, <CardValue>('' + (i + 3))));
    }
    for (let i = 0; i < 6; i++) {
        cards.push(new Card(CardSuit.Spade, <CardValue>('' + (i + 3))));
    }

    let cardRule: CardRule = new CardRule(cards);
    let result: RuleResult = cardRule.make();

    t.is(RuleType.STRAIGHT_PAIRS, result.type);
});

test('is PLANE', t => {
    let cards: Card[] = [];
    for (let i = 0; i < 3; i++) {
        cards.push(new Card(CardSuit.Club, <CardValue>('' + (i + 3))));
    }
    for (let i = 0; i < 3; i++) {
        cards.push(new Card(CardSuit.Spade, <CardValue>('' + (i + 3))));
    }
    for (let i = 0; i < 3; i++) {
        cards.push(new Card(CardSuit.Spade, <CardValue>('' + (i + 3))));
    }

    let cardRule: CardRule = new CardRule(cards);
    let result: RuleResult = cardRule.make();

    t.is(RuleType.PLANE, result.type);
});

test('is PLANE_WITH_ONE', t => {
    let cards: Card[] = [];
    for (let i = 0; i < 2; i++) {
        cards.push(new Card(CardSuit.Club, <CardValue>('' + (i + 3))));
    }
    for (let i = 0; i < 2; i++) {
        cards.push(new Card(CardSuit.Spade, <CardValue>('' + (i + 3))));
    }
    for (let i = 0; i < 2; i++) {
        cards.push(new Card(CardSuit.Spade, <CardValue>('' + (i + 3))));
    }

    cards.push(new Card(CardSuit.Spade, '9'));
    cards.push(new Card(CardSuit.Spade, 'J'));

    let cardRule: CardRule = new CardRule(cards);
    let result: RuleResult = cardRule.make();

    t.is(RuleType.PLANE_WITH_ONE, result.type);
});

test('is PLANE_WITH_PAIRS', t => {
    let cards: Card[] = [];
    for (let i = 0; i < 2; i++) {
        cards.push(new Card(CardSuit.Club, <CardValue>('' + (i + 3))));
    }
    for (let i = 0; i < 2; i++) {
        cards.push(new Card(CardSuit.Spade, <CardValue>('' + (i + 3))));
    }
    for (let i = 0; i < 2; i++) {
        cards.push(new Card(CardSuit.Spade, <CardValue>('' + (i + 3))));
    }

    cards.push(new Card(CardSuit.Spade, '9'));
    cards.push(new Card(CardSuit.Club, '9'));
    cards.push(new Card(CardSuit.Spade, 'J'));
    cards.push(new Card(CardSuit.Club, 'J'));

    let cardRule: CardRule = new CardRule(cards);
    let result: RuleResult = cardRule.make();

    t.is(RuleType.PLANE_WITH_PAIRS, result.type);
});

test('is FOUR_WITH_TWO', t => {
    let cards: Card[] = [];

    cards.push(new Card(CardSuit.Spade, '9'));
    cards.push(new Card(CardSuit.Club, '9'));
    cards.push(new Card(CardSuit.Heart, '9'));
    cards.push(new Card(CardSuit.Diamond, '9'));
    cards.push(new Card(CardSuit.Diamond, 'J'));
    cards.push(new Card(CardSuit.Diamond, 'A'));

    let cardRule: CardRule = new CardRule(cards);
    let result: RuleResult = cardRule.make();

    t.is(RuleType.FOUR_WITH_TWO, result.type);
});


test('is FOUR_WITH_PAIRS', t => {
    let cards: Card[] = [];

    cards.push(new Card(CardSuit.Spade, '9'));
    cards.push(new Card(CardSuit.Club, '9'));
    cards.push(new Card(CardSuit.Heart, '9'));
    cards.push(new Card(CardSuit.Diamond, '9'));


    cards.push(new Card(CardSuit.Diamond, 'J'));
    cards.push(new Card(CardSuit.Heart, 'J'));
    cards.push(new Card(CardSuit.Diamond, 'A'));
    cards.push(new Card(CardSuit.Heart, 'A'));

    let cardRule: CardRule = new CardRule(cards);
    let result: RuleResult = cardRule.make();

    t.is(RuleType.FOUR_WITH_PAIRS, result.type);
});

test('is BOMB', t => {
    let cards: Card[] = [];

    cards.push(new Card(CardSuit.Spade, '9'));
    cards.push(new Card(CardSuit.Club, '9'));
    cards.push(new Card(CardSuit.Heart, '9'));
    cards.push(new Card(CardSuit.Diamond, '9'));

    let cardRule: CardRule = new CardRule(cards);
    let result: RuleResult = cardRule.make();

    t.is(RuleType.BOMB, result.type);
});

test('is KING_BOMB', t => {
    let cards: Card[] = [];

    cards.push(new Card(CardSuit.Joker, 'Red'));
    cards.push(new Card(CardSuit.Joker, 'Black'));

    let cardRule: CardRule = new CardRule(cards);
    let result: RuleResult = cardRule.make();

    t.is(RuleType.KING_BOMB, result.type);
});