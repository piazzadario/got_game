import React,{useState} from 'react';
import { Badge,Col,Button } from 'react-bootstrap';
import ModalList from './ModalList';

const PlotList = (props) => {

    const items = props.items;
    const length = items.length;

    const lastid = items[length - 1]

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {length > 0 ?
                <div className='m-1'>
                    <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${lastid}.jpg`} alt='teste'>

                    </img>
                    <Badge style={{ position: 'absolute', top: '0', right: '0' }} variant='secondary' >{length}</Badge>
                    {items.length > 0 && <Col style={{ position: 'absolute', top: '10%', left: '10%', zIndex: '3', width: '100%' }}>
                        <Col >
                            <Button variant='primary' onClick={handleShow}>SHOW LIST</Button>
                        </Col>

                    </Col>}
                </div>
                : <div style={{ border: '2px dashed black', height: '100%', textAlign: 'center' }}>
                    <p style={{ position: 'relative', top: '50%' }}>NO PLOT LEFT</p>
                </div>
            }
            <ModalList show={show} onHide={handleClose} items={items} listName={'Plots'} />
        </>
    );
}

export default PlotList;