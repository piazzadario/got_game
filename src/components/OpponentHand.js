import React from "react";
import { Row } from "react-bootstrap";

const OpponentHand = (props) => {
  return (
    <Row className="justify-content-center mb-1">
      {props.hand.map((c, idx) => (
        <div>
          <img
            src="https://www.picclickimg.com/d/l400/pict/383447897333_/A-Game-Of-Thrones-LCG-2nd-Edition.jpg"
            alt="hidden-card"
            style={{ height: "15vh" }}
          ></img>
          <p
            className="w3-badge w3-medium w3-padding w3-yellow "
            style={{ zIndex: "3", position: "relative", right: '50%' }}
          >
            {idx+1}
          </p>
        </div>
      ))}
    </Row>
  );
};

export default OpponentHand;
