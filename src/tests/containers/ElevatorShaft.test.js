import React from 'react';
import { ElevatorShaft } from '../../containers/ElevatorShaft';
import { shallow } from 'enzyme';

// ###################################################
// ELEVATOR SHAFT TESTING
// ###################################################
describe('Elevator Shaft Testing ', () => {
    it('Renders without crashing', () => {
        shallow(<ElevatorShaft />);
    });

    // ###################################################
    // TESTING DIRECTION WHEN BUTTONS ARE PRESSED
    // ###################################################
    describe('Testing direction when buttons are pressed', () => {
        it('Sets the direction correctly when a request is added to the queue', () => {
            const elevatorShaft = shallow(<ElevatorShaft />);

            // Since the elevator starts on the first floor we don't go anwyhere
            elevatorShaft.instance().insertNewRequest(1);
            expect(elevatorShaft.state().direction).toEqual(0);

            // Since the elevator starts on the first floor we should go up (1)
            elevatorShaft.instance().insertNewRequest(2);
            expect(elevatorShaft.state().direction).toEqual(1);

            // Clear the queue, move the elvator to the 4th floor so we can test going down
            elevatorShaft.setState({
                currentFloor: 4,
                requestQueue: [],
                direction: 0
            });

            // Since the elevator is on the 4th floor already we should go nowhere
            elevatorShaft.instance().insertNewRequest(4);
            expect(elevatorShaft.state().direction).toEqual(0);

            // Since the elevator is on the 4th floor we should go down (-1)
            elevatorShaft.instance().insertNewRequest(3);
            expect(elevatorShaft.state().direction).toEqual(-1);
        });

        it('Orders the queue appropriately when multiple floors are requested', () => {
            const elevatorShaft = shallow(<ElevatorShaft />);

            // Request queue starts empty
            expect(elevatorShaft.state().requestQueue).toEqual([]);

            // Move the elevator to the second floor so we can go up and down
            elevatorShaft.setState({
                currentFloor: 2
            });

            // Direction is now set to 1
            elevatorShaft.instance().insertNewRequest(4);

            // Add a lower floor
            elevatorShaft.instance().insertNewRequest(1);

            // We should still go up since 4 was pressed first
            expect(elevatorShaft.state().direction).toEqual(1);

            // We press 3 after we press 1 
            elevatorShaft.instance().insertNewRequest(3);

            // It will still be put before 1 in the queue since we're going that direction
            expect(elevatorShaft.state().requestQueue).toEqual([3, 4, 1]);
        });
    });

    // ###################################################
    // TESTING DIRECTION AND FLOOR WHEN MOVING FLOORS
    // ###################################################
    describe('Testing moving floors', () => {
        it('Moves to the correct floor', () => {
            const elevatorShaft = shallow(<ElevatorShaft />);

            // Press floor 2 and move
            elevatorShaft.instance().insertNewRequest(2);
            elevatorShaft.instance().moveFloors();

            // The elevator moved to the second floor
            expect(elevatorShaft.state().currentFloor).toEqual(2);

            // Press floor 4 and move
            elevatorShaft.instance().insertNewRequest(4);
            elevatorShaft.instance().moveFloors();

            // The elevator only moves one floor at a time
            expect(elevatorShaft.state().currentFloor).toEqual(3);

            //Move again
            elevatorShaft.instance().moveFloors();

            // Now we're on the 4th floor
            expect(elevatorShaft.state().currentFloor).toEqual(4);
        });

        it('Maintains direction as the elevator moves floors', () => {
            const elevatorShaft = shallow(<ElevatorShaft />);

            // Press floor 4 and move
            elevatorShaft.instance().insertNewRequest(4);
            elevatorShaft.instance().moveFloors();

            // The elevator only moved one floor so we should still be going up
            expect(elevatorShaft.state().direction).toEqual(1);
        });

        it('Clears its direction after its done moving', () => {
            const elevatorShaft = shallow(<ElevatorShaft />);

            //Press floor 3 and move
            elevatorShaft.instance().insertNewRequest(3);
            elevatorShaft.instance().moveFloors();

            // We're still going up
            expect(elevatorShaft.state().direction).toEqual(1);

            // Move again
            elevatorShaft.instance().moveFloors();

            // Now we are at the third floor so we shouldn't have a direction
            expect(elevatorShaft.state().direction).toEqual(0);
        });

        it('Changes its direction when it has arrived at its first destination', () => {
            const elevatorShaft = shallow(<ElevatorShaft />);

            // Press floor 2 and move
            elevatorShaft.instance().insertNewRequest(2);
            elevatorShaft.instance().moveFloors();

            // We're not moving anymore
            expect(elevatorShaft.state().direction).toEqual(0);

            //  Press 3, then 1, and move
            elevatorShaft.instance().insertNewRequest(3);
            elevatorShaft.instance().insertNewRequest(1);
            elevatorShaft.instance().moveFloors();

            // We moved to the 3rd floor so now we should be going down
            expect(elevatorShaft.state().direction).toEqual(-1);

            // Move twice so we are at the first floor
            elevatorShaft.instance().moveFloors();
            elevatorShaft.instance().moveFloors();

            // We should have no direction again
            expect(elevatorShaft.state().direction).toEqual(0);
        });
    });
});