import Deck from './Deck';
class Faction{
    name:string;
    deck:Deck;
    constructor(name:string,deck:Deck){
        this.name=name;
        this.deck=deck;
    }
}

export default Faction;