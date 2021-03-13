import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import '../custom.css';
import { HandContext } from '../provider/HandContext';


const AttachmentChar = (props) => {

    const id = props.id;
    const [isMenuVisible, setVisible] = useState(false);


    return (
        <HandContext.Consumer>

            {(context) =>
                <Row onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)} className='align-items-center'>

                    <img src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT01_${id}.jpg`} style={{ zIndex: '2' }} alt='teste'></img>
                    {isMenuVisible &&
                        <Button className='ml-1' variant='warning' style={{ maxHeight: '100px' }} 
                        onClick={()=>context.addAttachment(id)}>ATTACH</Button>
                    }
                </Row>}
        </HandContext.Consumer>
    );
}

export default AttachmentChar;