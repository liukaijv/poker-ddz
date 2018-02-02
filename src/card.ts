export enum CardSuit{
    Joker = 0,
    Spade,
    Heart,
    Diamond,
    Club,
}

export type CardValue =
    '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | 'T'
    | 'J'
    | 'Q'
    | 'K'
    | 'A'
    | 'Black'
    | 'Red';

export class Card {

    public suit: CardSuit;

    public value: CardValue;

    public rank: number;

    public static VALUES: CardValue[] = ['3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A', '2', 'Black', 'Red'];

    constructor(suit: CardSuit, value: CardValue) {
        let index = Card.VALUES.indexOf(value);
        if (suit === CardSuit.Joker && index < Card.VALUES.length - 2) {
            throw new Error(`Joker's value must be Black or Red`);
        }
        this.suit = suit;
        this.value = value;
        this.rank = index + 3;
    }

    public toString(): string {
        return `${this.value}${CardSuit[this.suit]}`;
    }

    public static sort(a: Card, b: Card) {
        if (a.suit === b.suit) {
            return a.suit > b.suit ? 1 : -1;
        } else if (a.rank > b.rank) {
            return -1;
        } else {
            return 1;
        }
    }

}
