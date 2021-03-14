import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
// https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_198A.jpg --- from 198 to 205
const factionCodes = {
    BarNig: '198',
    // gre: '199',
    LanTyr: '200',
    // mar: '201',
    // nig: '202',
    StaGre: '203',
    TarMar: '204',
    // tyr: '205'
};

const FactionCard = (props) => {

    const faction = props.faction;
    const code = factionCodes[faction];
    const [isKneed, setKneed] = useState(false);

    return (
        <Col sm={5} >
            <div className='m-1' onClick={() => setKneed(!isKneed)}>
                <img style={{ maxWidth: '65%', maxHeight: '100%' }} className={isKneed ? 'kneed' : ''} src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${code}A.jpg`} alt='teste'></img>
            </div>
        </Col>
    );
}

export default FactionCard;