import React from 'react';
import { Row, Button } from 'react-bootstrap';

interface WelcomeProps {
    onSelectFaction:Function
   }

   
const SelectFaction: React.FC<WelcomeProps>  = (props) => {
    return (
        <Row className='align-items-center justify-content-around' style={{ width: '100vw', height: '100vh' }}>
            <Button onClick={() => props.onSelectFaction('BarNig')}>Baratheon/Guardiani</Button>
            <Button onClick={() => props.onSelectFaction('StaGre')}>Stark/Greyjoy</Button>
            <Button onClick={() => props.onSelectFaction('LanTyr')}>Lannister/Tyrell</Button>
            <Button onClick={() => props.onSelectFaction('TarMar')}>Targaryen/Martell</Button>
        </Row>
    );
}

export default SelectFaction;