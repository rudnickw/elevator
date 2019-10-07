import React from 'react';

export class FloorNumber extends React.Component {
    render() {
        // If this floor is active we the number should be red
        const className = "floorNumber " + (this.props.isActive ? "redFloorNumber" : "");

        return (
            <div className={className} > {this.props.floor}</div>
        );
    }
}