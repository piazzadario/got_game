import React, { useState } from "react";
import { Button} from "react-bootstrap";

const HandCard = (props) => {
  const id = props.id;
  const isHidden = props.hidden;

  const [isMenuVisible, setVisible] = useState(false);
  return (
    <div
      onMouseOver={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="mx-1"
    >
      <img
        src={
          isHidden
            ? "https://www.picclickimg.com/d/l400/pict/383447897333_/A-Game-Of-Thrones-LCG-2nd-Edition.jpg"
            : `https://lcg-cdn.fantasyflightgames.com/got2nd/GT${id}.jpg`
        }
        className={isHidden ? "card-img" : ""}
        style={{ zIndex: "2", maxWidth: "100%", maxHeight: "100%" }}
        alt="teste"
      ></img>
      <p
        className="w3-badge w3-large w3-padding w3-yellow deck-badge"
        style={{ zIndex: "3" }}
      >
        {props.idx}
      </p>
      {isMenuVisible && !isHidden && (
        <div className="card-options ">
          <Button variant='success' className='py-0 mb-1' onClick={props.onPlayCard}>PLAY</Button>
          <Button variant='danger' className='py-0 mb-1' onClick={props.onDiscard}>DISCARD</Button>
          <Button variant='secondary' className='py-0 mb-1' onClick={props.onReturnToDeck}>TO DECK</Button>
          <Button
            variant="info"
            className=" py-0"
            onClick={props.onShowInfo}
          >
            INFO
          </Button>
        </div>
      )}
    </div>
  );
};

export default HandCard;

/* 

<div className='card-options '>
                            <Button variant='secondary' className=' py-0 mb-1' onClick={props.onDiscard} hidden={!props.owner}>DISCARD</Button>
                            <Button variant='danger' className=' py-0 mb-1' onClick={props.onKill} hidden={!isChar || !props.owner}>KILL</Button>
                            <Button variant='warning' className=' py-0 mb-1' onClick={props.onReturnToHand} hidden={!props.owner}>HAND</Button>
                            <Button variant='success' className=' py-0' onClick={(ev) => { props.onShowCardInfo(id); ev.stopPropagation() }} >INFO</Button>
                        </div>
                        */

/* 
                        <Col style={{ position: 'absolute', top: '20%', zIndex: '3', width: '100%' }}>
                    <Col className='mb-1'>
                        <Button variant='success' onClick={props.onPlayCard}>PLAY</Button>
                    </Col>
                    <Col >
                        <Button variant='danger' className='mb-1' onClick={props.onDiscard}>DISCARD</Button>
                    </Col>
                    <Col>
                        <Button variant='secondary' onClick={props.onReturnToDeck}>TO DECK</Button>
                    </Col>
                    <Button variant='success' className=' py-0' onClick={props.onShowInfo} >INFO</Button>
                </Col>
                 */
