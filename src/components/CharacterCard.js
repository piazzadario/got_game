import React, { useState } from 'react';
import { Col, Button, Row } from 'react-bootstrap';
import '../custom.css';
import AttachedCard from './AttachedCard';

const AttachmentAction = {
    Discard: 'discard',
    ToHand: 'toHand'
}

const CharacterCard = (props) => {

    const card = props.card;
    const isChar = props.isChar;
    const id = isChar? card.charId : card;
    const attachmentList = isChar? card.attachments : [];
    const [isKneed, setKneed] = useState(false);
    const [isMenuVisible, setVisible] = useState(false);
    const [powerPoints, setPower] = useState(0);


    return (
        <Col sm={3} style={{ position: 'relative', display: 'table' }} className='mb-1'>
            <div onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)} onClick={() => setKneed(!isKneed)} style={{ position: 'relative', zIndex: '20', width:'100%'}}>
                <img src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${id}.jpg`} className={isKneed ? 'kneed' : ''} style={{ maxWidth: '100%', maxHeight: '100%' }} alt='teste'></img>
                <Row className=' justify-content-center ml-0' style={{ height: '35px', width: '100%', position: 'absolute', top: '0%', zIndex: '999' }} >
                    <Button variant='secondary mr-1' onClick={(ev) => { if (powerPoints) setPower(powerPoints - 1); ev.stopPropagation() }} hidden={!isMenuVisible}>-</Button>
                    <p className="w3-badge w3-large w3-blue" >{powerPoints}</p>
                    <Button variant='primary ml-1' onClick={(ev) => { setPower(powerPoints + 1); ev.stopPropagation() }} hidden={!isMenuVisible}>+</Button>
                </Row>
                {isMenuVisible &&
                        <div className='card-options '>
                            <Button variant='secondary' className=' py-0 mb-1' onClick={props.onDiscard}>DISCARD</Button>
                            <Button variant='danger' className=' py-0 mb-1' onClick={props.onKill} hidden={!isChar}>KILL</Button>
                            <Button variant='warning' className=' py-0 mb-1' onClick={props.onReturnToHand}>HAND</Button>
                            <Button variant='success' className=' py-0' onClick={(ev) => { props.onShowCardInfo(id); ev.stopPropagation() }}>INFO</Button>
                        </div>
                }
            </div>

            {isChar && attachmentList.map((a, idx) =>
                <AttachedCard attachmentId={a} key={a} idx={idx}
                    onShowCardInfo={props.onShowCardInfo}
                    onDiscard={() => props.handleAttachment(a, id, AttachmentAction.Discard)}
                    onToHand={() => props.handleAttachment(a, id, AttachmentAction.ToHand)} />
            )

            }
        </Col>
    );
}

export default CharacterCard;
