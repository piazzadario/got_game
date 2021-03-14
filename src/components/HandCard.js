import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';


const HandCard = (props) => {

    const id = props.id;
    const isHidden = props.hidden;

    const [isMenuVisible, setVisible] = useState(false);
    return (
        <Row>
            <div onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)} className={isHidden? 'hidden':''}>
                <img src={isHidden ? 'https://www.picclickimg.com/d/l400/pict/383447897333_/A-Game-Of-Thrones-LCG-2nd-Edition.jpg' : `https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${id}.jpg`}
                    className={isHidden? 'card-img':''}  style={{ zIndex: '2'}} alt='teste'></img>
                <p className="w3-badge w3-large w3-padding w3-red"  style={{ position: 'absolute',right:'5%', zIndex: '3' }}>{props.idx}</p> 
                {isMenuVisible && isHidden && <Col style={{ position: 'absolute', top: '20%', zIndex: '3', width: '100%' }}>
                    <Col className='mb-1'>
                        <Button variant='success' onClick={props.onPlayCard}>PLAY</Button>
                    </Col>
                    <Col >
                        <Button variant='danger' className='mb-1' onClick={props.onDiscard}>DISCARD</Button>
                    </Col>
                    <Col>
                        <Button variant='secondary' onClick={props.onReturnToDeck}>TO DECK</Button>
                    </Col>
                </Col>}
            </div>
        </Row>
    );
}

export default HandCard;