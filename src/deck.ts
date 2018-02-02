import {Card, CardSuit} from './card';

export class Deck {

    public cards: Card[] = [];

    constructor() {

        let len: number = Card.VALUES.length;

        //color cards
        for (let val of Card.VALUES.slice(0, len - 2)) {
            this.cards.push(new Card(CardSuit.Club, val));
            this.cards.push(new Card(CardSuit.Diamond, val));
            this.cards.push(new Card(CardSuit.Heart, val));
            this.cards.push(new Card(CardSuit.Spade, val));
        }

        //red|black joker cards
        for (let val of Card.VALUES.slice(len - 2)) {
            this.cards.push(new Card(CardSuit.Joker, val));
        }

    }

    public shuffle(): void {

        //Shuffle the deck array with Fisher-Yates
        let i, j, tempI, tempJ;

        for (i = 0; i < this.cards.length; i++) {
            j = Math.floor(Math.random() * i + 1);
            tempI = this.cards[i];
            tempJ = this.cards[j];
            this.cards[i] = tempJ;
            this.cards[j] = tempI;
        }

    }

    public deal(): Card {
        return this.cards.pop();
    }

}