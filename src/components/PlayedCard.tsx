import React, { useState } from 'react';
import { Col, Button, Row } from 'react-bootstrap';
import AttachmentCard from '../common/Card/AttachmentCard';
import Card from '../common/Card/Card';
import CharacterCard from '../common/Card/CharacterCard';
import '../custom.css';
import AttachedCard from './AttachedCard';

const AttachmentAction = {
    Discard: 'discard',
    ToHand: 'toHand'
}

interface PlayedCardProps {
    card: Card,
    onDiscard: Function,
    onKill: Function,
    onReturnToHand: Function,
    onShowCardInfo: Function,
    handleAttachment: Function,
    owner: boolean
}

const PlayedCard: React.FC<PlayedCardProps> = (props) => {

    const card = props.card;
    const id = card.id;
    const isCharacterCard = card instanceof CharacterCard;
    let attachmentList: AttachmentCard[] = [];
    if (card instanceof CharacterCard) {
        attachmentList = card.attachmentList;
    }
    const [isKneed, setKneed] = useState(false);
    const [isMenuVisible, setVisible] = useState(false);
    const [powerPoints, setPower] = useState(0);


    return (
        <Col sm={2} style={{ position: 'relative', display: 'table', width: '12.5%', maxWidth: '12.5%' }} className='mb-1 mx-2 px-0'>
            <div onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)} onClick={() => setKneed(!isKneed)} style={{ position: 'relative', zIndex: 20, width: '100%' }}>
                <img src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${id}.jpg`} className={isKneed ? 'kneed' : ''} style={{ maxWidth: '100%', maxHeight: '100%' }} alt='teste'></img>
                <Row className=' justify-content-center ml-0' style={{ height: '35px', width: '100%', position: 'absolute', top: '0%', zIndex: 999 }} >
                    <Button variant='secondary mr-1' onClick={(ev) => { if (powerPoints) setPower(powerPoints - 1); ev.stopPropagation() }} hidden={!isMenuVisible || !props.owner}>-</Button>
                    <p className="w3-badge w3-large w3-blue" >{powerPoints}</p>
                    <Button variant='primary ml-1' onClick={(ev) => { setPower(powerPoints + 1); ev.stopPropagation() }} hidden={!isMenuVisible || !props.owner}>+</Button>
                </Row>
                {isMenuVisible &&
                    <div className='card-options '>
                        <Button variant='secondary' className=' py-0 mb-1' onClick={() => props.onDiscard()} hidden={!props.owner}>DISCARD</Button>
                        <Button variant='danger' className=' py-0 mb-1' onClick={() => props.onKill()} hidden={!isCharacterCard || !props.owner}>KILL</Button>
                        <Button variant='warning' className=' py-0 mb-1' onClick={() => props.onReturnToHand()} hidden={!props.owner}>HAND</Button>
                        <Button variant='info' className=' py-0' onClick={(ev) => { props.onShowCardInfo(id); ev.stopPropagation() }} >INFO</Button>
                    </div>
                }
            </div>

            {isCharacterCard && attachmentList.map((a, idx) =>
                <AttachedCard attachmentId={a.id} key={a.id} idx={idx}
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