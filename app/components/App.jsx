import {Component, PropTypes} from 'react';

export default class App extends Component {
	render() {
		return (
			<div className="container">
				<div className="content-wrapper">
					<section className="content">
						{this.props.content}
					</section>
				</div>
			</div>
		)
	}
}
