import AttachmentCard from "./Card/AttachmentCard";
import CharacterCard from "./Card/CharacterCard";
import PlaceCard from "./Card/PlaceCard";
import PlotCard from "./Card/PlotCard";
import Card from "./Card/Card";
import EventCard from "./Card/EventCard";


class Deck {
    factionName:string='';
    plots: Array<PlotCard>;
    places: Array<PlaceCard>;
    characters: Array<CharacterCard>;
    attachments: Array<AttachmentCard>;
    events: Array<EventCard>

    constructor(plots: PlotCard[], places: PlaceCard[], characters: CharacterCard[], attachements: AttachmentCard[], events: EventCard[]) {
        this.plots = plots;
        this.places = places;
        this.characters = characters;
        this.attachments = attachements;
        this.events = events;
    }

    private getCards(): Array<Card> {
        let ret: Array<Card> = this.characters;
        return ret.concat(this.places, this.attachments, this.events);
    }

    private getPlots(): Array<PlotCard> {
        return this.plots;
    }

    getPastPlots(): Array<PlotCard> {
        return this.getPlots().filter(c => c.isDiscarded());
    }

    getNewPlots(): Array<PlotCard> {
        return this.getPlots().filter(c => c.isDeck());
    }

    getHand(): Array<Card> {
        return this.getCards().filter(c => c.isHand());
    }

    getDiscarder(): Array<Card> {
        return this.getCards().filter(c => c.isDiscarded());
    }

    getDead(): Array<Card> {
        return this.getCards().filter(c => c.isDead());
    }

    getPlayed(): Array<Card> {
        return this.getCards().filter(c => c.isPlayed());
    }

    getInDeck(): Array<Card> {
        return this.getCards().filter(c => c.isDeck());
    }

    getCard(id:number):Card{
        return this.getCards().filter(c=>c.id==id)[0];
    }
}

export default Deck;