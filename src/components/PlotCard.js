import React from 'react';
import {Col} from 'react-bootstrap';

const PlotCard = (props) => {

    const items = props.items;
    const length = items.length;

    const lastid = items[length - 1]

    return (
        <Col sm={5}>
            {length > 0 ? <div style={{ width: '100%' }}>
                <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${lastid}.jpg`} alt='teste'></img>
                <p className="w3-badge w3-large w3-padding w3-blue"  style={{ position: 'absolute',right:'5%', zIndex: '3' }}>{length}</p> 
            </div>
            : <div style={{ border: '2px dashed black', height: '100%', textAlign: 'center' }}>
            <p style={{ position: 'relative', top: '50%' }}>NO PLOTS PLAYED</p>
        </div>}
        </Col>
    );
}

export default PlotCard;