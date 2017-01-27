import 'babel-polyfill';
import { camelCase, forEach } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import Components from './components';

const dev = process.env.NODE_ENV !== 'production';

function render() {
    // loop through all the registered components
    forEach(Components, (component) => {
        const matches = document.querySelectorAll(component.selector);

        // replace each match on the page with its relevant react component
        forEach(matches, (el) => {
            let props = {};

            // pass through any props defined on the component instance
            forEach(el.attributes, (attribute) => {
                // camel case the name of each prop and remove the 'prop-' prefix
                const name = camelCase(attribute.name.replace('prop-', ''));
                let value;
                if (attribute.value.match(/^{|\[/)) {
                    // value is a json object or array
                    value = JSON.parse(attribute.value);
                } else if (attribute.value.trim() === 'true') {
                    // convert value to boolean true
                    value = true;
                } else if (attribute.value.trim() === 'false') {
                    // convert value to boolean false
                    value = false;
                } else {
                    // pass value as a string
                    value = attribute.value;
                }
                props = Object.assign({}, props, { [name]: value });
            });

            // build children
            props.chilren = el.childNodes;

            const temp = document.createElement('div');
            ReactDOM.render(React.createElement(component.entry, props), temp);
            el.parentNode.replaceChild(temp.firstChild, el);
        });
    });
}

if (dev && module.hot) {
    // hot reload the registered components when changes are made
    module.hot.accept('./components', () => {
        render(require('./components').default);
    });
}

render();
