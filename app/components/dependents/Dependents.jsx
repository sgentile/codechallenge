import {Component} from 'react';
import {Table, Button} from 'react-bootstrap';

import EmployeeActions from 'actions/EmployeeActions';

export default class Dependents extends Component {

    removeDependent(dependent, e){
        e.preventDefault();
        //todo: make this use the modal...
        if(confirm('Are you sure you want to remove this dependent ?')){
            EmployeeActions.removeDependent(dependent);
        }
    };

    render(){
        return (
            <div>
                {this.props.dependents.length > 0 ?
                    <div>
                        <h3>Dependents</h3>
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Yearly Benefit Costs</th>
                                <th>Manage</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.dependents.map(dependent =>
                                <tr key={dependent.id}>
                                    <td style={{verticalAlign:'middle'}}>{dependent.name}</td>
                                    <td style={{verticalAlign:'middle'}}>$ {dependent.benefitCost}</td>
                                    <td><Button onClick={this.removeDependent.bind(this, dependent)} bsStyle="danger">Remove</Button></td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </div>
                    : null}
            </div>
        );
    }
}