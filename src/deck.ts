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

    public dealCards(): Card[][] {

        let cards1: Card[] = [],
            cards2: Card[] = [],
            cards3: Card[] = [],
            leftCards: Card[] = [];

        this.cards.forEach((card, index) => {
            if (index <= 50) {
                switch (index % 3) {
                    case 0:
                        cards1.push(card);
                        break;
                    case 1:
                        cards2.push(card);
                        break;
                    case 2:
                        cards3.push(card);
                        break;
                }
            } else {
                leftCards.push(card);
            }
        });

        return [[...cards1], [...cards2], [...cards3], [...leftCards]];

    }

}