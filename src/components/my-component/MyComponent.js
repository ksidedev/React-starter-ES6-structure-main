// @flow
import React, { Component, PropTypes } from 'react';
import styles from './my-component.scss';

class MyComponent extends Component {
    constructor(props: any) {
        super(props);

        this.state = {
            clicked: 0
        };
    }
    state: {
        clicked: number;
    }
    clickHandler = () => {
        this.setState({ clicked: this.state.clicked + 1 });
    }
    render() {
        return (
            <div className={styles.wrapper}>
                <h4>This is an isolated React Component</h4>
                <div className={styles.text}>{this.props.text}</div>
                <div className={styles.counter}>{`You have clicked the button: ${this.state.clicked} time(s)`}</div>
                <button type="button" className={styles.button} onClick={this.clickHandler}>
                    Click me
                </button>
            </div>
        );
    }
}

MyComponent.propTypes = {
    text: PropTypes.string.isRequired
};

export default MyComponent;
