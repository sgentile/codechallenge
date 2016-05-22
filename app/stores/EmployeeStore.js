import alt from 'libs/alt';
import EmployeeActions from 'actions/EmployeeActions';

class EmployeeStore {
    constructor() {
        this.bindActions(EmployeeActions);
        this.state = {
            employee: null
        };
    }

    _calculateBenefitCost(obj) {
        if (obj.name.startsWith('a') || obj.name.startsWith('A')){
            obj.benefitCost = obj.benefitCost - (obj.benefitCost * .10);
            obj.monthlyBenefitCost = (obj.benefitCost/26)
        }
    }

    _calculatePayAmount(){
        this._calculateBenefitCost(this.state.employee); //rerun the benefit costs...

        //calculate monthlyNetPay and  monthlyBenefitCost


        let totalBenefitCost = this.state.employee.benefitCost;
        //sum every dependent
        this.state.employee.dependents.forEach(dependent => totalBenefitCost += dependent.benefitCost);

        this.state.employee.monthlyBenefitCost = totalBenefitCost/26;
        this.state.employee.monthlyNetPay = this.state.employee.monthlyGrossPay - this.state.employee.monthlyBenefitCost;
        this._createPayChecks(this.state.employee);
    }

    _createPayChecks(employee) {
        employee.paychecks = [];
        employee.monthlyNetPay = employee.monthlyGrossPay - employee.monthlyBenefitCost;
        for(var i = 1; i <= 26; i++){
            employee.paychecks.push({
                payPeriod: i,
                deductions: employee.monthlyBenefitCost,
                amount: employee.monthlyNetPay
            });
        }
        employee.yearlyBenefitCost =  employee.monthlyBenefitCost * 26;
        employee.yearlyNetPay =  employee.monthlyNetPay * 26;
    }

    getNewEmployee() {
        //we are using backing store for this information, normally we'd retrieve from a backend API datasource
        let newEmployee = {
            name: "",
            monthlyGrossPay: 2000.00,
            monthlyNetPay: 0,   
            benefitCost: 1000.00,
            monthlyBenefitCost: (1000.00/26),
            discountApplied: false,
            dependents: [],
            paychecks: [],
            yearlyBenefitCost: 0,
            yearlyNetPay: 0
        };
        this._createPayChecks(newEmployee);
        return newEmployee;
    }

    getInitializedEmployee() {
        //set application state:
        this.setState({
            employee: this.state.employee || Object.assign({}, this.getNewEmployee())
        });
    }

    reset() {
        this.setState({
            employee: Object.assign({}, this.getNewEmployee())
        })
    }



    addEmployee(name) {
        this.state.employee.name = name;
        this._calculatePayAmount();
        this.setState({
            employee: this.state.employee
        })
    }

    addDependent(name) {
        let dependent = {
            id: this.state.employee.dependents.length + 1,
            name: name,
            benefitCost: 500.00
        };
        //check for discount
        this._calculateBenefitCost(dependent);
        this.state.employee.dependents.push(dependent);
        //recalulate the monthly payments
        this._calculatePayAmount();
        this.setState({
            employee: this.state.employee
        });
    }

    removeDependent(dependent) {
        let idx = this.state.employee.dependents.indexOf(dependent);
        this.state.employee.dependents.splice(idx, 1);
        this._calculatePayAmount();
        this.setState({
            employee: this.state.employee
        });
    }
}

export default alt.createStore(EmployeeStore, 'EmployeeStore');
// learn more http://alt.js.org/docs/createStore/
