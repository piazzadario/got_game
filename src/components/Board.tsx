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
import { HandContext } from '../provider/HandContext';
import Deck from '../common/Deck';
import State from "../common/State";
import Card from "../common/Card/Card"
import PlaceCard from "../common/Card/PlaceCard";
import PlotCard from "../common/Card/PlotCard";
import EventCard from "../common/Card/EventCard";
import AttachmentCard from "../common/Card/AttachmentCard";
import CharacterCard from "../common/Card/CharacterCard";
import DeckComponent from "./DeckComponent";
interface IProps {
  boardState: State;
  owner: boolean;
}


class Board extends React.Component<IProps, State>  {
  constructor(props: IProps) {
    super(props);
    this.state = props.boardState;
  }

  selectFaction = (deck: Deck) => {
    this.setState(
      {
        deck: deck
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

  discardCard = (card: Card) => {
    this.state.deck?.getCard(card).toDiscardPile();
    this.setState(
      (state) => {

      },
      () => socket.emit("game", this.state)
    );
  };

  onPlayCard = async (newCard: Card) => {
    let card = await API.getCardData(card);
    if (card.type_code === TYPES.Character) {
      this.setState(
        (state) => {
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
          var newCard = new PlaceCard(card);
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
          var newCard = new PlotCard(card);
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
          eventDialogCard: new EventCard(card),
        },
        () => socket.emit("game", this.state)
      );
      //})
    }
    if (card.type_code === TYPES.Attachment) {
      this.setState(
        {
          attachmentCard: new AttachmentCard(card),
        },
        () => socket.emit("game", this.state)
      );
      //})
    }
  };

  killChar = (card: Card) => {
    this.state.deck?.getCard(card.id).toDeadPile();
    this.setState(
      (state) => {
      },
      () => socket.emit("game", this.state)
    );
  };


  returnToHand = (card: Card) => {
    this.setState(
      (state) => {
        let newState: State = state;
        newState.deck?.getCard(card.id).toHand();
        return { ...newState };
      },
      () => socket.emit("game", this.state)
    );
  };

  returnToDeck = (card: Card) => {
    this.setState(
      (state) => {
        let newState: State = state;
        newState.deck?.getCard(card.id).toDeck();
        return { ...newState };
      },
      () => socket.emit("game", this.state)
    );
  };

  addCard = () => {
    let id = 1;
    this.setState(
      (state) => {
        let newState: State = state;
        newState.deck?.getCard(id).toHand();
        return { ...newState };
      },
      () => socket.emit("game", this.state)
    );
  };


  handleEventCard = (card: Card) => {
    this.state.deck?.getCard(card.id).toDiscardPile();
    this.setState({ eventDialogCard: card });
  };

  setGoldPow = (gold: number, pow: number) => {
    this.setState({ gold: gold, power: pow }, () =>
      socket.emit("game", this.state)
    );
  };

  attachmentAction = (attachmentId: number, charId: number, action) => {
    this.setState(
      (state) => {
        // update status of characters
        let indexOfChar = state.playedCharacterCards.map((c) => c.id).indexOf(charId);
        let characters: CharacterCard = state.playedCharacterCards.find((c) => c.id === charId);
        let newAttachmentsList = [...characters.attachments].filter(
          (a) => a !== attachmentId
        );
        let newChars: Array<CharacterCard> = [...state.playedCharacterCards];
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


  showCardInfo = (card: Card) => {
    this.setState({ infoCard: card });
  };

  handleAttachmentDialog = (attachmentId: AttachmentCard, targetId: Card) => {
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


  shuffleHand = () => {
    this.setState({ hand: shuffle(this.state.hand) }/* , () => localStorage.setItem('hand', this.state.hand) */)
  }

  render() {
    if (!this.state.deck) {
      if (!this.props.owner) {
        return <Row>"Waiting for opponent.." </Row>;
      } else {
        return <SelectFaction onSelectFaction={this.selectFaction} />;
      }
    } else {
      const value = {
        hand: this.state.deck.getHand(),
        returnToHand: this.returnToHand,
        playPlot: this.onPlayCard,
        addAttachment: this.handleAttachmentDialog,
        returnToPlots: this.returnToDeck

      }
      return (
        <HandContext.Provider value={value} >
          <Row>
            <Col sm={8}>
              <Row>
                {
                  this.state.deck.getPlayed().map((c) => (
                    <PlayedCard
                      card={c}
                      key={c.id}
                      owner={this.props.owner}
                      onDiscard={() =>
                        this.discardCard(c)
                      }
                      onKill={() => this.killChar(c)
                      }
                      onShowCardInfo={this.showCardInfo}
                      onReturnToHand={() =>
                        this.returnToHand(c)
                      }
                      handleAttachment={this.attachmentAction}
                    > </PlayedCard>
                  ))
                }</Row>
              < Row >
                {
                  this.state.deck.getPlayed().map((c) => (
                    <PlayedCard
                      card={c}
                      key={c}
                      isChar={false}
                      onDiscard={() => this.discardCard(c)}
                      onShowCardInfo={this.showCardInfo}
                      onReturnToHand={() =>
                        this.returnToHand(c)
                      }
                    > </PlayedCard>
                  ))}
              </Row> </Col>

            < Col sm={4} >
              <Row className="mb-3" >
                <FactionCard
                  faction={this.state.deck.factionName}
                  owner={this.props.owner}
                  hand={this.state.deck.getHand().length}
                  gold={this.state.gold}
                  power={this.state.power}
                  setGoldPow={this.setGoldPow}
                />
                <Pile items={this.state.deck.getPastPlots()} listType={"Past plots"} />
              </Row>
              < Row sm={6} >
                <DeckComponent
                  owner={this.props.owner}
                  cards={this.state.deck.getInDeck()}
                  drawCard={() => this.drawCard()}
                  shuffle={() =>
                    this.setState({ deck: shuffle(this.state.deck) })
                  }
                > </DeckComponent>
                < Pile items={this.state.discardedList} listType={"Discarded"} />
                <Pile items={this.state.deadList} listType={"Dead"} > </Pile>
              </Row>
              < Col hidden={!this.props.owner} className="mt-2" >
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
                    > {`SHUFFLE (${this.state.hand.length})`}</Button>
                  </Col>
                  < Col >
                    <Button
                      variant="secondary"
                      onClick={() => {
                        localStorage.setItem("hand", this.state.hand);
                        window.open("/hand");
                      }}
                    > {`SHOW (${this.state.hand.length})`}</Button>
                  </Col>
                  < AddCardForm onAddPressed={this.addCardToHand} />
                </Row>
              </Col>    </Col>
          </Row>

          < Row hidden={!this.props.owner}>
            <Col sm={7}>
              <Row className="px-3" >
                {
                  this.state.hand.map((c, idx) => (
                    <Col className="handCard p-0" sm={2} key={c} >
                      <HandCard
                        id={c}
                        idx={idx + 1}
                        hidden={!this.props.owner}
                        onDiscard={() => this.discardCard(c, FROMARRAY.Hand)}
                        onPlayCard={() => this.onPlayCard(c)}
                        onReturnToDeck={() => this.returnToDeck(c)}
                        onShowInfo={() => this.showCardInfo(c)}
                      > </HandCard>
                    </Col>
                  ))}
              </Row>
            </Col >
            < Pile items={this.state.plotsHand} listType={"Plots"} />
          </Row>
          < CardInfoDialog
            card={this.state.eventDialogCard}
            show={this.state.eventDialogCard !== null}
            type={"Event"}
            onHide={() => this.handleEventCard(this.state.eventDialogCard)}
          />
          < CardInfoDialog
            card={this.state.infoCard}
            show={this.state.infoCard !== null}
            type={"Card"}
            onHide={() => this.showCardInfo(null)}
          />
          < AttachmentDialog
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
