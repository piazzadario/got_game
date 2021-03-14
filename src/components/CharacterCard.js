import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
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
    const [attachmentVisible, setAttachmentVisible] = useState(-1)

    return (
        <Col sm={2} style={{position:'relative',display:'table'}} className='mb-1'>
            {/* <div style={{ maxWidth: '100%', maxHeight: '100%', zIndex: '20' }} onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)} onClick={() => setKneed(!isKneed)}> */}
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
            {/* {attachmentList.map((a, idx) =>
                <div onMouseOver={() => { setAttachmentVisible(idx) }} onMouseLeave={() => setAttachmentVisible(-1)}
                    style={{ position:'relative',marginTop:  `${-80+(idx * -1-1)}%` , zIndex: `${attachmentVisible == idx ? '999' : (20-idx-1)}` }} >
                    <img key={idx} style={{ height: '100%', width: '100%' }}
                        src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${a}.jpg`}
                        style={{ maxWidth: '100%', maxHeight: '100%'}}
                        alt='teste'></img>
                    {attachmentVisible === idx && <Col style={{ position: 'absolute', top: '10%', left: '30%', zIndex: '3', width: '100%' }}>
                        <Button className='mb-1' variant='secondary' onClick={() => props.handleAttachment(a, char.charId, AttachmentAction.Discard)}>DISCARD</Button>
                        <Button variant='warning' onClick={() => props.handleAttachment(a, char.charId, AttachmentAction.ToHand)}>HAND</Button>
                    </Col>}
                </div>
            )

            } */}
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

/* <div style={{width: '100%'}} onClick={()=>setKneed(!isKneed)} >
            <img src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${id}.jpg`} className={isKneed? 'kneed': ''} style={{maxWidth: '100%', maxHeight:'100%'}} alt='teste'></img>
        </div> */