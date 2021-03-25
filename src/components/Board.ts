import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import HandCard from "./HandCard";
import FactionCard from "./FactionCard";
import PlayedCard from "./PlayedCard";
import AddCardForm from "./AddCardForm";
import Pile from "./Pile";
import {
  FROMARRAY,
  AttachmentAction,
  TYPES,
  shuffle,
  Decks,
} from "../common/Utility/constants";
import CardInfoDialog from "./CardInfoDialog";
import AttachmentDialog from "./AttachmentDialog";
import API from "../api";
import { socket } from "../common/Utility/socket";
import SelectFaction from "./SelectFaction";
import {HandContext} from '../provider/HandContext';
import Deck from '../common/Deck';
import State from "../common/State";
import Card from "../common/Card/Card"
import PlaceCard from "../common/Card/PlaceCard";
import PlotCard from "../common/Card/PlotCard";
import EventCard from "../common/Card/EventCard";
import AttachmentCard from "../common/Card/AttachmentCard";
import CharacterCard from "../common/Card/CharacterCard";
interface IProps {
  boardState:State;
  owner:boolean;
}


class Board extends React.Component<IProps, State>  {
  constructor(props:IProps) {
    super(props);
    this.state = props.boardState;
  }

  selectFaction = (deck:Deck ) => {
    this.setState(
      {
        deck:deck
      },
      () => socket.emit("game", this.state)
    );
    // this.setState({me: newMe}, () => socket.emit("game", this.state))
  };

  componentDidMount() {
    if (!this.props.owner) {
      socket.on("game", (gameState) => {
        console.log("New game state: ", gameState);
        this.setState(gameState);
      });
    }
  }

  discardCard = (id:number, from:string) => {
    if (from !== FROMARRAY.Chars) {
      this.setState(
        (state) => {
          var newCard:Card=new Card(id);
          let discarded = state.discardedCards.concat(newCard);
          let indexOfDiscarded = state.playedCharacterCards.indexOf(newCard);
          let newList = [...state.playedCharacterCards];
          newList.splice(indexOfDiscarded, 1);
          return { [from]: newList, discardedCards: discarded };
        },
        () => socket.emit("game", this.state)
      );
      //}, () => localStorage.setItem('hand', this.state.hand))
    } else {
      this.setState(
        (state) => {
          console.log(id);
          var newCard=new Card(id);
          let discarded = state.discardedCards.concat(newCard);
          let indexOfDiscarded = state.playedCharacterCards.map((c) => c.id).indexOf(newCard.id);
          let newList = [...state.playedCharacterCards];
          newList.splice(indexOfDiscarded, 1);
          return { playedCharacterCards: newList, discardedCards: discarded };
        },
        () => socket.emit("game", this.state)
      );
      //}, () => localStorage.setItem('hand', this.state.hand))
    }
  };

  onPlayCard = async (id:number) => {
    let card = await API.getCardData(id);
    if (card.type_code === TYPES.Character) {
      this.setState(
        (state) => {
          var newCard=new Card(id);
          let newCharsList = state.playedCharacterCards.concat(newCard);
          let indexOfDiscarded = state.hand.indexOf(newCard);
          let newHand = [...state.hand];
          newHand.splice(indexOfDiscarded, 1);
          return { hand: newHand, playedCharacterCards: newCharsList };
        },
        () => socket.emit("game", this.state)
      );
      //}, () => localStorage.setItem('hand', this.state.hand))
    }
    if (card.type_code === TYPES.Location) {
      this.setState(
        (state) => {
          var newCard=new PlaceCard(id);
          let newPlacesList = state.playedPlaces.concat(newCard);
          let indexOfDiscarded = state.hand.indexOf(newCard);
          let newHand = [...state.hand];
          newHand.splice(indexOfDiscarded, 1);
          return { hand: newHand, playedPlaces: newPlacesList };
        },
        () => socket.emit("game", this.state)
      );
      //}, () => localStorage.setItem('hand', this.state.hand))
    }
    if (card.type_code === TYPES.Plot) {
      this.setState(
        (state) => {
          var newCard=new PlotCard(id);
          let newPastPlotsList = state.pastPlots.concat(newCard);
          let indexOfDiscarded = state.handCards.indexOf(newCard);
          let newPlotsHand = [...state.handCards];
          newPlotsHand.splice(indexOfDiscarded, 1);
          return { handCards: newPlotsHand, pastPlots: newPastPlotsList };
        },
        () => socket.emit("game", this.state)
      );
      //}, () => localStorage.setItem('hand', this.state.hand))
    }
    if (card.type_code === TYPES.Event) {
      this.setState(
        {
          eventDialogCard: new EventCard(id),
        },
        () => socket.emit("game", this.state)
      );
      //})
    }
    if (card.type_code === TYPES.Attachment) {
      this.setState(
        {
          attachmentCard: new AttachmentCard(id),
        },
        () => socket.emit("game", this.state)
      );
      //})
    }
  };

  killChar = (id:number) => {
    this.setState(
      (state) => {
        let deads = state.deadCards.concat(new Card(id));
        let indexOfKilled = state.playedCharacterCards.map((c) => c.id).indexOf(id);
        let newChars = [...state.playedCharacterCards];
        newChars.splice(indexOfKilled, 1);
        return { playedCharacterCards: newChars, deadCards: deads };
      },
      () => socket.emit("game", this.state)
    );
    //})
  };
  returnToHand = (id:number, from:string) => {
    this.setState(
      (state) => {
        let newHand = state.hand.concat(new Card(id));
        let indexOfReturned =
          from === FROMARRAY.Chars
            ? state.playedCharacterCards.map((c) => c.id).indexOf(id)
            : state[from].indexOf(id);
        let newList = [...state[from]];
        newList.splice(indexOfReturned, 1);
        return { [from]: newList, handCards: newHand };
      },
      () => socket.emit("game", this.state)
    );
    //}, () => localStorage.setItem('hand', this.state.hand))
  };

  returnToDeck = (id:number) => {
    this.setState(
      (state) => {
        var newCard=new Card(id);
        let newDeck = state.coverDeck.concat(newCard);
        let indexOfDiscarded = state.hand.indexOf(newCard);
        let newHand = [...state.hand];
        newHand.splice(indexOfDiscarded, 1);
        return { handCards: newHand, deck: newDeck };
      },
      () => socket.emit("game", this.state)
    );
    //}, () => localStorage.setItem('hand', this.state.hand))
  };

  addCard = () => {
    this.setState(
      (state) => {
        let id = state.handCards.length + 1;
        const cardsList = state.handCards.concat(new Card(id));
        return { handCards: cardsList };
      },
      () => socket.emit("game", this.state)
    );
    //}, () => localStorage.setItem('hand', this.state.hand));
  };

  drawCard = () => {
    this.setState(
      (state) => {
        let tmpDeck = [...state.deck];
        let drawnCard = tmpDeck.pop();
        let newHand = state.hand.concat(drawnCard);
        console.log(state.deck.length, tmpDeck.length);
        return { hand: newHand, deck: tmpDeck };
      },
      () => socket.emit("game", this.state)
    );
    //}, () => localStorage.setItem('hand', this.state.hand))
  };

  handleEventCard = (id:number) => {
    this.discardCard(id, FROMARRAY.Hand);
    this.setState({ eventDialogCard: null });
  };

  setGoldPow = (gold:number, pow:number) => {
    console.log(gold, pow);
    this.setState({ gold: gold, power: pow }, () =>
      socket.emit("game", this.state)
    );
  };

  attachmentAction = (attachmentId:number, charId:number, action) => {
    this.setState(
      (state) => {
        // update status of characters
        let indexOfChar = state.playedCharacterCards.map((c) => c.id).indexOf(charId);
        let characters:CharacterCard = state.playedCharacterCards.find((c) => c.id === charId);
        let newAttachmentsList = [...characters.attachments].filter(
          (a) => a !== attachmentId
        );
        let newChars:Array<CharacterCard> = [...state.playedCharacterCards];
        newChars[indexOfChar].attachments = newAttachmentsList;

        // update hand/discarded
        let newList;
        if (action === AttachmentAction.Discard) {
          newList = state.discardedCards.concat(attachmentId);
          return { playedCharacterCards: newChars, discardedCards: newList };
        } else {
          newList = state.hand.concat(attachmentId);
          return { playedCharacterCards: newChars, handCards: newList };
        }
      },
      () => socket.emit("game", this.state)
    );
    //})
  };

  addCardToHand = (id:Card) => {
    this.setState(
      (state) => {
        let newHand = state.hand.concat(id);
        return { hand: newHand };
      },
      () => socket.emit("game", this.state)
    );
    //}, () => localStorage.setItem('hand', this.state.hand))
  };

  showCardInfo = (id:Card) => {
    this.setState({ infoCard: id });
  };

  handleAttachmentDialog = (attachmentId:AttachmentCard, targetId:Card) => {
    const attachmentCard = this.state.attachmentCard;
    if (!targetId) {
      this.setState({ attachmentCard: null });
    } else {
      let chars = [...this.state.playedCharacterCards];
      let targetIndex = chars.map((c) => c.id).indexOf(targetId);
      // console.log(targetIndex)
      if (!chars[targetIndex].attachments) {
        chars[targetIndex].attachments = [attachmentCard];
      } else {
        let newAttachmentsList = chars[targetIndex].attachments.concat(
          attachmentCard
        );
        chars[targetIndex].attachments = newAttachmentsList;
      }
      let newHand = [...this.state.hand];
      let indexOfPlayed = this.state.hand.indexOf(attachmentId);
      newHand.splice(indexOfPlayed, 1);
      this.setState({ attachmentCard: null, playedCharacterCards: chars, hand: newHand }, () =>
        socket.emit("game", this.state)
      );
      //}, () => localStorage.setItem('hand', this.state.hand))
    }
  };

  returnToPlots = (id) => {
    this.setState(state => {
      let newPlotsHand = state.handCards.concat(id);
      let indexOfReturned = state.pastPlots.indexOf(id);
      let newList = [...state.pastPlots];
      newList.splice(indexOfReturned, 1)
      return { pastPlots: newList, handCards: newPlotsHand }
    })
  }

  shuffleHand = () => {
    this.setState({ hand: shuffle(this.state.hand) }/* , () => localStorage.setItem('hand', this.state.hand) */)
  }

  render() {
    if (!this.state.faction) {
      if (!this.props.owner) {
        return <p>Waiting for opponent...</p>;
      } else {
        return <SelectFaction onSelectFaction={this.selectFaction} />;
      }
    } else {
      const value = {
        hand: this.state.hand,
        returnToHand: this.returnToHand,
        playPlot: this.onPlayCard,
        addAttachment: this.handleAttachmentDialog,
        returnToPlots: this.returnToPlots
  
      }
      return (
        <HandContext.Provider value={value}>
          <Row>
            <Col sm={8}>
              <Row>
                {this.state.chars.map((c) => (
                  <PlayedCard
                    card={c}
                    key={c.charId}
                    owner={this.props.owner}
                    onDiscard={() =>
                      this.discardCard(c.charId, FROMARRAY.Chars)
                    }
                    onKill={() => this.killChar(c.charId)}
                    onShowCardInfo={this.showCardInfo}
                    isChar={true}
                    onReturnToHand={() =>
                      this.returnToHand(c.charId, FROMARRAY.Chars)
                    }
                    handleAttachment={this.attachmentAction}
                  ></PlayedCard>
                ))}
              </Row>
              <Row>
                {this.state.places.map((c) => (
                  <PlayedCard
                    card={c}
                    key={c}
                    isChar={false}
                    onDiscard={() => this.discardCard(c, FROMARRAY.Places)}
                    onShowCardInfo={this.showCardInfo}
                    onReturnToHand={() =>
                      this.returnToHand(c, FROMARRAY.Places)
                    }
                  ></PlayedCard>
                ))}
              </Row>
            </Col>

            <Col sm={4}>
              <Row className="mb-3">
                <FactionCard
                  faction={this.state.faction}
                  owner={this.props.owner}
                  hand={this.state.hand.length}
                  gold={this.state.gold}
                  power={this.state.power}
                  setGoldPow={this.setGoldPow}
                />
                <Pile items={this.state.pastPlots} listType={"Past plots"} />
              </Row>
              <Row sm={6}>
                <Deck
                  owner={this.props.owner}
                  cards={this.state.deck}
                  drawCard={() => this.drawCard()}
                  shuffle={() =>
                    this.setState({ deck: shuffle(this.state.deck) })
                  }
                ></Deck>
                <Pile items={this.state.discardedList} listType={"Discarded"} />
                <Pile items={this.state.deadList} listType={"Dead"}></Pile>
              </Row>
              <Col hidden={!this.props.owner} className="mt-2">
                <Row
                  className="align-items-center mb-1"
                  style={{
                    border: "2px solid black",
                    display: "inline-flex",
                  }}
                >
                  <Col>
                    <Button
                      variant="info"
                      onClick={() => this.shuffleHand()}
                    >{`SHUFFLE (${this.state.hand.length})`}</Button>
                  </Col>
                  <Col>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        localStorage.setItem("hand", this.state.hand);
                        window.open("/hand");
                      }}
                    >{`SHOW (${this.state.hand.length})`}</Button>
                  </Col>
                  <AddCardForm onAddPressed={this.addCardToHand} />
                </Row>
              </Col>
            </Col>
          </Row>

          <Row hidden={!this.props.owner}>
            <Col sm={7}>
              <Row className="px-3">
                {this.state.hand.map((c, idx) => (
                  <Col className="handCard p-0" sm={2} key={c}>
                    <HandCard
                      id={c}
                      idx={idx + 1}
                      hidden={!this.props.owner}
                      onDiscard={() => this.discardCard(c, FROMARRAY.Hand)}
                      onPlayCard={() => this.onPlayCard(c)}
                      onReturnToDeck={() => this.returnToDeck(c)}
                      onShowInfo={()=>this.showCardInfo(c)}
                    ></HandCard>
                  </Col>
                ))}
              </Row>
            </Col>
            <Pile items={this.state.plotsHand} listType={"Plots"} />
          </Row>
          <CardInfoDialog
            card={this.state.eventDialogCard}
            show={this.state.eventDialogCard !== null}
            type={"Event"}
            onHide={() => this.handleEventCard(this.state.eventDialogCard)}
          />
          <CardInfoDialog
            card={this.state.infoCard}
            show={this.state.infoCard !== null}
            type={"Card"}
            onHide={() => this.showCardInfo(null)}
          />
          <AttachmentDialog
            charactersList={this.state.chars}
            attachment={this.state.attachmentCard}
            onAttach={this.handleAttachmentDialog}
            show={this.state.attachmentCard !== null}
            onHide={() => {
              this.handleAttachmentDialog(null);
            }}
          />
        </HandContext.Provider>
      );
    }
  }
}
export default Board;
