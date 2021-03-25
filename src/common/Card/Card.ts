class Card{
    id:number;
    isKneed:boolean=false;
    isMenuVisible:boolean=true;
    

    constructor(id:number){
        this.id=id;
    }

    kneel()
    {
        this.isKneed=!this.isKneed;
    }

}

export default Card;