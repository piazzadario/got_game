class State {
        constructor(hand, deck, discardedList, deadList, plotsHand, pastPlots, chars, places, gold, power, modalList, faction, eventDialogCard, attachmentCard, infoCard) {
                if (!arguments.length) {
                        this.player=null;
                        this.hand = [];
                        this.deck = [];
                        this.discardedList = [];
                        this.deadList = [];
                        this.plotsHand = [];
                        this.pastPlots = [];
                        this.chars = [];
                        this.places = [];
                        this.gold = 0;
                        this.power = 0;
                        this.modalList = 'discardedList';
                        this.faction = null;
                        this.eventDialogCard = null;
                        this.attachmentCard = null;
                        this.infoCard = null;
                }
                else {
                        this.player=null;
                        this.hand = hand;
                        this.deck = deck;
                        this.discardedList = discardedList;
                        this.deadList = deadList;
                        this.plotsHand = plotsHand;
                        this.pastPlots = pastPlots;
                        this.chars = chars;
                        this.places = places;
                        this.gold = gold;
                        this.power = power;
                        this.modalList = modalList;
                        this.faction = faction;
                        this.eventDialogCard = eventDialogCard;
                        this.attachmentCard = attachmentCard;
                        this.infoCard = infoCard;
                }
        }
}

export default State;