import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Card from '../common/Card/Card';

interface CardInfoDialogProps {
    card: Card,
    show: Function,
    onHide: Function
}
const CardInfoDialog: React.FC<CardInfoDialogProps> = (props) => {

    const id = props.card;
    const type = 'character';//props.card;

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{type + ' info'}</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <img src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${id}.jpg`} alt='teste'></img>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.onHide()}>
                    Close
          </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CardInfoDialog;