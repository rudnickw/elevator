import React from 'react';

import { ElevatorButton } from '../components/ElevatorButton';

export class Elevator extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    /*
        Function that calls the passed-in handleClick function to add the floor number to the queue
        Also scrolls the user to the floor where the elevator will be arriving
    */
    handleClick(floor) {
        this.props.onClick(floor);
        document.getElementById("floor_" + floor).scrollIntoView({ behavior: "smooth" });
    }

    render() {
        return (
            <div className="elevator">
                <div className="buttonPannel">
                    {this.props.floors.map(button => (
                        <ElevatorButton
                            key={button}
                            title={button}
                            handleClick={this.handleClick}
                            isActive={this.props.requestQueue.includes(button)}
                        />
                    ))}
                </div>
            </div>
        )
    }
}