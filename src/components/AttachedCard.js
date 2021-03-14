import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import '../custom.css';

const AttachmentAction = {
    Discard: 'discard',
    ToHand: 'toHand'
}

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
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                alt='teste'></img>
            {attachmentVisible  && <Col style={{ position: 'absolute', top: '10%', left: '30%', zIndex: '3', width: '100%' }}>
                <Button className='mb-1' variant='secondary' onClick={() => props.onDiscard()}>DISCARD</Button>
                <Button variant='warning' onClick={() => props.onToHand()}>HAND</Button>
            </Col>}
        </div>
    );
}

export default AttachedCard;

