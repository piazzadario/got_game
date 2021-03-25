import AttachmentCard from "./Card/AttachmentCard";
import CharacterCard from "./Card/CharacterCard";
import PlaceCard from "./Card/PlaceCard";
import PlotCard from "./Card/PlotCard";
import Card from "./Card/Card";
import EventCard from "./Card/EventCard";


class Deck {
    plots: Array<PlotCard>;
    places: Array<PlaceCard>;
    characters: Array<CharacterCard>;
    attachments: Array<AttachmentCard>;
    events:Array<EventCard>

    constructor(plots: PlotCard[], places: PlaceCard[], characters: CharacterCard[], attachements: AttachmentCard[],events:EventCard[]) {
        this.plots = plots;
        this.places = places;
        this.characters = characters;
        this.attachments = attachements;
        this.events=events;
    }

    getCards():Array<Card>{
        return this.characters;

    }

    getPlots():Array<PlotCard>{
        return this.plots;
    }
}

export default Deck;