import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import '../custom.css';

const PlaceCard = (props) => {

    const id = props.id;
    const [isKneed, setKneed] = useState(false);
    const [isMenuVisible, setVisible] = useState(false);

    return (
        <div style={{ width: '100%' }} onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)} onClick={() => setKneed(!isKneed)}>
            <img src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${id}.jpg`} className={isKneed ? 'kneed' : ''} style={{ maxWidth: '100%', maxHeight: '100%', zIndex: '2' }} alt='teste'></img>
            {isMenuVisible && <Col style={{ position: 'absolute', top: '10%', left: '30%', zIndex: '3', width: '100%' }}>
                <Col className='mb-1' >
                    <Button variant='secondary' onClick={props.onDiscard}>DISCARD</Button>
                </Col>
                <Col>
                    <Button variant='warning' onClick={props.onReturnToHand}>HAND</Button>
                </Col>

            </Col>}
        </div>
    );
}

export default PlaceCard;

/* <div style={{width: '100%'}} onClick={()=>setKneed(!isKneed)} >
            <img src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${id}.jpg`} className={isKneed? 'kneed': ''} style={{maxWidth: '100%', maxHeight:'100%'}} alt='teste'></img>
        </div> */