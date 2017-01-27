const { kebabCase } = require('lodash');

function renderExampleIndex(name, description) {
    const componentName = name.replace(/ /g, '');
    const pathName = kebabCase(name);

    return `import ${componentName} from './${componentName}';

export default {
    name: '${name}',
    description: '${description}',
    directory: '${pathName}',
    selector: '${pathName}',
    entry: ${componentName}
};
`;
}

function renderExampleComponent(name) {
    const componentName = name.replace(/ /g, '');

    return `import React, { Component } from 'react';
import styles from './${kebabCase(name)}.scss';

class ${componentName} extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                Component content goes here
            </div>
        );
    }
}

export default ${componentName};
`;
}

function renderExampleStylesheet() {
    return `.wrapper {
    // classnames used here are scoped to the component
}
`;
}

module.exports = {
    renderExampleIndex,
    renderExampleComponent,
    renderExampleStylesheet
};
