import React from 'react';

/*
    The CounterWeight is an object that can be used to balance a flex container [{leftItem} {centerItem} {counterWeight}]
*/
export class CounterWeight extends React.Component {
    render() {
        return <div className={this.props.className} />;
    }
}