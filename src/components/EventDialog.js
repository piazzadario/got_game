import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';


const EventDialog = (props) => {
    const id = props.card;


    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Event info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${id}.jpg`} style={{ maxWidth: '100%', maxHeight: '100%', zIndex: '2' }} alt='teste'></img>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
          </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EventDialog;