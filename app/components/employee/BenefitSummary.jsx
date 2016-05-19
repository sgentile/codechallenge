import {Component} from 'react';

export default class BenefitSummary extends Component {
    render(){
        return(
            <div>
                <i>Your current pay period benefit cost total is $ {this.props.employee.monthlyBenefitCost.toFixed(2)} and your pay amount is $ {this.props.employee.monthlyNetPay.toFixed(2)}</i>
            </div>
        );
    }
}