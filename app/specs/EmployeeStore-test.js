import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

//wrappedEmployeeStore is alt store, UnwrappedEmployeeStore is UnwrappedEmployeeStore class
import wrappedEmployeeStore, {UnwrappedEmployeeStore} from 'stores/EmployeeStore';
import EmployeeActions from 'actions/EmployeeActions';

import alt from 'libs/alt';

describe('EmployeeStore', () => {

    it('employee state should be null', () => {
        var employeeStoreState = wrappedEmployeeStore.getState();
        expect(employeeStoreState.employee).toNotExist();

    });

    it('listen initialize a newEmployee', () => {
        //get initial state of store
        var employee = wrappedEmployeeStore.getState().employee;
        expect(employee).toNotExist();

        EmployeeActions.getInitializedEmployee();

        employee = wrappedEmployeeStore.getState().employee;
        expect(employee).toExist();

        expect(employee.name).toBe("");
        expect(employee.monthlyGrossPay).toBe(2000);
        expect(employee.monthlyNetPay).toBe(employee.monthlyGrossPay - employee.monthlyBenefitCost);
        expect(employee.benefitCost).toBe(1000);
        expect(employee.monthlyBenefitCost).toBe(employee.benefitCost/26);
        expect(employee.discountApplied).toBe(false);
        expect(employee.dependents.length).toBe(0);
        expect(employee.yearlyBenefitCost).toBe(employee.monthlyBenefitCost * 26);
        expect(employee.yearlyNetPay).toBe(employee.monthlyNetPay * 26);
    });

    it('adding an employee should set the employee name with benefit cost of 1000', () => {
        EmployeeActions.addEmployee('Steve');
        var employee = wrappedEmployeeStore.getState().employee;
        expect(employee.name).toBe('Steve');
        expect(employee.benefitCost).toBe(1000);
    });

    it('adding an employee with name starting with a should get a 10 percent discount of 900', () => {
        EmployeeActions.reset();
        EmployeeActions.addEmployee('andrew');
        var employee = wrappedEmployeeStore.getState().employee;
        expect(employee.name).toBe('andrew');
        expect(employee.benefitCost).toBe(900);
    });

    it('adding an employee with name starting with A should get a 10 percent discount of 900', () => {
        EmployeeActions.reset();
        EmployeeActions.addEmployee('Andy');
        var employee = wrappedEmployeeStore.getState().employee;
        expect(employee.name).toBe('Andy');
        expect(employee.benefitCost).toBe(900);
    });



    it('resetting should reset employee back to initialized state', () => {
        EmployeeActions.reset();
        EmployeeActions.addEmployee('Steve');
        var employee = wrappedEmployeeStore.getState().employee;
        expect(employee.name).toBe('Steve');

        EmployeeActions.reset();

        var employee = wrappedEmployeeStore.getState().employee;
        expect(employee.name).toBe('');
    });

    it('should be able to add a dependent to an employee with 500 benefit cost', () => {
        EmployeeActions.reset();
        EmployeeActions.addDependent('Jake');

        var employee = wrappedEmployeeStore.getState().employee;
        expect(employee.dependents.length).toBe(1);

        var dependent = employee.dependents[0];
        expect(dependent.name).toBe('Jake');
        expect(dependent.benefitCost).toBe(500);
    });

    it('adding a dependent with name starting with A should get a 10 percent discount equaling 450', () => {
        EmployeeActions.reset();
        EmployeeActions.addDependent('Austin');

        var employee = wrappedEmployeeStore.getState().employee;
        expect(employee.dependents.length).toBe(1);

        var dependent = employee.dependents[0];
        expect(dependent.name).toBe('Austin');
        expect(dependent.benefitCost).toBe(450);
    });

    it('adding a dependent with name starting with a should get a 10 percent discount equaling 450', () => {
        EmployeeActions.reset();
        EmployeeActions.addDependent('austin');

        var employee = wrappedEmployeeStore.getState().employee;
        expect(employee.dependents.length).toBe(1);

        var dependent = employee.dependents[0];
        expect(dependent.name).toBe('austin');
        expect(dependent.benefitCost).toBe(450);
    });

    it('a new employee should have 26 pay periods, each with the monthly benefit deduction cost equaling the monthly benefit cost', () => {
        EmployeeActions.reset();
        var employee = wrappedEmployeeStore.getState().employee;
        expect(employee.paychecks.length).toBe(26);

        employee.paychecks.forEach((paycheck) => {
            expect(paycheck.deductions).toBe(1000/26);
            //or
            expect(paycheck.deductions).toBe(employee.monthlyBenefitCost);
            expect(paycheck.deductions.toFixed(2)).toBe(('38.46'));

            expect(paycheck.amount).toBe(employee.monthlyNetPay);
            expect(paycheck.amount.toFixed(2)).toBe(('1961.54'));
        });
    });
    
    it('demonstrate adding a dependent to produce correct monthly pay', () => {
        EmployeeActions.reset();
        var employee = wrappedEmployeeStore.getState().employee;
        expect(employee.paychecks.length).toBe(26);

        employee.paychecks.forEach((paycheck) => {
            expect(paycheck.deductions).toBe(1000/26);
            //or
            expect(paycheck.deductions).toBe(employee.monthlyBenefitCost);
            expect(paycheck.deductions.toFixed(2)).toBe(('38.46'));

            expect(paycheck.amount).toBe(employee.monthlyNetPay);
            expect(paycheck.amount.toFixed(2)).toBe(('1961.54'));
        });
        
        EmployeeActions.addDependent('Jake');

        expect(employee.paychecks.length).toBe(26);

        employee.paychecks.forEach((paycheck) => {
            //deduction amount is the employee 1000 plus dependent 500
            expect(paycheck.deductions).toBe(1500/26);
            //or
            expect(paycheck.deductions).toBe(employee.monthlyBenefitCost);
            expect(paycheck.deductions.toFixed(2)).toBe(('57.69'));

            expect(paycheck.amount).toBe(employee.monthlyNetPay);
            expect(paycheck.amount.toFixed(2)).toBe(('1942.31'));
        });

        EmployeeActions.addDependent('Antonio');

        expect(employee.paychecks.length).toBe(26);

        employee.paychecks.forEach((paycheck) => {
            //deduction amount is the employee 1000 plus dependent 500 plus dependent at 450 with discount
            expect(paycheck.deductions).toBe(1950/26);
            //or
            expect(paycheck.deductions).toBe(employee.monthlyBenefitCost);
            expect(paycheck.deductions.toFixed(2)).toBe(('75.00'));

            expect(paycheck.amount).toBe(employee.monthlyNetPay);
            expect(paycheck.amount.toFixed(2)).toBe(('1925.00'));
        });
    });

});