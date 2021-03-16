import React, { useState } from 'react';
import { Col, Button } from 'react-bootstrap';
import ModalList from './ModalList';

const Pile = (props) => {

    const items = props.items;
    const length = items.length;
    const listType = props.listType;
    const lastid = items[length - 1]

    // handle modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <Col sm={listType==='Plots' ? 3: (listType==='Past plots'? 0: 4) }>
            {length > 0 ?
                <div className='m-1'>
                    <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${lastid}.jpg`} alt='teste'>

                    </img>
                    <p className="w3-badge w3-large w3-padding w3-blue" style={{ position: 'absolute', right: '15%', zIndex: '3' }}>{length}</p>
                    <Col style={{ position: 'absolute', bottom: '10%', zIndex: '3',alignItems:'center' }}>
                        <Button variant='primary' onClick={handleShow}>{`${listType.toUpperCase()} LIST`}</Button>
                    </Col>
                </div>
                : <div style={{ border: '2px dashed black', height: '100%', textAlign: 'center' }}>
                    <p style={{ position: 'relative', top: '50%' }}>{`NO ${listType.toUpperCase()} CARDS`}</p>
                </div>
            }
            <ModalList show={show} onHide={handleClose} items={items} listName={listType} />
        </Col>
    );
}

export default Pile;