import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import '../custom.css';

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
        <Row>
            <div style={{ maxWidth: '100%', maxHeight: '100%', zIndex: '20' }} onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)} onClick={() => setKneed(!isKneed)}>
                <img src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${char.charId}.jpg`} className={isKneed ? 'kneed' : ''} style={{ maxWidth: '100%', maxHeight: '100%' }} alt='teste'></img>
                {isMenuVisible && <Col style={{ position: 'absolute', top: '10%', left: '30%', zIndex: '3', width: '100%' }}>
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
                <div   onMouseOver={() => { setAttachmentVisible(idx) }} onMouseLeave={() => setAttachmentVisible(-1)}
                style={{ position: 'absolute', minHeight: '100%', minWidth: '100%', top: `${idx * 20 + 20}%`, zIndex: `${attachmentVisible == idx ? '999' : (20 - idx - 1)}` }} >
                    <img key={idx} style={{ height: '100%', width: '100%' }}  
                        src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${a}.jpg`}
                        style={{
                            position: 'absolute', maxWidth: '100%', maxHeight: '100%',
                        }}
                        alt='teste'></img>
                    {attachmentVisible === idx  && <Col style={{ position: 'absolute', top: '10%', left: '30%', zIndex: '3',width: '100%' }}>
                            <Button className='mb-1' variant='secondary' onClick={()=>props.handleAttachment(a,char.charId,AttachmentAction.Discard)}>DISCARD</Button>
                            <Button variant='warning' onClick={()=>props.handleAttachment(a,char.charId,AttachmentAction.ToHand)}>HAND</Button>
                    </Col>}
                </div>
            )

            }
        </Row>
    );
}

export default CharacterCard;

/* <div style={{width: '100%'}} onClick={()=>setKneed(!isKneed)} >
            <img src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${id}.jpg`} className={isKneed? 'kneed': ''} style={{maxWidth: '100%', maxHeight:'100%'}} alt='teste'></img>
        </div> */