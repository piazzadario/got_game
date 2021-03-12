import React from 'react';
import {Badge} from 'react-bootstrap';

const PlotCard = (props) => {

    const items = props.items;
    const length = items.length;

    const lastid = items[length - 1]

    return (
        <>
            {length > 0 ? <div style={{ width: '100%' }}>
                <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${lastid}.jpg`} alt='teste'></img>
                <Badge style={{ position: 'absolute', top: '0', right: '0' }} variant='secondary' >{length}</Badge>
            </div>
            : <div style={{ border: '2px dashed black', height: '100%', textAlign: 'center' }}>
            <p style={{ position: 'relative', top: '50%' }}>NO PLOTS PLAYED</p>
        </div>}
        </>
    );
}

export default PlotCard;