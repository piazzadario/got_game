import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import HandCard from './HandCard';

 
class Hand extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            hand: []
        }
    }

    componentDidMount(){
        const newHand = localStorage.getItem('hand').split(',') || []
        this.setState({hand: newHand});
    }

    render(){
        return (
            <Col sm={10}>
                <Row>
                    {this.state.hand.map((c,idx) =>
                        <Col className='handCard' sm={2} key={c}>
                            <HandCard id={c} hidden={false} idx={idx+1}> 
                            </HandCard>
                        </Col>)}
                </Row>
            </Col>
        );
    }
}

export default Hand;