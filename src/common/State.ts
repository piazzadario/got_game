import Card from './Card/Card'
import CharacterCard from './Card/CharacterCard';
import PlaceCard from './Card/PlaceCard';
import PlotCard from './Card/PlotCard';
import Deck from './Deck';
class State {
        deck:Deck|null;
        discardedCards:Array<Card>;
        deadCards:Array<Card>;
        handCards:Array<PlotCard>;
        pastPlots:Array<PlotCard>;
        playedCharacterCards:Array<CharacterCard>;
        playedPlaces:Array<PlaceCard>
        gold:number;
        power:number;
        modalList:string;
        eventDialogCard:Card | null;
        attachmentCard:Card|null;
        infoCard:Card|null;
        coverDeck:Array<Card>=[];
        constructor( deck: Deck |null,discardedList: Card[] , deadList: Card[] , plotsHand: PlotCard[] , pastPlots: PlotCard[] , chars: CharacterCard[] , places: PlaceCard[] , gold: number ,power: number, modalList: string ,  eventDialogCard: Card | null , attachmentCard: Card | null , infoCard: Card | null ) {
                if (!arguments.length) {
                
                       
                        this.deck = null;
                        this.discardedCards = [];
                        this.deadCards = [];
                        this.handCards = [];
                        this.pastPlots = [];
                        this.playedCharacterCards = [];
                        this.playedPlaces = [];
                        this.gold = 0;
                        this.power = 0;
                        this.modalList = 'discardedList';
                        this.eventDialogCard = null;
                        this.attachmentCard = null;
                        this.infoCard = null;
                }
                else {
                
             
                        this.deck = deck;
                        this.discardedCards = discardedList;
                        this.deadCards = deadList;
                        this.handCards = plotsHand;
                        this.pastPlots = pastPlots;
                        this.playedCharacterCards = chars;
                        this.playedPlaces = places;
                        this.gold = gold;
                        this.power = power;
                        this.modalList = modalList;
                        this.eventDialogCard = eventDialogCard;
                        this.attachmentCard = attachmentCard;
                        this.infoCard = infoCard;
                }
        }
}

export default State;