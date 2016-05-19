import {Component, PropTypes} from 'react';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

import EmployeeActions from 'actions/EmployeeActions';

export default class AddEmployee extends Component {
    constructor(props){
        super(props);
        this.name = props.employee.name || "";
    }

    handleChange(e) {
        //EmployeeActions.setName(e.target.value);
        this.setState({ name: e.target.value});
    }

    addEmployee(e){
        e.preventDefault();
        if(this.state.name.length > 0) {
            EmployeeActions.addEmployee(this.state.name);
        }
    }

    render(){
        return (
            <form>
                <div className="row">
                    <div className="col-md-5">
                        <FormGroup
                            controlId="employeeName">
                            <ControlLabel>To get started, let us know who you are...</ControlLabel>
                            <FormControl
                                type="text"
                                defaultValue={this.props.employee.name}
                                placeholder="Enter your name here and press enter"
                                onChange={this.handleChange.bind(this)}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                    </div>
                    <div className="col-md-7">
                        <Button className="submit-button" type="submit" bsStyle="primary" onClick={this.addEmployee.bind(this)}>Save</Button>
                    </div>
                </div>
            </form>
        );
    }
}
