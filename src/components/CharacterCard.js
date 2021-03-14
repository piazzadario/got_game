import React, { useState } from 'react';
import {  Col, Button } from 'react-bootstrap';
import '../custom.css';
import AttachedCard from './AttachedCard';

const AttachmentAction = {
    Discard: 'discard',
    ToHand: 'toHand'
}

const CharacterCard = (props) => {

    const char = props.char;
    const attachmentList = char.attachments;
    const [isKneed, setKneed] = useState(false);
    const [isMenuVisible, setVisible] = useState(false);

    return (
        <Col sm={2} style={{position:'relative',display:'table'}} className='mb-1'>
            <div  onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)} onClick={() => setKneed(!isKneed)} style={{position:'relative', zIndex:'20'}}>
                <img src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${char.charId}.jpg`} className={isKneed ? 'kneed' : ''} style={{ maxWidth: '100%', maxHeight: '100%'}} alt='teste'></img>
                {isMenuVisible && <Col style={{ position: 'absolute', top: '10%', left: '30%', zIndex: '0', width: '100%' }}>
                    <Col className='mb-1'>
                        <Button variant='secondary' onClick={props.onDiscard}>DISCARD</Button>
                    </Col>
                    <Col className='mb-1'>
                        <Button variant='danger' onClick={props.onKill}>KILL</Button>
                    </Col>
                    <Col>
                        <Button variant='warning' onClick={props.onReturnToHand}>HAND</Button>
                    </Col>
                </Col>}
            </div> 
        
            {attachmentList.map((a, idx) =>
                <AttachedCard attachmentId={a} key={a} idx={idx} 
                    onDiscard={()=>props.handleAttachment(a, char.charId, AttachmentAction.Discard)}
                    onToHand={() => props.handleAttachment(a, char.charId, AttachmentAction.ToHand)}/>
            )

            }
        </Col>
    );
}

export default CharacterCard;
