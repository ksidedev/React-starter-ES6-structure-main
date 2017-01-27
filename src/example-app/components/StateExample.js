import React, { Component, PropTypes } from 'react';
import '../styles/component-two.scss';

class StateExample extends Component {

	constructor() { //For setting default state
	    super();

	    this.state = {
	      	checked: true
	    };
	    this.handleChecked = this.handleChecked.bind(this);
	}


	handleChecked() { // For updating default state to new state
	    this.setState({checked: !this.state.checked});
	}

    render() {
        var msg;

	    if(this.state.checked) {
	        msg = 'checked'
	    }else{
	         msg = 'unchecked'
	    }

       	return (
             <div>
                <label className="onoffswitch-label" htmlFor="switch">
                    <span>State checkbox</span>
                </label>
                <input type="checkbox" name="switch" onChange={this.handleChecked} defaultChecked={this.state.checked} />
                <h3>Checkbox is {msg}</h3>
            </div>
        );
    }
}


export default StateExample;