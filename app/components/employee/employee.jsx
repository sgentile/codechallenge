import {Component, PropTypes} from 'react';
import {Table, PageHeader} from 'react-bootstrap';

export default class Employee extends Component {
    render(){
        console.log(this.props);
        return (
            <div>
                <PageHeader>Benefit Cost Breakdown <small>{this.props.employee.name}</small></PageHeader>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                           <th>Name</th>
                           <th>Benefit Costs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.employee.dependents.map(data =>
                            <tr key={data.id}>
                                <td>{data.name}</td>
																<td>{data.benefitCosts}</td>                            
															</tr>
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
}
