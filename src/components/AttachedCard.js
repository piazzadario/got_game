import React, { useState } from 'react';
import {  Col, Button } from 'react-bootstrap';
import '../custom.css';


const AttachedCard = (props) => {

    const attachmentId = props.attachmentId;
    const [isKneed, setKneed] = useState(false);
    const idx =props.idx;
    const [attachmentVisible, setAttachmentVisible] = useState(false)

    return (
        <div onMouseOver={() => { setAttachmentVisible(true) }} onMouseLeave={() => setAttachmentVisible(false)} onClick={() => setKneed(!isKneed)}
            style={{ position: 'relative', marginTop: `${-80 + (idx * -1 - 1)}%`, zIndex: `${attachmentVisible ? '999' : (20 - idx - 1)}` }} >
            <img key={idx} style={{ height: '100%', width: '100%' }}
                className={isKneed ? 'kneed' : ''}
                src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${attachmentId}.jpg`}
                alt='teste'></img>
            {attachmentVisible  && <Col style={{ position: 'absolute', top: '10%', left: '40%', zIndex: '3', width: '100%' }}>
                <Button className='mb-1 px-2 py-0' variant='secondary' onClick={() => props.onDiscard()}>DISCARD</Button><br></br>
                <Button className='mb-1 px-2 py-0' variant='warning' onClick={() => props.onToHand()}>HAND</Button><br></br>
                <Button className='px-2 py-0' variant='success' onClick={(ev)=>{props.onShowCardInfo(attachmentId); ev.stopPropagation()}}>INFO</Button>
            </Col>}
        </div>
    );
}

export default AttachedCard;

