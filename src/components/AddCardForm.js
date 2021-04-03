import React, { useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';

const AddCardForm = (props) => {

    const [cardId,setCardId] = useState("01_001");


    return (
        <Col sm={6}>
            <Form>
                <Row className='align-items-center'>
                    <Col>
                        <Form.Group >
                            <Form.Label>Add a card to hand:</Form.Label>
                            <Form.Control  pattern={'^[0-9]{2}_[0-9]+$'} placeholder="ex. 01_12" value={cardId} onChange={(ev)=>setCardId(ev.target.value)} />
                        </Form.Group>
                    </Col>
                        <Button variant="primary m-2" onClick={()=>{props.onAddPressed(cardId); setCardId(0)}}>ADD</Button>
                </Row>
            </Form>
        </Col>
    );
}

export default AddCardForm;