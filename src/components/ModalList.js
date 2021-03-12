import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import ListCard from './ListCard';

const mapListName = (name) => {
    if(name === 'Discarded') return 'discadedList'
    if(name === 'Plots') return 'plotsHand'
    else if (name === 'Dead') return 'deadList'
}

const ModalList = (props) => {
    const items = props.items;
    const lenght = items.lenght;

    let FROM = mapListName(props.listName);

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{`${props.listName} list`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {items.map(c => <ListCard id={c} fromArray={FROM}></ListCard>)}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
          </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalList;