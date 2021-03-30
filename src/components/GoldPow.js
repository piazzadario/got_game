import React from 'react';
import { Row, Button } from 'react-bootstrap';

const GoldPow = (props) => {

  const gold = props.gold;
  const power = props.power;
  // const [gold, setGold] = useState(0);
  // const [power, setPower] = useState(0);
  return (
    <div style={{position:'absolute',top:'0%', margin:'10% 10% 10% 10%'}} className='pile-card'>
      <div className='py-1 px-1 mb-1' style={{ border: '1px solid white', width: '100%', backgroundColor: '#c7a734',color:'white'}}>
        <p style={{ fontWeight: 'bold', width:'100%',minWidth:'100%' }}>{`ORO: x${gold}`}</p>
        <Row className='justify-content-around' hidden={!props.owner}>
          <Button variant='secondary' onClick={() => {if(gold) props.setGoldPow(gold - 1,power)}}>-</Button>

          <Button variant='warning' onClick={() => props.setGoldPow(gold + 1,power)}>+</Button>
        </Row>
      </div> 
      <div className='py-1 px-1 mb-1' style={{ border: '1px solid white', width: '100%', backgroundColor: '#2034b3',color:'white'}}>

        <p style={{ fontWeight: 'bold', width:'100%',minWidth:'100%'  }}>{`POW: x${power}`}</p>
        <Row className='justify-content-around' hidden={!props.owner}>
          <Button variant='secondary' onClick={() => {if(power) props.setGoldPow(gold,power - 1)}}>-</Button>
          <Button variant='primary' onClick={() => props.setGoldPow(gold,power + 1)}>+</Button>
        </Row>
      </div>
      <div className='py-1 px-1' style={{ border: '1px solid white', width: '100%', backgroundColor: '#6b3c05',color:'white'}} hidden={props.owner}>
        <p style={{ fontWeight: 'bold', width:'100%',minWidth:'100%'  }}>{`HAND: x${props.hand}`}</p>
      </div>
      </div>
  );
}

export default GoldPow;