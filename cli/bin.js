#!/usr/bin/env node

/* eslint no-console: 0 */
const program = require('commander');
const fs = require('fs');
const { kebabCase, startCase } = require('lodash');
const path = require('path');
const promptly = require('promptly');

const {
    renderExampleIndex,
    renderExampleComponent,
    renderExampleStylesheet
} = require('./example-component');

function nameValidator(value) {
    if (value.length < 7) {
        throw new Error('Error: Component name too short.\n');
    } else if (!value.toLowerCase().match(/^spark /)) {
        throw new Error('Error: Component name must start with \'Spark \'.\n');
    }

    return value;
}

function scaffoldComponent() {
    console.log('Components should have a memorable name and start with \'Spark \'.\n');
    console.log('A good example would be something like \'Spark Image Gallery Header\'.');
    console.log('This will then be converted to a React class called \'SparkImageGalleryHeader\'.\n');
    console.log('Components live in the src/components directory and these all need to be\ngiven unique names to identify them.');
    console.log('-------------------------------------------------------------------------------\n');

    promptly.prompt('Please enter a name for the new component: ', { validator: nameValidator }, (err, value) => {
        promptly.prompt('Please enter a description for the new component (optional): ', { default: '' }, (err2, description) => {
            const name = startCase(value);
            const descriptionFormatted = description.trim().replace(/'/g, '\\\'');
            const componentName = name.replace(/ /g, '');
            const pathName = kebabCase(value);
            const baseDir = path.join(__dirname, '../src/components');

            try {
                fs.accessSync(path.join(baseDir, pathName), fs.F_OK);
                console.log('Error: A component with this name already exists.');
            } catch (e) {
                console.log(`\nA new component called '${name}' will be created.\n`);

                // make the new component directory
                fs.mkdirSync(path.join(baseDir, pathName), (error) => {
                    if (error) {
                        console.log(error);
                    }
                });

                // write the index.js file
                fs.writeFileSync(path.join(baseDir, pathName, 'index.js'), renderExampleIndex(name, descriptionFormatted), 'utf8', (error) => {
                    if (error) {
                        console.log(error);
                    }
                });

                // write the react component
                fs.writeFileSync(path.join(baseDir, pathName, `${componentName}.js`), renderExampleComponent(name), 'utf8', (error) => {
                    if (error) {
                        console.log(error);
                    }
                });

                // write the stylesheet
                fs.writeFileSync(path.join(baseDir, pathName, `${pathName}.scss`), renderExampleStylesheet(name), 'utf8', (error) => {
                    if (error) {
                        console.log(error);
                    }
                });

                console.log(`Component successfully created at src/components/${pathName}.\n`);
                console.log('Note: components will need to be registered into the component library in the\nsrc/components/index.js file when they are ready to be used.\n');
                console.log('-------------------------------------------------------------------------------');
            }

            return null;
        });
    });
}

program
    .version('1.0.0')
    .usage('[options]')
    .option('-c, --component', 'scaffold a new component', scaffoldComponent);

program.on('--help', () => {
    console.log('  Examples:');
    console.log('');
    console.log('    $ spark-cli --help');
    console.log('    $ spark-cli -h');
    console.log('');
});

console.log('-------------------------------------------------------------------------------');
console.log('Welcome to the Spark Component CLI.');
console.log('-------------------------------------------------------------------------------');

program.parse(process.argv);
