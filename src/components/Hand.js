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
            <>
        
                <Row>
                    {this.state.hand.map(c =>
                        <Col className='handCard' sm={1} key={c}>
                            <HandCard id={c} hidden={false}>
                            </HandCard>
                        </Col>)}
                </Row>
            </>
        );
    }
}

export default Hand;


/* const Hand = () => {
    const [hand, setHand] = useState(
        localStorage.getItem('hand').split(',') || []
    );

    useEffect(() => {
        localStorage.setItem('hand', hand);
    }, [hand]);


    return (
        <>
    
            <Row>
                {hand.map(c =>
                    <Col className='handCard' sm={1} key={c}>
                        <HandCard id={c} hidden={false}>
                        </HandCard>
                    </Col>)}
            </Row>
        </>
    );
};

export default Hand; */