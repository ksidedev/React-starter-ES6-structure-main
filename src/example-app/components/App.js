import React, { Component } from 'react';
// import ClassExample from './ClassExample';
import StateExample from './StateExample';
import PropsExample from './PropsExample';
import RequestExample from './RequestExample';
import StatelessExample from './StatelessExample';
import styles from '../styles/component-one.scss';

export default class App extends Component {
    render() {
        return (
            <div>
                <div className={styles.componentone}>
                    <h1>Spark React Starter</h1>
                    <p>{'Editing the source components and styling here will reflect any changes without a reload of the page'}</p>
                    <p>{'Occasionally after an error, you might to refresh to reload the components correctly'}</p>
                </div>
                <PropsExample exampleProp="here"/>
                <StateExample />
                <StatelessExample />
                <RequestExample />
            </div>
        );
    }
}
