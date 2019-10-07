import React from 'react';

import { Floor } from './Floor';
import { Elevator } from './Elevator';
import ElevatorScene1 from '../images/ElevatorScene1.png';
import ElevatorScene2 from '../images/ElevatorScene2.png';
import ElevatorScene3 from '../images/ElevatorScene3.png';
import ElevatorScene4 from '../images/ElevatorScene4.png';

export class ElevatorShaft extends React.Component {
    constructor(props) {
        super(props);

        // We hold quite a bit on the state of the ElevatorShaft
        this.state = {
            currentFloor: 1,        // Current floor that the elevator is on
            requestQueue: [],       // Array that holds all of our queued floors
            floors: [4, 3, 2, 1],   // Array of the floors we have in the elevator shaft
            direction: 0,           // Direction of the elevator (defaulted to 0 which means we're not going anywhere)
            legend: {               // This legend is an object that describes the styling for each floor
                1: { backgroundImage: "url(" + ElevatorScene1 + ")", backgroundColor: "#5402a796" },
                2: { backgroundImage: "url(" + ElevatorScene2 + ")", backgroundColor: "#21a7d2" },
                3: { backgroundImage: "url(" + ElevatorScene3 + ")", backgroundColor: "#006600" },
                4: { backgroundImage: "url(" + ElevatorScene4 + ")", backgroundColor: "#ff9933" }
            }
        }

        this.insertNewRequest = this.insertNewRequest.bind(this);
        this.moveFloors = this.moveFloors.bind(this);
        this.startClock = this.startClock.bind(this);
    }

    /*
        Function that will take a floor number and add it to the requestQueue held on the state of the ElevatorShaft
    */
    insertNewRequest(floor) {
        // No use in adding duplicates or the floor we're currently on
        if (!this.state.requestQueue.includes(floor) && this.state.currentFloor !== floor) {
            let newQueue = this.state.requestQueue;
            let direction = this.state.direction;

            if (direction === 0) {
                // If we're not moving we need to set the new direction
                newQueue.push(floor);
                direction = floor > this.state.currentFloor ? 1 : -1
            } else {
                // Otherwise we need to preserve the direction and put the new floor in the right spot in the queue
                if (this.state.direction * (floor - this.state.currentFloor) > 0) {
                    newQueue.unshift(floor);
                } else {
                    newQueue.push(floor)
                }
            }

            // Update the state with the new requestQueue and (potentially) updated direction
            this.setState({
                requestQueue: newQueue,
                direction: direction
            });
        }
    }

    /*
        Function that will move the elevator a floor in the direction that is held on the state of the ElevatorShaft
    */
    moveFloors() {
        // We move floors by adding the direction to the floor we're on right now
        let newFloor = this.state.currentFloor + this.state.direction;

        // Filter the queue to remove the current floor 
        let newQueue = this.state.requestQueue.filter(function (floor) {
            return floor !== newFloor;
        });

        // First assume we won't move anywhere
        let direction = 0;

        // If we still have items in the queue we will keep moving so we calculate the direction
        if (newQueue.length) {
            direction = newQueue[0] > newFloor ? 1 : -1;
        }

        // Update the state with the new floor, queue and updated direction
        this.setState({
            currentFloor: newFloor,
            requestQueue: newQueue,
            direction: direction
        });
    }

    /*
        Function that starts a 1 second interval that checks if we want to move floors
    */
    startClock() {
        setInterval(function (self) {
            // The direction is either -1, 0 or 1
            if (self.state.direction) {
                // If the direction is anything but 0 we have somewhere to go so we move!
                self.moveFloors();
            }
        }, 1000, this);
    }

    componentDidMount() {
        this.startClock();
    }

    render() {
        // Elevator object that will only be added to the floor that the elevator is at
        let elevator = <Elevator
            onClick={this.insertNewRequest}
            floor={this.state.currentFloor}
            requestQueue={this.state.requestQueue}
            floors={this.state.floors}
        />;

        // Elevator doors that are a placeholder (of equal size) to the real elevator
        let elevatorDoors = <div className="elevatorDoors" />;

        /*
            We will render each floor in the elevator shaft
            If the floor we're rendering is the current floor we give it the elevator object
            We use the legend to determine the style of the floor as well
        */
        return (
            <div className="elevatorShaft">
                {this.state.floors.map(floor => (
                    <Floor
                        key={floor}
                        floor={floor}
                        currentFloor={this.state.currentFloor}
                        elevator={(floor === this.state.currentFloor) ? elevator : elevatorDoors}
                        handleClick={this.insertNewRequest}
                        requestQueue={this.state.requestQueue}
                        style={this.state.legend[floor]}
                        floors={this.state.floors}
                    />
                ))}
            </div>
        );
    }
}