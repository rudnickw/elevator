import React from 'react';

import { FloorNumber } from '../components/FloorNumber';

export class ElevatorBayHeader extends React.Component {
    render() {
        return (
            <div className="buttonPannel">
                <div className="elevatorBayHeader">
                    {this.props.floors.map(floor => (
                        <FloorNumber key={floor} isActive={floor === this.props.currentFloor} floor={floor} />
                    ))
                    }
                </div>
            </div>
        )
    }
}