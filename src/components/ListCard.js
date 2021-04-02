import React, { useState } from 'react';
import { Row, Button, Col } from 'react-bootstrap';
import '../custom.css';
import { HandContext } from '../provider/HandContext';

const ListCard = (props) => {

    const id = props.id;
    const [isMenuVisible, setVisible] = useState(false);
    const fromArray = props.fromArray


    return (
        <HandContext.Consumer>

            {(context) =>
                <Row onMouseOver={() => setVisible(true)} onMouseLeave={() => setVisible(false)} className='align-items-center pl-3 m-1'>
                    <Col sm={9}>
                        <img src={`https://lcg-cdn.fantasyflightgames.com/got2nd/GT{id}.jpg`} style={{ zIndex: '2', maxWidth: '100%' }} alt='teste'></img>
                    </Col>
                    {isMenuVisible &&
                        <Col sm={3}>
                            <Button  variant='warning' style={{ maxHeight: '100px', maxWidth: '100%' }}
                                onClick={() => {
                                    if (fromArray === 'plotsHand') return context.playPlot(id, fromArray);
                                    if (fromArray === 'pastPlots') return context.returnToPlots(id);
                                    else return context.returnToHand(id, fromArray)
                                }
                                }>{fromArray === 'plotsHand' ? 'PLAY' : 'TO HAND'}</Button>
                        </Col>
                    }
                </Row>}
        </HandContext.Consumer>
    );
}

export default ListCard;
