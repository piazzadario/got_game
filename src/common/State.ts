import Card from './Card/Card'
import CharacterCard from './Card/CharacterCard';
import PlaceCard from './Card/PlaceCard';
import PlotCard from './Card/PlotCard';
import Deck from './Deck';
class State {
        deck: Deck | null;
        gold: number;
        power: number;
        modalList: string;
        eventDialogCard: Card | null;
        attachmentCard: Card | null;
        infoCard: Card | null;
        constructor(deck: Deck | null, gold: number, power: number, modalList: string, eventDialogCard: Card | null, attachmentCard: Card | null, infoCard: Card | null) {
                if (!arguments.length) {
                        this.deck = null;
                        this.gold = 0;
                        this.power = 0;
                        this.modalList = 'discardedList';
                        this.eventDialogCard = null;
                        this.attachmentCard = null;
                        this.infoCard = null;
                }
                else {
                        this.deck = deck;
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