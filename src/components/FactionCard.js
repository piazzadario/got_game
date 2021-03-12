import React from 'react';
// https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_198A.jpg --- from 198 to 205
const factionCodes = {
    bar: '198',
    gre: '199',
    lan: '200',
    mar: '201',
    nig: '202',
    sta: '203',
    tar: '204',
    tyr: '205'
};

const FactionCard = (props) => {

    const faction = props.faction;
    const code = factionCodes[faction];

    return (
        <div className='m-1'>
            <img style={{maxWidth: '65%', maxHeight:'100%'}} src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${code}A.jpg`} alt='teste'></img>
        </div>
    );
}

export default FactionCard;