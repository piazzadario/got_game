// https://www.picclickimg.com/d/l400/pict/383447897333_/A-Game-Of-Thrones-LCG-2nd-Edition.jpg

import React from 'react';
import { Badge, Button } from 'react-bootstrap';


const Deck = (props) => {

    const cards = props.cards;
    const length = cards.length;


    return (
        <div className='m-1' >
            <img style={{ maxWidth: '100%', maxHeight: '100%' }} onClick={()=>props.drawCard()} src={`https://www.picclickimg.com/d/l400/pict/383447897333_/A-Game-Of-Thrones-LCG-2nd-Edition.jpg`} alt='teste'>

            </img>
            <Badge style={{ position: 'absolute', top: '50%', left: '50%' }} variant='danger' >{length}</Badge>
        </div>
    );
}

export default Deck;