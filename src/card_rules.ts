import {Card, CardSuit} from './card';

export interface RuleResult {
    type: RuleType,
    rank: number,
    size: number
}

export enum RuleType {
    ONE = 1,
    PAIRS,
    THREE,
    THREE_WITH_ONE,
    THREE_WITH_PAIRS,
    STRAIGHT,
    STRAIGHT_PAIRS,
    PLANE,
    PLANE_WITH_ONE,
    PLANE_WITH_TWO,
    FOUR_WITH_TWO,
    FOUR_WITH_PAIRS,
    BOMB,
    KING_BOMB,
}

export class CardRule {

    public values: Card[][] = [];

    constructor(public cards: Card[]) {

        for (let card of this.cards.sort(Card.sort)) {
            if (!this.values[card.rank]) {
                this.values[card.rank] = [];
            }
            this.values[card.rank].push(card);
        }
    }

    public make(): RuleResult {
        let len: number = this.cards.length;
        let result: RuleResult = null;
        switch (len) {
            case 1:
                result = {
                    type: RuleType.ONE,
                    rank: this.cards[0].rank,
                    size: len
                };
                break;
            case 2:
                if (this.isPairs()) {
                    result = {
                        type: RuleType.PAIRS,
                        rank: this.cards[0].rank,
                        size: len
                    };
                } else if (this.isKingBomb()) {
                    result = {
                        type: RuleType.KING_BOMB,
                        rank: this.cards[0].rank,
                        size: len
                    };
                }
                break;
            case 3:
                if (this.isThree()) {
                    result = {
                        type: RuleType.THREE,
                        rank: this.cards[0].rank,
                        size: len
                    };
                }
                break;
            case 4:
                if (this.isThreeWithOne()) {
                    result = {
                        type: RuleType.THREE_WITH_ONE,
                        rank: this.cards[0].rank,
                        size: len
                    };
                } else if (this.isBomb()) {
                    result = {
                        type: RuleType.BOMB,
                        rank: this.cards[0].rank,
                        size: len
                    };
                }
                break;
            default:
                if (this.isStraight()) {
                    result = {
                        type: RuleType.STRAIGHT,
                        rank: this.cards[0].rank,
                        size: len
                    };
                } else if (this.isStraightPairs()) {
                    result = {
                        type: RuleType.STRAIGHT,
                        rank: this.cards[0].rank,
                        size: len
                    };
                } else if (this.isThreeWithPairs()) {
                    result = {
                        type: RuleType.STRAIGHT,
                        rank: this.cards[0].rank,
                        size: len
                    };
                } else if (this.isPlane()) {
                    result = {
                        type: RuleType.STRAIGHT,
                        rank: this.cards[0].rank,
                        size: len
                    };
                } else if (this.isPlaneWithOne()) {
                    result = {
                        type: RuleType.STRAIGHT,
                        rank: this.cards[0].rank,
                        size: len
                    };
                } else if (this.isPlaneWithPairs()) {
                    result = {
                        type: RuleType.STRAIGHT,
                        rank: this.cards[0].rank,
                        size: len
                    };
                } else if (this.isFourWithOne()) {
                    result = {
                        type: RuleType.STRAIGHT,
                        rank: this.cards[0].rank,
                        size: len
                    };
                } else if (this.isFourWithPairs()) {
                    result = {
                        type: RuleType.STRAIGHT,
                        rank: this.cards[0].rank,
                        size: len
                    };
                }
                break;
        }
        return result;
    }

    public getMaxRankBySize(size: number): number {
        let max: number = 0;
        for (let value of Object.keys(this.values)) {
            if (this.values[value] === size && parseInt(value) >= max) {
                max = parseInt(value);
            }
        }
        return max;
    }

    private isPairs(): boolean {
        return this.cards.length === 2 && this.cards[0].rank === this.cards[1].rank;
    }

    private isThree(): boolean {
        return this.cards.length === 3 && this.cards[0].rank === this.cards[1].rank && this.cards[1].rank === this.cards[2].rank;
    }

    private isThreeWithOne(): boolean {
        if (this.cards.length !== 4) {
            return false;
        }
        return true;
    }

    private isThreeWithPairs(): boolean {
        if (this.cards.length !== 5) {
            return false;
        }
        return true;
    }

    private isPlane(): boolean {
        return true;
    }

    private isPlaneWithOne(): boolean {
        return true;
    }

    private isPlaneWithPairs(): boolean {

        return true;
    }

    private isFourWithOne(): boolean {
        return true;
    }

    private isFourWithPairs(): boolean {
        return true;
    }

    private isBomb(): boolean {
        return true;
    }

    private isStraight(): boolean {
        return true;
    }

    private isStraightPairs(): boolean {
        return true;
    }

    private isKingBomb(): boolean {
        return this.cards.length === 2 && this.cards[0].suit === CardSuit.Joker && this.cards[1].suit === CardSuit.Joker;
    }


}