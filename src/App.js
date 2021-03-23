import React from 'react';
import './App.css';
import { Switch } from 'react-router';
import { withRouter, Route } from 'react-router-dom';
import { HandContext } from './provider/HandContext';
import Hand from './components/Hand';
import SelectFaction from './components/SelectFaction';
import { DEBUG, debugState, Decks, shuffle } from './common/constants';
import Board from './components/Board';
import State from './common/State';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = DEBUG ? { me: debugState, opponent: debugState } : { me: new State(), opponent:new State() }
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

  shuffleHand = () => {
    this.setState({ hand: shuffle(this.state.hand) }, () => localStorage.setItem('hand', this.state.hand))
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
            {this.state.faction ? <div className='mx-3 my-1'>
              <Board boardState={this.state.opponent} owner={false} />
              <hr style={{borderTop: '3px solid black'}}></hr>
              <Board boardState={this.state.me} owner={true} />
            </div> :
              <SelectFaction onSelectFaction={this.selectFaction} />
            }
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
