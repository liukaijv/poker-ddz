import test from 'ava';
import {CardRule, RuleResult, RuleType} from '../src/card_rules';
import {Card} from '../src/card';
import {Deck} from '../src/deck';


let deck: Deck = new Deck();
deck.shuffle();

test('Card rule', t => {

    let cards: Card[] = [];

    for (let i = 0; i < 4; i++) {
        cards.push(deck.deal());
    }

    let cardRule: CardRule = new CardRule(cards);
    for(let a of cardRule.values){
        console.log(JSON.stringify(a));
    }
    t.is(4, Object.keys(cardRule.values).length);

});