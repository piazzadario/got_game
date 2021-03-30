import React, { useState} from 'react';
import { Col, Button, Row, Card } from 'react-bootstrap';
import { FROMARRAY } from '../common/constants';
import '../custom.css';
import { HandContext } from '../provider/HandContext';

import AttachedCard from './AttachedCard';

const AttachmentAction = {
    Discard: 'discard',
    ToHand: 'toHand'
}

const PlayedCard = (props) => {

    const card = {...props.card};
    const powerPoints = card.powerPoints;
    const isChar = props.isChar;
    const from = isChar? FROMARRAY.Chars : FROMARRAY.Places;
    const id =  card.id;
    const attachmentList = isChar? card.attachments : [];
    // const [isKneed, setKneed] = useState(false);
    const [isMenuVisible, setVisible] = useState(false);
    // const [powerPoints, setPower] = useState(0);

    

    return (
        <Col sm={2} style={{ position: 'relative', display: 'table', width:'12.5%', maxWidth:'12.5%' }} className='mb-1 mx-2 px-0'>
            <div onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)} onClick={() => props.onKnee(card.id,from)} style={{ position: 'relative', zIndex: '20', width:'100%'}}>
                <img src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${id}.jpg`} className={card.isKneed ? 'kneed' : ''} style={{ maxWidth: '100%', maxHeight: '100%' }} alt='teste'></img>
                <Row className=' justify-content-center ml-0' style={{ height: '25px', width: '100%', position: 'absolute', top: '0%', zIndex: '999' }} >
                    <Button variant='secondary mr-1 ' onClick={(ev) => { if (powerPoints) props.handlePower(id,powerPoints-1,from); ev.stopPropagation() }} hidden={!isMenuVisible || !props.owner}>-</Button>
                    <p className="w3-badge w3-large w3-blue" >{powerPoints}</p>
                    <Button variant='primary ml-1  ' onClick={(ev) => {props.handlePower(id,powerPoints+1,from);ev.stopPropagation() }} hidden={!isMenuVisible || !props.owner}>+</Button>
                </Row>
                {isMenuVisible &&
                        <div className='card-options '>
                            <Button variant='secondary' className=' py-0 mb-1' onClick={(ev)=> {ev.stopPropagation(); props.onDiscard()}} hidden={!props.owner}>DISCARD</Button>
                            <Button variant='danger' className=' py-0 mb-1' onClick={(ev)=> {ev.stopPropagation(); props.onKill()}} hidden={!isChar || !props.owner}>KILL</Button>
                            <Button variant='warning' className=' py-0 mb-1' onClick={(ev)=> {ev.stopPropagation(); props.onReturnToHand()}} hidden={!props.owner}>HAND</Button>
                            <Button variant='info' className=' py-0' onClick={(ev) => { props.onShowCardInfo(id); ev.stopPropagation() }} >INFO</Button>
                        </div>
                }
            </div>

            {attachmentList.map((a, idx) =>
                <AttachedCard attachmentId={a} key={a} idx={idx}
                    onKnee = {()=>props.onKnee(a,from,id)}
                    owner={props.owner}
                    onShowCardInfo={props.onShowCardInfo}
                    onDiscard={() => props.handleAttachment(a, id, AttachmentAction.Discard)}
                    onToHand={() => props.handleAttachment(a, id, AttachmentAction.ToHand)} />
            )

            }
        </Col>
    );
}

export default PlayedCard;
