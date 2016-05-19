import alt from 'libs/alt';

class EmployeeActions {
	constructor(){
		this.generateActions(
			'getInitializedEmployee',
			'setName',
			'addDependent',
			'removeDependent'
		);
	}	

	//in real life we would call api to fetch this data...
}

export default alt.createActions(EmployeeActions);
//learn more: http://alt.js.org/docs/actions/
	
