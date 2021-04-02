import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import AttachmentChar from './AttachmentChar';
import CharacterCard from '../common/Card/CharacterCard';
import AttachmentCard from '../common/Card/AttachmentCard';

interface AttachmentDialogProps {
    charactersList: CharacterCard[],
    attachment: AttachmentCard,
    onAttach: Function,
    onHide: Function,
    onShow: Function
}

const AttachmentDialog: React.FC<AttachmentDialogProps> = (props) => {
    const charactersList = props.charactersList;
    const attachmentId = props.attachment;
    const onAttach = props.onAttach;

    return (
        <Modal show={props.onShow} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Attachment info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${attachmentId}.jpg`} style={{ maxWidth: '100%', maxHeight: '100%' }} alt='teste'></img>
                {charactersList.map(c =>
                    <AttachmentChar key={c.id} id={c.id} onAttach={() => onAttach(attachmentId, c.id)} />
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.onHide()}>
                    Close
          </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AttachmentDialog;