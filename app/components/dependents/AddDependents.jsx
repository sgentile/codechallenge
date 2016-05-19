import {Component} from 'react';
import {Button, FormGroup, FormControl, HelpBlock, ControlLabel, Table, PageHeader} from 'react-bootstrap';

import EmployeeActions from 'actions/EmployeeActions';

export default class AddDependents extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:""
        };
    }

    getDependentNameValidationState() {
        const length = this.state.name;
        if (length > 10) return 'success';
        else if (length > 0) return 'error';
    }

    handleChange(e) {
        this.setState({ name: e.target.value});
    }

    submitAddDependent(e){
        e.preventDefault();
        if(this.state.name.length > 0) {
            EmployeeActions.addDependent(this.state.name);
            this.setState({
                name: ""
            });
        }
    }

    render(){
        return(
            <div>
                <h4>Do you have any dependents ?</h4>
                <form>
                    <div className="row">
                        <div className="col-md-5">
                            <FormGroup
                                controlId="employeeName"
                                validationState={this.getDependentNameValidationState()}
                            >
                                <ControlLabel>Add a dependent:</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.name}
                                    placeholder="Enter dependent's name here and press enter"
                                    onChange={this.handleChange.bind(this)}
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                        </div>
                        <div className="col-md-7">
                            <Button className="submit-button" type="submit" bsStyle="default" onClick={this.submitAddDependent.bind(this)}>Add</Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

