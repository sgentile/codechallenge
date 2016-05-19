import AltContainer from 'alt-container';
import {Component} from 'react';

import ShowWhen from 'components/ShowWhen';

import EmployeeStore from 'stores/EmployeeStore';
import Employee from 'components/employee/Employee';

export default class Main extends Component {
    render() {
        return (
            <AltContainer store={EmployeeStore}>
                <ShowWhen prop="employee">
                    <Employee  />
                </ShowWhen>
            </AltContainer>
        );
    }
}

