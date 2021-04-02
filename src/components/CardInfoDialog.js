import React from 'react';
import {Modal,Button} from 'react-bootstrap';

const CardInfoDialog = (props) => {

    const id = props.card;
    const type = props.type;

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{type + ' info'}</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <img src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT${id}.jpg`} alt='teste'></img>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
          </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CardInfoDialog;