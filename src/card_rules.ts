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
    PLANE_WITH_PAIRS,
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

    public  make(): RuleResult {
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
                        rank: this.getMaxRankBySize(3),
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
                        type: RuleType.STRAIGHT_PAIRS,
                        rank: this.cards[0].rank,
                        size: len
                    };
                } else if (this.isThreeWithPairs()) {
                    result = {
                        type: RuleType.THREE_WITH_PAIRS,
                        rank: this.getMaxRankBySize(3),
                        size: len
                    };
                } else if (this.isPlane()) {
                    result = {
                        type: RuleType.PLANE,
                        rank: this.cards[0].rank,
                        size: len
                    };
                } else if (this.isPlaneWithOne()) {
                    result = {
                        type: RuleType.PLANE_WITH_ONE,
                        rank: this.getMaxRankBySize(3),
                        size: len
                    };
                } else if (this.isPlaneWithPairs()) {
                    result = {
                        type: RuleType.PLANE_WITH_PAIRS,
                        rank: this.getMaxRankBySize(3),
                        size: len
                    };
                } else if (this.isFourWithTwo()) {
                    result = {
                        type: RuleType.FOUR_WITH_TWO,
                        rank: this.getMaxRankBySize(4),
                        size: len
                    };
                } else if (this.isFourWithPairs()) {
                    result = {
                        type: RuleType.FOUR_WITH_PAIRS,
                        rank: this.getMaxRankBySize(3),
                        size: len
                    };
                }
                break;
        }
        return result;
    }

    private getMaxRankBySize(size: number): number {
        let max: number = 0;
        for (let value of Object.keys(this.values)) {
            if (this.values[value] === size && parseInt(value) >= max) {
                max = parseInt(value);
            }
        }
        return max;
    }

    public possibleStraight<T>(ranks: T[]): boolean {
        let len: number = ranks.length;
        if (len < 2) {
            return false;
        }
        let compareArr: number[] = ranks.map(rank => parseInt('' + rank)).sort((a, b) => b - a);
        //2，双王不能作顺
        if (compareArr[0] >= 15) {
            return false;
        }
        let resultArr: number[] = [];
        for (let rank of compareArr) {
            let prev: number = resultArr[resultArr.length - 1];
            let diff: number = null;
            if (prev) {
                diff = prev - rank;
            }
            if (diff > 1) {
                resultArr = [];
                resultArr.push(rank);
            } else if (diff === 1) {
                resultArr.push(rank);
            } else if (diff === null) {
                resultArr.push(rank);
            }
        }
        return resultArr.length === len;
    }

    private isPairs(): boolean {
        return this.cards.length === 2 && this.values.some(value => value.length === 2);
    }

    private isThree(): boolean {
        return this.cards.length === 3 && this.values.some(value => value.length === 3);
    }

    private isThreeWithOne(): boolean {
        return this.cards.length === 4 && this.values.some(value => value.length === 3);
    }

    private isThreeWithPairs(): boolean {
        return this.cards.length === 5 && Object.keys(this.values).length === 2 && this.values.some(value => value.length === 3);
    }

    private isStraight(): boolean {
        if (this.cards.length < 5) {
            return false;
        }
        if (Object.keys(this.values).length !== this.cards.length) {
            return false;
        }
        return this.possibleStraight(Object.keys(this.values));
    }

    private isStraightPairs(): boolean {
        if (this.cards.length < 6 || this.cards.length % 2 !== 0) {
            return false;
        }
        if (!this.values.every(value => value.length === 2)) {
            return false;
        }
        return this.possibleStraight(Object.keys(this.values));
    }


    private isPlane(): boolean {
        if (this.cards.length < 6 || this.cards.length % 3 !== 0) {
            return false;
        }
        if (!this.values.every(value => value.length === 3)) {
            return false;
        }
        return this.possibleStraight(Object.keys(this.values));
    }

    private isPlaneWithOne(): boolean {
        if (this.cards.length < 8 || this.cards.length % 4 !== 0 || this.cards[0].rank >= 15) {
            return false;
        }
        let threeRanks: number[] = [];
        let threeList: Card[][] = this.values.filter((value, index) => {
            if (value.length === 3) {
                threeRanks.push(index);
                return true;
            } else {
                return false;
            }
        });
        if (threeList.length !== this.cards.length / 4) {
            return false;
        }
        return this.possibleStraight(threeRanks);
    }

    private isPlaneWithPairs(): boolean {
        if (this.cards.length < 10 || this.cards.length % 5 !== 0) {
            return false;
        }
        let threeRanks: number[] = [];
        let groupCount: number = this.cards.length / 5;
        let threeList: Card[][] = this.values.filter((value, index) => {
            if (value.length === 3) {
                threeRanks.push(index);
                return true;
            } else {
                return false;
            }
        });
        let pairsList: Card[][] = this.values.filter(value => value.length === 2);

        if (threeList.length !== groupCount || pairsList.length !== groupCount || this.cards[0].rank === 15) {
            return false;
        }

        return this.possibleStraight(threeRanks);
    }

    private isFourWithTwo(): boolean {
        return this.cards.length === 6 && Object.keys(this.values).length === 3 && this.values.some(value => value.length === 4);
    }

    private isFourWithPairs(): boolean {
        return this.cards.length === 8 && Object.keys(this.values).length === 3 && this.values.some(value => value.length === 4);
    }

    private isBomb(): boolean {
        return this.cards.length === 4 && this.values.some(value => value.length === 4);
    }

    private isKingBomb(): boolean {
        return this.cards.length === 2 && this.cards.every(card => card.suit === CardSuit.Joker);
    }


}