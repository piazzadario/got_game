import Card from './Card'
class CharacterCard extends Card {
    points: number=0;
    attachmentList: Array<Card>=[];
    constructor(id: number) {
        super(id);
    }

    increasePoints() {
        this.points++;
    }

    decreasePoints() {
        this.points--;
        if (this.points < 0)
            this.points = 0;
    }

}

export default CharacterCard;