import React from 'react';

import { ElevatorCallButton } from '../containers/ElevatorCallButton';
import { CounterWeight } from '../components/CounterWeight';
import { ElevatorBay } from './ElevatorBay';

export class Floor extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    /*
        Function that will be passed into the ElevatorButton object
    */
    handleClick() {
        // Call the ElevatorShaft handleClick function with the current floor to add it to its' requestQueue
        this.props.handleClick(this.props.floor);
    }

    render() {
        return (
            <div className="floor" style={this.props.style} id={"floor_" + this.props.floor}>
                <ElevatorCallButton handleClick={this.handleClick} isActive={this.props.requestQueue.includes(this.props.floor)} />
                <ElevatorBay elevator={this.props.elevator} currentFloor={this.props.currentFloor} floors={this.props.floors} />
                <CounterWeight className="buttonPannel callButton" />
            </div>
        );
    }
}