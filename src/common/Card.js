class Card{
    constructor(number,type,isKneed,isMenuVisible,points,attachmentList){
        this.number=number;
        this.type=type;
        this.isKneed=isKneed;
        this.isMenuVisible=isMenuVisible;
        this.points=points;
        this.attachmentList=attachmentList;
    }

    kneel()
    {
        this.isKneed=!this.isKneed;
    }

    increasePoints(){
        this.points++;
    }

    decreasePoints(){
        this.points--;
        if(this.points<0)
            this.points=0;
    }
}