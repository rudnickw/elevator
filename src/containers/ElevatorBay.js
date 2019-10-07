import React from 'react';

import { ElevatorBayHeader } from './ElevatorBayHeader';

export class ElevatorBay extends React.Component {
    render() {
        return (
            <div>
                <ElevatorBayHeader currentFloor={this.props.currentFloor} floors={this.props.floors} />
                {this.props.elevator}
            </div>
        );
    }
}