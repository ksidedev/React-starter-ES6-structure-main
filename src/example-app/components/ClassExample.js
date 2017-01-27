import React, { Component, PropTypes } from 'react';
import styles from '../styles/component-two.scss';

class ClassExample extends Component {
    render() {
        return (
            <div>
                <h4>This is an ES6 class based component</h4>
                <div>{this.props.exampleProp}</div>
            </div>
        );
    }
}

ClassExample.propTypes = {
    exampleProp: PropTypes.string.isRequired
};

export default ClassExample;
