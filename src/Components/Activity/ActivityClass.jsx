import React, { Component } from 'react';

class ActivityClass extends Component {

    render() { 
        return (
            <div>ActivityClasss {this.props.params.id}</div>
        );
    }
}
 
export default ActivityClass;