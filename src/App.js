import React from 'react';
import './App.css';
import { Button, Col, Row } from 'react-bootstrap';
import CardItem from './components/PlaceCard';
import { Switch } from 'react-router';
import { withRouter, Route } from 'react-router-dom';
import HandCard from './components/HandCard';
import FactionCard from './components/FactionCard';
import PlotCard from './components/PlotCard';
import DiscardedList from './components/DiscardedList';
import DeadList from './components/DeadList';
import Deck from './components/Deck';
import API from './api';
import CharacterCard from './components/CharacterCard';
import PlaceCard from './components/PlaceCard';
import Decks from './decks';
import GoldPow from './components/GoldPow';
import { HandContext } from './provider/HandContext';
import ModalList from './components/ModalList';
import PlotList from './components/PlotList';


const TYPES = {
  'Character': 'character',
  'Location': 'location',
  'Attachment': 'attachment',
  'Plot': 'plot'
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
      hand: [],
      deck: null,
      discardedList: [],
      deadList: [],
      plotsHand: [],
      pastPlots: [],
      chars: [],
      places: [],
      golds: 0,
      power: 0,
      modalList: FROMARRAY.Discarded,
      faction: null
    }
  }

  /* componentDidMount() {
    this.setState({ deck: shuffle(this.state.deck) })
  } */

  addCard = () => {
    this.setState(state => {
      let id = state.cards.length + 1;
      const cardsList = state.cards.concat(id)
      return { cards: cardsList };
    });

  }


  discardCard = (id, from) => {
    this.setState(state => {
      let discarded = state.discardedList.concat(id);
      let indexOfDiscarded = state[from].indexOf(id)
      let newList = [...state[from]];
      newList.splice(indexOfDiscarded, 1)
      return { [from]: newList, discardedList: discarded }
    })
  }

  killChar = (id) => {
    this.setState(state => {
      let deads = state.deadList.concat(id);
      let indexOfKilled = state.chars.indexOf(id)
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
    })

  }

  onPlayCard = async (id) => {
    let card = await API.getCardData(id);
    console.log(card)
    if (card.type_code === TYPES.Character) {
      this.setState(state => {
        let newCharsList = state.chars.concat(id);
        let indexOfDiscarded = state.hand.indexOf(id)
        let newHand = [...state.hand];
        newHand.splice(indexOfDiscarded, 1)
        return { hand: newHand, chars: newCharsList }
      })
    } if (card.type_code === TYPES.Location) {
      this.setState(state => {
        let newPlacesList = state.places.concat(id);
        let indexOfDiscarded = state.hand.indexOf(id)
        let newHand = [...state.hand];
        newHand.splice(indexOfDiscarded, 1)
        return { hand: newHand, places: newPlacesList }
      })
    }
    if (card.type_code === TYPES.Plot) {
      this.setState(state => {
        let newPastPlotsList = state.pastPlots.concat(id);
        let indexOfDiscarded = state.plotsHand.indexOf(id)
        let newPlotsHand = [...state.plotsHand];
        newPlotsHand.splice(indexOfDiscarded, 1)
        return { plotsHand: newPlotsHand, pastPlots: newPastPlotsList }
      })
    }
  }

  returnToHand = (id, from) => {
    this.setState(state => {
      let newHand = state.hand.concat(id);
      let indexOfDiscarded = state[from].indexOf(id)
      let newList = [...state[from]];
      newList.splice(indexOfDiscarded, 1)
      return { [from]: newList, hand: newHand }
    })
  }

  render() {

    const value = {
      hand: this.state.hand,
      returnToHand: this.returnToHand,
      playPlot: this.onPlayCard
    }

    return (
      <HandContext.Provider value={value}>
        {this.state.faction ? <div className='p-3'>
          <Row >
            <Col sm={7}>
              <Row >
                {this.state.chars.length >= 0 &&
                  this.state.chars.map(c =>
                    <Col sm={3} key={c}>
                      <CharacterCard id={c}
                        onDiscard={() => this.discardCard(c, FROMARRAY.Chars)}
                        onKill={() => this.killChar(c)}
                        onReturnToHand={() => this.returnToHand(c, FROMARRAY.Chars)}>
                      </CharacterCard>

                    </Col>)}
              </Row>
              <Row>
                {this.state.places.length >= 0 &&
                  this.state.places.map(c =>
                    <Col sm={3} key={c}>
                      <PlaceCard id={c}
                        onDiscard={() => this.discardCard(c, FROMARRAY.Places)}
                        onReturnToHand={() => this.returnToHand(c, FROMARRAY.Places)}>
                      </PlaceCard>

                    </Col>)}
              </Row>
            </Col>

            <Col sm={5}>
              <Row >
                <Col sm={5}>
                  <FactionCard faction={this.state.faction}></FactionCard>
                </Col>
                <GoldPow></GoldPow>
                <Col sm={5}>
                  <PlotCard items={this.state.pastPlots}></PlotCard>
                </Col>
              </Row>
              <Row sm={6}>
                <Col sm={4}>
                  <Deck cards={this.state.deck} drawCard={() => this.drawCard()}></Deck>
                </Col>
                <Col sm={4}>
                  <DiscardedList items={this.state.discardedList}
                  ></DiscardedList>
                </Col>
                <Col sm={4}>
                  <DeadList items={this.state.deadList}></DeadList>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>

            <Col sm={8}>
              {this.state.hand.length !== 0 &&
                this.state.hand.map(c =>
                  <Col className='handCard' sm={1} key={c}>
                    <HandCard id={c} onDiscard={() => this.discardCard(c, FROMARRAY.Hand)} onPlayCard={() => this.onPlayCard(c)}>
                    </HandCard>

                  </Col>)}
            </Col>
            <Col>
              <PlotList items={this.state.plotsHand}/>
            </Col>
          </Row>
        </div> :
          <Row className='align-items-center justify-content-around' style={{ width: '100vw', height: '100vh' }}>
            <Button onClick={() => this.setState({ faction: 'bar', deck: shuffle(Decks.BarNig.cards), plotsHand: Decks.BarNig.plots })}>Baratheon/Guardiani</Button>
            <Button onClick={() => this.setState({ faction: 'sta', deck: shuffle(Decks.StaGre.cards), plotsHand: Decks.StaGre.plots })}>Stark/Greyjoy</Button>
            <Button onClick={() => this.setState({ faction: 'lan', deck: shuffle(Decks.LanTyr.cards), plotsHand: Decks.LanTyr.plots })}>Lannister/Tyrell</Button>
            <Button onClick={() => this.setState({ faction: 'tar', deck: shuffle(Decks.TarMar.cards), plotsHand: Decks.TarMar.plots })}>Targaryen/Martell</Button>
          </Row>
        }
      </HandContext.Provider >

    );
  }
}

export default withRouter(App);
