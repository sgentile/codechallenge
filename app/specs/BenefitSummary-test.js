// Copyright 2004-present Facebook. All Rights Reserved.

/* eslint-disable no-unused-vars */


import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import BenefitSummary from 'components/employee/BenefitSummary.jsx';
import expect from 'expect';

describe('BenefitSummary', () => {

    it('properly renders the summary given the employee monthlyBenefitCost and monthlyNetPay', () => {
        // Render a checkbox with label in the document
        let employee = {
            monthlyBenefitCost: 500,
            monthlyNetPay: 200
        };

        const component = TestUtils.renderIntoDocument(
            <BenefitSummary employee={employee} />
        );

        var i = TestUtils.findRenderedDOMComponentWithTag(
            component, 'i'
        );

        expect(i.textContent).toEqual('Your current pay period benefit cost total is $ 500.00 and your pay amount is $ 200.00');

    });

});
