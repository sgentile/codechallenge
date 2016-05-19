import {Component} from 'react';
import {Table} from 'react-bootstrap';

export default class PayChecks extends Component {
    render(){
        console.log('paychecks', this.props);
        return(
            <div>
                <h3>Paycheck Schedule (26 pay periods)</h3>
                <i>Your yearly benefit cost total is $ {this.props.employee.yearlyBenefitCost.toFixed(2)} and your pay amount is $ {this.props.employee.yearlyNetPay.toFixed(2)}</i>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Pay Period</th>
                        <th>Total Deductions</th>
                        <th>PayCheck</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.employee.paychecks.map(data =>
                        <tr key={data.payPeriod}>
                            <td>{data.payPeriod}</td>
                            <td>$ {data.deductions.toFixed(2)}</td>
                            <td>$ {data.amount.toFixed(2)}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        );

    }
}