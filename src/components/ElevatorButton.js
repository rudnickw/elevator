import React from 'react';

export class ElevatorButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleClick(this.props.title)
    }

    render() {
        // If this button is active we will set its' class appropriately
        let className = this.props.isActive ? "activeButton" : "";

        return (
            <button className={className} onClick={this.handleClick}>{this.props.title}</button>
        )
    }
}