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
        <Col className='pile-card' sm={listType==='Plots' ? 2: (listType==='Past plots'? 5: 4)} >
            {length > 0 ?
                <div className='m-1 px-1' style={{position:'relative',width:'100%'}}>
                    <img style={{width: '100%' }} src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT${lastid}.jpg`} alt='teste'>

                    </img>
                    <p className="w3-badge w3-large w3-padding w3-blue pile-counter" >{length}</p>
                        <Button variant='primary' onClick={handleShow} className='pile-action'>{`${listType.toUpperCase()}`}</Button>
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