import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ClassExample from '../../../src/example-app/components/ClassExample';

const shallowRenderer = ReactTestUtils.createRenderer();
let testProp = 'testing';

describe('App', () => {
    beforeEach(() => {
        testProp = 'testing';
    });
    describe('ClassExample Component', () => {
        it('should render the component correctly', () => {
            shallowRenderer.render(<ClassExample exampleProp={testProp} />);
            const result = shallowRenderer.getRenderOutput();

            expect(result.type).to.be.equal('div');
            expect(result.props.children).to.be.eql([
                <h4>This is an ES6 class based component</h4>,
                <div>{testProp}</div>
            ]);
        });
    });
});
