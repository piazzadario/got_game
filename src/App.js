import React from "react";
import "./App.css";
import { withRouter } from "react-router-dom";
import { DEBUG, debugState} from "./common/Utility/constants";
import Board from "./components/Board";
import State from "./common/State";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEBUG
      ? { me: debugState, opponent: debugState }
      : { me: new State(), opponent: new State() };
  }

  render() {
    return (
      <>
        <Board boardState={this.state.opponent} owner={false} />
        <hr style={{ borderTop: "3px solid black" }}></hr>
        <Board boardState={this.state.me} owner={true} />
      </>
    );
  }
}

export default withRouter(App);
