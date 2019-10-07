import React from 'react';

import { ElevatorButton } from '../components/ElevatorButton';

export class ElevatorCallButton extends React.Component {
    render() {
        return (
            <div className="buttonPannel callButton">
                <ElevatorButton
                    title="o"
                    handleClick={this.props.handleClick}
                    isActive={this.props.isActive}
                />
            </div>
        );
    }
}