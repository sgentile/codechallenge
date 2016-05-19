import {Component, PropTypes} from 'react';
import {PageHeader, Button} from 'react-bootstrap';

import EmployeeActions from 'actions/EmployeeActions';

import AddEmployee from 'components/employee/AddEmployee';
import BenefitSummary from 'components/employee/BenefitSummary';
import PayChecks from 'components/employee/PayChecks';

import Dependents from 'components/dependents/Dependents';
import AddDependents from 'components/dependents/AddDependents';

export default class Employee extends Component {
    
    reset(e){
        e.preventDefault();
        EmployeeActions.reset();
    };


    render(){
        return (
            <div>
                <PageHeader>Employee Benefit Cost Breakdown <small>{this.props.employee.name} <div className="pull-right"><Button onClick={this.reset.bind(this)}>Reset</Button></div></small></PageHeader>

                {this.props.employee.name.length === 0 ?
                    <div>
                        <AddEmployee {...this.props} />
                    </div>
                    :
                    <div>
                        <BenefitSummary {...this.props} />
                        <AddDependents />
                        <Dependents dependents={this.props.employee.dependents} />
                        <PayChecks {...this.props} />
                    </div>
                }


            </div>
        )
    }
}
