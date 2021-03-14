import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const GoldPow = (props) => {

  const [gold, setGold] = useState(0);
  const [power, setPower] = useState(0);
  return (
    <Col sm={2}>
      <div className='py-1 px-1 mb-2' style={{ border: '1px solid black', width: '100%' }}>
        <p style={{ fontWeight: 'bold' }}>{`ORO: x${gold}`}</p>
        <Row className='justify-content-around'>
          <Button variant='secondary' onClick={() => setGold(gold - 1)}>-</Button>
          <Button variant='warning' onClick={() => setGold(gold + 1)}>+</Button>
        </Row>
      </div>
      <div className='py-1 px-1' style={{ border: '1px solid black', width: '100%' }}>

        <p style={{ fontWeight: 'bold' }}>{`POW: x${power}`}</p>
        <Row className='justify-content-around'>
          <Button variant='secondary' onClick={() => setPower(power - 1)}>-</Button>
          <Button variant='primary' onClick={() => setPower(power + 1)}>+</Button>
        </Row>
      </div>
    </Col>
  );
}

export default GoldPow;