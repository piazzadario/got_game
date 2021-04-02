import React, { useState } from 'react';
import {  Button } from 'react-bootstrap';
import '../custom.css';


const AttachedCard = (props) => {

    const attachmentId = props.attachmentId;
    const [isKneed, setKneed] = useState(false);
    const idx =props.idx;
    const [attachmentVisible, setAttachmentVisible] = useState(false)

    return (
        <div onMouseOver={() => { setAttachmentVisible(true) }} onMouseLeave={() => setAttachmentVisible(false)} onClick={() => props.onKnee}
            style={{ position: 'relative', marginTop: `${-110 + (idx * -1 - 1)}%`, zIndex: `${attachmentVisible ? '999' : (20 - idx - 1)}` }} >
            <img key={idx} style={{ height: '100%', width: '100%' }}
                className={isKneed ? 'kneed' : ''}
                src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT${attachmentId}.jpg`}
                alt='teste'></img>
            {attachmentVisible  && <div className='card-options'>
                <Button className='mb-1 px-2 py-0' variant='secondary' onClick={() => props.onDiscard()} hidden={!props.owner}>DISCARD</Button>
                <Button className='mb-1 px-2 py-0' variant='warning' onClick={() => props.onToHand()} hidden={!props.owner}>HAND</Button>
                <Button className='py-0' variant='success' onClick={(ev)=>{props.onShowCardInfo(attachmentId); ev.stopPropagation()}}>INFO</Button>
            </div>}
        </div>
    );
}

export default AttachedCard;

