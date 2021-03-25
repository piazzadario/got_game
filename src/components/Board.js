import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import HandCard from "./HandCard";
import FactionCard from "./FactionCard";
import Deck from "./Deck";
import PlayedCard from "./PlayedCard";
import AddCardForm from "./AddCardForm";
import Pile from "./Pile";
import {
  FROMARRAY,
  AttachmentAction,
  TYPES,
  shuffle,
  Decks,
} from "../common/constants";
import CardInfoDialog from "./CardInfoDialog";
import AttachmentDialog from "./AttachmentDialog";
import API from "../api";
import { socket } from "../common/socket";
import SelectFaction from "./SelectFaction";
import {HandContext} from '../provider/HandContext';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props.boardState};
  }

  selectFaction = (faction) => {
    const deck = shuffle(Decks[faction].cards);
    const plotsHand = Decks[faction].plots;

    this.setState(
      {
        faction: faction,
        deck: deck,
        plotsHand: plotsHand,
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

  discardCard = (id, from) => {
    if (from !== FROMARRAY.Chars) {
      this.setState(
        (state) => {
          let discarded = state.discardedList.concat(id);
          let indexOfDiscarded = state[from].indexOf(id);
          let newList = [...state[from]];
          newList.splice(indexOfDiscarded, 1);
          return { [from]: newList, discardedList: discarded };
        },
        () => socket.emit("game", this.state)
      );
      //}, () => localStorage.setItem('hand', this.state.hand))
    } else {
      this.setState(
        (state) => {
          console.log(id);
          let discarded = state.discardedList.concat(id);
          let indexOfDiscarded = state.chars.map((c) => c.id).indexOf(id);
          let newList = [...state.chars];
          newList.splice(indexOfDiscarded, 1);
          return { chars: newList, discardedList: discarded };
        },
        () => socket.emit("game", this.state)
      );
      //}, () => localStorage.setItem('hand', this.state.hand))
    }
  };

  onPlayCard = async (id) => {
    let card = await API.getCardData(id);
    if (card.type_code === TYPES.Character) {
      this.setState(
        (state) => {
          let newCharsList = state.chars.concat({
            id: id,
            attachments: [],
            isKneed: false
          });
          let indexOfDiscarded = state.hand.indexOf(id);
          let newHand = [...state.hand];
          newHand.splice(indexOfDiscarded, 1);
          return { hand: newHand, chars: newCharsList };
        },
        () => socket.emit("game", this.state)
      );
      //}, () => localStorage.setItem('hand', this.state.hand))
    }
    if (card.type_code === TYPES.Location) {
      this.setState(
        (state) => {
          let newPlacesList = state.places.concat({
            id: id,
            isKneed: false
          });
          let indexOfDiscarded = state.hand.indexOf(id);
          let newHand = [...state.hand];
          newHand.splice(indexOfDiscarded, 1);
          return { hand: newHand, places: newPlacesList };
        },
        () => socket.emit("game", this.state)
      );
      //}, () => localStorage.setItem('hand', this.state.hand))
    }
    if (card.type_code === TYPES.Plot) {
      this.setState(
        (state) => {
          let newPastPlotsList = state.pastPlots.concat(id);
          let indexOfDiscarded = state.plotsHand.indexOf(id);
          let newPlotsHand = [...state.plotsHand];
          newPlotsHand.splice(indexOfDiscarded, 1);
          return { plotsHand: newPlotsHand, pastPlots: newPastPlotsList };
        },
        () => socket.emit("game", this.state)
      );
      //}, () => localStorage.setItem('hand', this.state.hand))
    }
    if (card.type_code === TYPES.Event) {
      this.setState(
        {
          eventDialogCard: id,
        },
        () => socket.emit("game", this.state)
      );
      //})
    }
    if (card.type_code === TYPES.Attachment) {
      this.setState(
        {
          attachmentCard: id,
        },
        () => socket.emit("game", this.state)
      );
      //})
    }
  };

  killChar = (id) => {
    this.setState(
      (state) => {
        let deads = state.deadList.concat(id);
        let indexOfKilled = state.chars.map((c) => c.id).indexOf(id);
        let newChars = [...state.chars];
        newChars.splice(indexOfKilled, 1);
        return { chars: newChars, deadList: deads };
      },
      () => socket.emit("game", this.state)
    );
    //})
  };
  returnToHand = (id, from) => {
    this.setState(
      (state) => {
        let newHand = state.hand.concat(id);
        let indexOfReturned;
        if(from === FROMARRAY.Chars) {
          indexOfReturned = state.chars.map((c) => c.id).indexOf(id);
        }else if(from === FROMARRAY.Places){
          indexOfReturned = state.places.map((p) => p.id).indexOf(id)
        }else {
          indexOfReturned = state[from].indexOf(id);
        }
        /*   from === FROMARRAY.Chars
            ? state.chars.map((c) => c.id).indexOf(id)
            : state[from].indexOf(id); */
        let newList = [...state[from]];
        newList.splice(indexOfReturned, 1);
        return { [from]: newList, hand: newHand };
      },
      () => socket.emit("game", this.state)
    );
    //}, () => localStorage.setItem('hand', this.state.hand))
  };

  returnToDeck = (id) => {
    this.setState(
      (state) => {
        let newDeck = state.deck.concat(id);
        let indexOfDiscarded = state.hand.indexOf(id);
        let newHand = [...state.hand];
        newHand.splice(indexOfDiscarded, 1);
        return { hand: newHand, deck: newDeck };
      },
      () => socket.emit("game", this.state)
    );
    //}, () => localStorage.setItem('hand', this.state.hand))
  };

  /* addCard = () => {
    this.setState(
      (state) => {
        let id = state.cards.length + 1;
        const cardsList = state.cards.concat(id);
        return { cards: cardsList };
      },
      () => socket.emit("game", this.state)
    );
    //}, () => localStorage.setItem('hand', this.state.hand));
  }; */

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

  handleEventCard = (id) => {
    this.discardCard(id, FROMARRAY.Hand);
    this.setState({ eventDialogCard: null });
  };

  setGoldPow = (gold, pow) => {
    console.log(gold, pow);
    this.setState({ gold: gold, power: pow }, () =>
      socket.emit("game", this.state)
    );
  };

  attachmentAction = (attachmentId, charId, action) => {
    this.setState(
      (state) => {
        // update status of characters
        let indexOfChar = state.chars.map((c) => c.id).indexOf(charId);
        let char = state.chars.find((c) => c.id === charId);
        let newAttachmentsList = [...char.attachments].filter(
          (a) => a !== attachmentId
        );
        let newChars = [...state.chars];
        newChars[indexOfChar].attachments = newAttachmentsList;

        // update hand/discarded
        let newList;
        if (action === AttachmentAction.Discard) {
          newList = state.discardedList.concat(attachmentId);
          return { chars: newChars, discardedList: newList };
        } else {
          newList = state.hand.concat(attachmentId);
          return { chars: newChars, hand: newList };
        }
      },
      () => socket.emit("game", this.state)
    );
    //})
  };

  addCardToHand = (id) => {
    this.setState(
      (state) => {
        let newHand = state.hand.concat(id);
        return { hand: newHand };
      },
      () => socket.emit("game", this.state)
    );
    //}, () => localStorage.setItem('hand', this.state.hand))
  };

  showCardInfo = (id) => {
    this.setState({ infoCard: id });
  };

  handleAttachmentDialog = (attachmentId, targetId) => {
    const attachmentCard = this.state.attachmentCard;
    if (!targetId) {
      this.setState({ attachmentCard: null });
    } else {
      let chars = [...this.state.chars];
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
      this.setState({ attachmentCard: null, chars: chars, hand: newHand }, () =>
        socket.emit("game", this.state)
      );
      //}, () => localStorage.setItem('hand', this.state.hand))
    }
  };

  returnToPlots = (id) => {
    this.setState(state => {
      let newPlotsHand = state.plotsHand.concat(id);
      let indexOfReturned = state.pastPlots.indexOf(id);
      let newList = [...state.pastPlots];
      newList.splice(indexOfReturned, 1)
      return { pastPlots: newList, plotsHand: newPlotsHand }
    })
  }

  kneeCard = (id,from, attachedTo=null) => {
    // if is not an attachment, it's a place or a character
    if(!attachedTo){
      this.setState(state =>{
        console.log(state[from])
        let indexOftarget = state[from].map(card => card.id).indexOf(id);
        let newArray = [...state[from]];
        let newState = !(state[from][indexOftarget].isKneed);
        let updatedCard  = {...newArray[indexOftarget]};
        updatedCard.isKneed = newState;
        newArray[indexOftarget] = updatedCard;
        console.log(newArray)
        console.log('NewState: ',newState)
        // console.log(newArray)
        return {[from]: newArray}
      },() => socket.emit("game", this.state))
    }else{
      this.setState(state =>{
        let indexOftarget = state[from].map(card => card.id).indexOf(attachedTo);
        let newArray = [...state[from]];
        let newState = !(state[from][indexOftarget].isKneed);
        let updatedCard  = {...newArray[indexOftarget]};
        updatedCard.isKneed = newState;
        newArray[indexOftarget] = updatedCard;
        console.log(newArray)
        console.log('NewState: ',newState)
        // console.log(newArray)
        return {[from]: newArray}
      },() => socket.emit("game", this.state))
    }
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
        returnToPlots: this.returnToPlots,
        // kneeCard: this.kneeCard
  
      }
      return (
        <HandContext.Provider value={value}>
          <Row>
            <Col sm={8}>
              <Row>
                {this.state.chars.map((c) => (
                  <PlayedCard
                    onKnee = {this.kneeCard}
                    card={c}
                    key={c.id}
                    owner={this.props.owner}
                    onDiscard={() =>
                      this.discardCard(c.id, FROMARRAY.Chars)
                    }
                    onKill={() => this.killChar(c.id)}
                    onShowCardInfo={this.showCardInfo}
                    isChar={true}
                    onReturnToHand={() =>
                      this.returnToHand(c.id, FROMARRAY.Chars)
                    }
                    handleAttachment={this.attachmentAction}
                  ></PlayedCard>
                ))}
              </Row>
              <Row>
                {this.state.places.map((c) => (
                  <PlayedCard
                    onKnee = {this.kneeCard}
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
