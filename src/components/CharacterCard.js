import React, { useState } from 'react';
import { Col, Button, Row } from 'react-bootstrap';
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
    const [powerPoints, setPower] = useState(0);


    return (
        <Col sm={2} style={{ position: 'relative', display: 'table' }} className='mb-1'>
            <div onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)} onClick={() => setKneed(!isKneed)} style={{ position: 'relative', zIndex: '20' }}>
                <img src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${char.charId}.jpg`} className={isKneed ? 'kneed' : ''} style={{ maxWidth: '100%', maxHeight: '100%' }} alt='teste'></img>
                <Row className='mb-1 p-0' style={{ height: '35px', position: 'absolute', top: '0%', left: '40%', zIndex: '999'}}>
                    <Button variant='secondary' onClick={(ev) => {setPower(powerPoints - 1);ev.stopPropagation()}} hidden={!isMenuVisible}>-</Button>
                    <p className="w3-badge w3-large w3-blue" >{powerPoints}</p>
                    <Button variant='primary' onClick={(ev) => {setPower(powerPoints + 1);ev.stopPropagation()}} hidden={!isMenuVisible}>+</Button>
                </Row>
                {isMenuVisible &&
                    <Row className='justify-content-end justify-items-end' style={{ position: 'absolute', top: '30%', left: '50%', zIndex: '999', width: '100%' }}>

                        <Col >
                            <Button variant='secondary' className='px-2 py-0' onClick={props.onDiscard}>DISCARD</Button><br></br>
                            <Button variant='danger' className='px-2 py-0' onClick={props.onKill}>KILL</Button><br></br>
                            <Button variant='warning' className='px-2 py-0' onClick={props.onReturnToHand}>HAND</Button>
                            <Button variant='success' className='px-2 py-0' onClick={(ev)=>{props.onShowCardInfo(char.charId);ev.stopPropagation()}}>INFO</Button>
                        </Col>
                    </Row>}
            </div>

            {attachmentList.map((a, idx) =>
                <AttachedCard attachmentId={a} key={a} idx={idx}
                    onShowCardInfo={props.onShowCardInfo}
                    onDiscard={() => props.handleAttachment(a, char.charId, AttachmentAction.Discard)}
                    onToHand={() => props.handleAttachment(a, char.charId, AttachmentAction.ToHand)} />
            )

            }
        </Col>
    );
}

export default CharacterCard;
