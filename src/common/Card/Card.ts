enum CardState {
    Hand,
    Played,
    Discarded,
    Dead,
    Deck
  }


class Card{
    id:number;
    isKneed:boolean=false;
    isMenuVisible:boolean=true;
    state:CardState=CardState.Deck;

    constructor(id:number){
        this.id=id;
    }

    kneel()
    {
        this.isKneed=!this.isKneed;
    }

    play(){
        this.state=CardState.Played;
    }
    toHand(){
        this.state=CardState.Hand;
    }
    toDeck(){
        this.state=CardState.Deck;
    }
    toDiscardPile(){
        this.state=CardState.Discarded;
    }
    toDeadPile(){
        this.state=CardState.Dead;
    }

    isPlayed(){
        return this.state==CardState.Played;
    }
    isHand(){
        return this.state==CardState.Hand;
    }
    isDeck(){
        return this.state==CardState.Deck;
    }
    isDiscarded(){
        return this.state==CardState.Discarded;
    }
    isDead(){
        return this.state==CardState.Dead;
    }

}

export default Card;