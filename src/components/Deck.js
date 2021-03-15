// https://www.picclickimg.com/d/l400/pict/383447897333_/A-Game-Of-Thrones-LCG-2nd-Edition.jpg

import React, { useState } from 'react';
import { Button, Col } from 'react-bootstrap';


const Deck = (props) => {

    const cards = props.cards;
    const length = cards.length;

    const [isMenuVisible, setMenuVisible] = useState(false);


    return (
        <Col sm={4}>
            <div className='m-1' onMouseOver={() => setMenuVisible(true)} onMouseLeave={() => setMenuVisible(false)} >
                <img style={{ maxWidth: '100%', maxHeight: '100%' }} onClick={() => props.drawCard()} src={`https://www.picclickimg.com/d/l400/pict/383447897333_/A-Game-Of-Thrones-LCG-2nd-Edition.jpg`} alt='teste'>
                </img>
                <p className="w3-badge w3-xxlarge w3-padding w3-green" style={{ position: 'absolute', right: '35%', top: '35%' }}>{length}</p>

                {isMenuVisible && <Button variant='secondary' style={{ position: 'absolute', top: '10%', left: '30%' }} onClick={props.shuffle}>SHUFFLE</Button>
                }
            </div>
        </Col>
    );
}

export default Deck;