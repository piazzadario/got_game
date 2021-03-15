import React, { useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';

const AddCardForm = (props) => {

    const [cardId,setCardId] = useState(0);


    return (
        <Col sm={7}>
            <Form>
                <Row className='align-items-center'>
                    <Col>
                        <Form.Group >
                            <Form.Label>Add a card to hand:</Form.Label>
                            <Form.Control type='number' placeholder="ex. 167" value={cardId} onChange={(ev)=>setCardId(ev.target.value)} />
                        </Form.Group>
                    </Col>
                        <Button variant="primary m-2" onClick={()=>{props.onAddPressed(cardId); setCardId(0)}}>ADD</Button>
                </Row>
            </Form>
        </Col>
    );
}

export default AddCardForm;