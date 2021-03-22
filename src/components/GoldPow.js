import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const GoldPow = (props) => {

  const gold = props.gold;
  const power = props.power;
  // const [gold, setGold] = useState(0);
  // const [power, setPower] = useState(0);
  return (
    <Col sm={3} className='pile-card'>
      <div className='py-1 px-1 mb-2' style={{ border: '1px solid black', width: '100%' }}>
        <p style={{ fontWeight: 'bold' }}>{`ORO: x${gold}`}</p>
        <Row className='justify-content-around' hidden={!props.owner}>
          <Button variant='secondary' onClick={() => {if(gold) props.setGoldPow(gold - 1,power)}}>-</Button>

          <Button variant='warning' onClick={() => props.setGoldPow(gold + 1,power)}>+</Button>
        </Row>
      </div>
      <div className='py-1 px-1' style={{ border: '1px solid black', width: '100%' }}>

        <p style={{ fontWeight: 'bold' }}>{`POW: x${power}`}</p>
        <Row className='justify-content-around' hidden={!props.owner}>
          <Button variant='secondary' onClick={() => {if(power) props.setGoldPow(gold,power - 1)}}>-</Button>
          <Button variant='primary' onClick={() => props.setGoldPow(gold,power + 1)}>+</Button>
        </Row>
      </div>
    </Col>
  );
}

export default GoldPow;