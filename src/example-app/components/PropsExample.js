import React, { Component, PropTypes } from 'react';
import styles from '../styles/component-one.scss';

class PropsExample extends Component {
	render() {
		return(
			<div>
				<p>The red text <span className={styles.componentone}>{this.props.exampleProp}</span> is coming from a props</p>
			</div>
		)
	}
}

PropsExample.propTypes = {
    exampleProp: PropTypes.string.isRequired
};

export default PropsExample;