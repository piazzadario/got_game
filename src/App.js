import React from 'react';
import './App.css';
import { Button, Col, Row } from 'react-bootstrap';
import { Switch } from 'react-router';
import { withRouter, Route } from 'react-router-dom';
import HandCard from './components/HandCard';
import FactionCard from './components/FactionCard';
import Deck from './components/Deck';
import API from './api';
import CharacterCard from './components/CharacterCard';
import PlaceCard from './components/PlaceCard';
import Decks from './decks';
import GoldPow from './components/GoldPow';
import { HandContext } from './provider/HandContext';
import Hand from './components/Hand';
import AttachmentDialog from './components/AttachmentDialog';
import AddCardForm from './components/AddCardForm';
import SelectFaction from './components/SelectFaction';
import CardInfoDialog from './components/CardInfoDialog';
import Pile from './components/Pile';

const DEBUG = true;

const AttachmentAction = {
  Discard: 'discard',
  ToHand: 'toHand'
}


const TYPES = {
  'Character': 'character',
  'Location': 'location',
  'Attachment': 'attachment',
  'Plot': 'plot',
  'Event': 'event'
}

const FROMARRAY = {
  'Deck': 'deck',
  'Hand': 'hand',
  'Chars': 'chars',
  'Places': 'places',
  'Discarded': 'discardedList',
  'Deads': 'deadList'
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hand: DEBUG ? [197,182, 183, 184] : [],
      // hand: [182, 183, 184],
      deck: DEBUG ? Decks.LanTyr.cards : [],
      // deck: Decks.LanTyr.cards,
      discardedList: DEBUG? [179,180] : [],
      deadList: DEBUG? [91,98] : [],
      plotsHand: DEBUG? Decks.LanTyr.plots  :[],
      pastPlots: DEBUG? [2,3]: [],
      chars: DEBUG ?
        [{ charId: '91', attachments: ['33', '191'] },
        { charId: '84', attachments: [] },
        { charId: '187', attachments: [] },
        { charId: '188', attachments: [] },
        { charId: '94', attachments: [] },
        { charId: '95', attachments: [] }] : [],
      places: DEBUG? [97,98]:[],
      golds: 0,
      power: 0,
      modalList: FROMARRAY.Discarded,
      faction: DEBUG ? 'LanTyr' : null,
      // faction: 'lan',
      eventDialogCard: null,
      attachmentCard: null,
      infoCard: null
    }
  }

  showCardInfo = (id) => {
    this.setState({ infoCard: id })
  }

  addCard = () => {
    this.setState(state => {
      let id = state.cards.length + 1;
      const cardsList = state.cards.concat(id)
      return { cards: cardsList };
    }, () => localStorage.setItem('hand', this.state.hand));

  }


  discardCard = (id, from) => {

    console.log(id)
    if (from !== FROMARRAY.Chars) {
      this.setState(state => {
        let discarded = state.discardedList.concat(id);
        let indexOfDiscarded = state[from].indexOf(id)
        let newList = [...state[from]];
        newList.splice(indexOfDiscarded, 1)
        return { [from]: newList, discardedList: discarded }
      }, () => localStorage.setItem('hand', this.state.hand))
    } else {
      this.setState(state => {
        console.log(id)
        let discarded = state.discardedList.concat(id);
        let indexOfDiscarded = state.chars.map(c => c.charId).indexOf(id)
        let newList = [...state.chars];
        newList.splice(indexOfDiscarded, 1)
        return { chars: newList, discardedList: discarded }
      }, () => localStorage.setItem('hand', this.state.hand))
    }
  }

  killChar = (id) => {
    this.setState(state => {
      let deads = state.deadList.concat(id);
      let indexOfKilled = state.chars.map(c => c.charId).indexOf(id)
      let newChars = [...state.chars];
      newChars.splice(indexOfKilled, 1)
      return { chars: newChars, deadList: deads }
    })
  }

  drawCard = () => {

    this.setState(state => {
      let tmpDeck = [...state.deck];
      let drawnCard = tmpDeck.pop();
      let newHand = state.hand.concat(drawnCard);
      console.log(state.deck.length, tmpDeck.length)
      return { hand: newHand, deck: tmpDeck }
    }, () => localStorage.setItem('hand', this.state.hand))
  }



  onPlayCard = async (id) => {
    console.log(id)
    let card = await API.getCardData(id);
    if (card.type_code === TYPES.Character) {
      this.setState(state => {
        let newCharsList = state.chars.concat({ charId: id, attachments: [] });
        let indexOfDiscarded = state.hand.indexOf(id)
        let newHand = [...state.hand];
        newHand.splice(indexOfDiscarded, 1)
        return { hand: newHand, chars: newCharsList }
      }, () => localStorage.setItem('hand', this.state.hand))
    } if (card.type_code === TYPES.Location) {
      this.setState(state => {
        let newPlacesList = state.places.concat(id);
        let indexOfDiscarded = state.hand.indexOf(id)
        let newHand = [...state.hand];
        newHand.splice(indexOfDiscarded, 1)
        return { hand: newHand, places: newPlacesList }
      }, () => localStorage.setItem('hand', this.state.hand))
    }
    if (card.type_code === TYPES.Plot) {
      this.setState(state => {
        let newPastPlotsList = state.pastPlots.concat(id);
        let indexOfDiscarded = state.plotsHand.indexOf(id)
        let newPlotsHand = [...state.plotsHand];
        newPlotsHand.splice(indexOfDiscarded, 1)
        return { plotsHand: newPlotsHand, pastPlots: newPastPlotsList }
      }, () => localStorage.setItem('hand', this.state.hand))
    }
    if (card.type_code === TYPES.Event) {
      this.setState({ eventDialogCard: id })
    }
    if (card.type_code === TYPES.Attachment) {
      this.setState({ attachmentCard: id })
    }
  }

  handleEventCard = (id) => {
    this.discardCard(id, FROMARRAY.Hand);
    this.setState({ eventDialogCard: null })
  }

  handleAttachmentDialog = (attachmentId, targetId) => {
    const attachmentCard = this.state.attachmentCard
    if (!targetId) {
      this.setState({ attachmentCard: null })
    } else {
      let chars = [...this.state.chars]
      let targetIndex = chars.map(c => c.charId).indexOf(targetId);
      // console.log(targetIndex)
      if (!chars[targetIndex].attachments) {
        chars[targetIndex].attachments = [attachmentCard]
      } else {
        let newAttachmentsList = chars[targetIndex].attachments.concat(attachmentCard)
        chars[targetIndex].attachments = newAttachmentsList
      }
      let newHand = [...this.state.hand];
      let indexOfPlayed = this.state.hand.indexOf(attachmentId)
      newHand.splice(indexOfPlayed, 1)
      this.setState({ attachmentCard: null, chars: chars, hand: newHand }, () => localStorage.setItem('hand', this.state.hand))
    }
  }

  attachmentAction = (attachmentId, charId, action) => {
    this.setState(state => {
      // update status of characters
      let indexOfChar = state.chars.map(c => c.charId).indexOf(charId)
      let char = state.chars.find(c => c.charId === charId)
      let newAttachmentsList = [...char.attachments].filter(a => a !== attachmentId);
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
    })
  }

  returnToHand = (id, from) => {
    this.setState(state => {
      let newHand = state.hand.concat(id);
      let indexOfReturned = (from === FROMARRAY.Chars) ? state.chars.map(c => c.charId).indexOf(id) : state[from].indexOf(id)
      let newList = [...state[from]];
      newList.splice(indexOfReturned, 1)
      return { [from]: newList, hand: newHand }
    }, () => localStorage.setItem('hand', this.state.hand))
  }

  returnToDeck = (id) => {
    this.setState(state => {
      let newDeck = state.deck.concat(id);
      let indexOfDiscarded = state.hand.indexOf(id)
      let newHand = [...state.hand];
      newHand.splice(indexOfDiscarded, 1)
      return { hand: newHand, deck: newDeck }
    }, () => localStorage.setItem('hand', this.state.hand))
  }

  addCardToHand = (id) => {
    this.setState(state => {
      let newHand = state.hand.concat(id);
      return { hand: newHand }
    }, () => localStorage.setItem('hand', this.state.hand))
  }

  selectFaction = (faction) => {
    this.setState({ faction: faction, deck: shuffle(Decks[faction].cards), plotsHand: Decks[faction].plots })
  }

  returnToPlots = (id) => {
    this.setState(state => {
      let newPlotsHand = state.plotsHand.concat(id);
      let indexOfReturned = state.pastPlots.indexOf(id);
      let newList = [...state.pastPlots];
      newList.splice(indexOfReturned, 1)
      return { pastPlots: newList, plotsHand: newPlotsHand }
    })
  }

  shuffleHand= () => {
    this.setState({hand: shuffle(this.state.hand)},()=>localStorage.setItem('hand', this.state.hand))
  }

  render() {
    const value = {
      hand: this.state.hand,
      returnToHand: this.returnToHand,
      playPlot: this.onPlayCard,
      addAttachment: this.handleAttachmentDialog,
      returnToPlots: this.returnToPlots

    }

    return (
      <HandContext.Provider value={value}>
        <Switch>
          <Route exact path='/'>

            {this.state.faction ? <div className='m-3'>
              <Row >
                <Col sm={7}>
                  <Row>
                    {this.state.chars.map(c =>
                      <CharacterCard card={c} key={c.charId}
                        onDiscard={() => this.discardCard(c.charId, FROMARRAY.Chars)}
                        onKill={() => this.killChar(c.charId)}
                        onShowCardInfo={this.showCardInfo}
                        isChar={true}
                        onReturnToHand={() => this.returnToHand(c.charId, FROMARRAY.Chars)}
                        handleAttachment={this.attachmentAction}>
                      </CharacterCard>)}
                  </Row>
                  <Row>
                    {this.state.places.map(c =>
                        <CharacterCard card={c} key={c} 
                          isChar={false}
                          onDiscard={() => this.discardCard(c, FROMARRAY.Places)}
                          onShowCardInfo={this.showCardInfo}
                          onReturnToHand={() => this.returnToHand(c, FROMARRAY.Places)}>
                        </CharacterCard>)}
                  </Row>
                </Col>

                <Col sm={5}>
                  <Row >
                    <FactionCard faction={this.state.faction} />
                    <GoldPow />
                    <Pile items={this.state.pastPlots} listType={'Past plots'}/>
                  </Row>
                  <Row sm={6}>
                      <Deck cards={this.state.deck} drawCard={() => this.drawCard()} shuffle={() => this.setState({ deck: shuffle(this.state.deck) })}></Deck>
                      <Pile items={this.state.discardedList} listType={'Discarded'}/>
                      <Pile items={this.state.deadList} listType={'Dead'}></Pile>
                  </Row>
                </Col>
              </Row>
              <Col sm={10}>
              <Row className='align-items-center mb-1' style={{border: '2px solid black', display:'inline-flex'}}>
                <Col >
                  <Button variant='info' onClick={() => this.shuffleHand()}>{`SHUFFLE (${this.state.hand.length})`}</Button>
                </Col>
                <Col>
                  <Button variant='secondary' onClick={() => { localStorage.setItem('hand', this.state.hand); window.open('/hand') }}>{`SHOW (${this.state.hand.length})`}</Button>
                </Col>
                <AddCardForm onAddPressed={this.addCardToHand} />
              </Row>
              </Col>

              <Row>
                <Col  sm={9}>
                    <Row className='px-3'>
                      {this.state.hand.map((c, idx) =>
                        <Col className='handCard p-0' sm={2} key={c} >
                          <HandCard id={c} idx={idx + 1} hidden={true} onDiscard={() => this.discardCard(c, FROMARRAY.Hand)}
                            onPlayCard={() => this.onPlayCard(c)} onReturnToDeck={() => this.returnToDeck(c)}>

                          </HandCard>
                        </Col>)}
                    </Row>
                </Col>
                  <Pile items={this.state.plotsHand} listType={'Plots'}/>
              </Row>
            </div> :
              
              <SelectFaction onSelectFaction={this.selectFaction} />
            }

            <CardInfoDialog card={this.state.eventDialogCard} show={this.state.eventDialogCard !== null} type={'Event'} onHide={() => this.handleEventCard(this.state.eventDialogCard) } />
            <CardInfoDialog card={this.state.infoCard} show={this.state.infoCard !== null} type={'Card'} onHide={() =>  this.showCardInfo(null) } />
            <AttachmentDialog charactersList={this.state.chars} attachment={this.state.attachmentCard}
              onAttach={this.handleAttachmentDialog}
              show={this.state.attachmentCard !== null} onHide={() => { this.handleAttachmentDialog(null) }} />
          </Route>
          <Route exact path='/hand'>
            <Hand></Hand>
          </Route>
        </Switch>
      </HandContext.Provider >

    );
  }
}

export default withRouter(App);
