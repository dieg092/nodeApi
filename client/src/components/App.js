import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as actions from '../actions';
import Router from './Router';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	renderRouter() {
		return (
			<Router />
		)
	}

	render () {
		return (
				<div>
				  <BrowserRouter>
						{this.props && this.props.userLogged !== null && this.renderRouter()}
					</BrowserRouter>
				</div>
		);
	}
};

function mapStateToProps({ user }) {
   const { userLogged, locale } = user;
   return { userLogged, locale };
}

export default connect(mapStateToProps, actions)(App);
