import React, { useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';

const AddCardForm = (props) => {

    const [cardId,setCardId] = useState(0);


    return (
        <Col sm={9}>
            <Form>
                <Row className='align-items-center'>
                    <Col sm={3}>
                        <Form.Group >
                            <Form.Label>Add a card to hand:</Form.Label>
                            <Form.Control type='number' placeholder="ex. 167" value={cardId} onChange={(ev)=>setCardId(ev.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col sm={3}>
                        <Button variant="primary" onClick={()=>{props.onAddPressed(cardId); setCardId(0)}}>ADD</Button>
                    </Col>
                </Row>
            </Form>
        </Col>
    );
}

export default AddCardForm;