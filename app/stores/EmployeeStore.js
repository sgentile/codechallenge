import alt from 'libs/alt';
import EmployeeActions from 'actions/EmployeeActions';

class EmployeeStore {
	constructor() {
		this.bindActions(EmployeeActions);
		this.employee = {};
	}

		getInitializedEmployee() {
			//data returned from the api call - see the action...]
			//todo, retrieve from state...
			const employee = {
				id: 1,
				name: "",
				benefitCost: 1000.00,
				dependents: []
			}
			//set application state:
			this.setState({
				employee: employee
			});
		}

		setName(name){
			this.employee.name = name;
		}

		addDependent(dependent) {
			this.employee.dependents.push(dependant);
		}

		removeDependent(dependent) {
			//this.employee.dependents.splice();
		}
}

export default alt.createStore(EmployeeStore, 'EmployeeStore');
// learn more http://alt.js.org/docs/createStore/
