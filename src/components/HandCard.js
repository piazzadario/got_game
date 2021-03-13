import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';


const HandCard = (props) => {

    const id = props.id;
    const isHidden = props.hidden;

    const [isMenuVisible, setVisible] = useState(false);
    return (
        <>
            <div onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
                <img src={isHidden ? 'https://www.picclickimg.com/d/l400/pict/383447897333_/A-Game-Of-Thrones-LCG-2nd-Edition.jpg' : `https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${id}.jpg`}
                    style={{ zIndex: '2' }} alt='teste'></img>
                {isMenuVisible && <Col style={{ position: 'absolute', top: '10%', left: '70%', zIndex: '3', width: '100%' }}>
                    <Col className='mb-1'>
                        <Button variant='success' onClick={props.onPlayCard}>PLAY</Button>
                    </Col>
                    <Col >
                        <Button variant='danger' onClick={props.onDiscard}>DISCARD</Button>
                    </Col>
                    <Col>
                        <Button variant='secondary' onClick={props.onReturnToDeck}>TO DECK</Button>
                    </Col>
                </Col>}
            </div>
        </>
    );
}

export default HandCard;