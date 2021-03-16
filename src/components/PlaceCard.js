import React, { useState } from 'react';
import { Col, Button } from 'react-bootstrap';
import '../custom.css';

const PlaceCard = (props) => {

    const id = props.id;
    const [isKneed, setKneed] = useState(false);
    const [isMenuVisible, setVisible] = useState(false);

    return (
        <Col sm={3} >
        <div style={{ width: '100%' }} onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)} onClick={() => setKneed(!isKneed)}>
            <img src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${id}.jpg`} className={isKneed ? 'kneed' : ''} style={{ maxWidth: '100%', maxHeight: '100%', zIndex: '2' }} alt='teste'></img>
            {isMenuVisible && <div className='card-options'>
                    <Button variant='secondary' className='py-0 mb-1' onClick={props.onDiscard}>DISCARD</Button>
                    <Button variant='warning' className='py-0 mb-1' onClick={props.onReturnToHand}>HAND</Button>
                    <Button variant='success' className='py-0' onClick={(ev)=>{props.onShowCardInfo(id);ev.stopPropagation()}}>INFO</Button>

            </div>}
        </div>
        </Col>
    );
}

export default PlaceCard;

/* <div style={{width: '100%'}} onClick={()=>setKneed(!isKneed)} >
            <img src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${id}.jpg`} className={isKneed? 'kneed': ''} style={{maxWidth: '100%', maxHeight:'100%'}} alt='teste'></img>
        </div> */