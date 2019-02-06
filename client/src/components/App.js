import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import * as actions from '../actions';
import RouterAdmin from './admin/RouterAdmin';
import Landing from './containers/Landing';
import Login from './containers/Login';
import SignUp from './containers/SignUp';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	renderRouter() {
		if (this.props && this.props.userLogged) {
			<RouterAdmin />
		}

		return (
			<div>
				<Route exact path="/" render={() => (this.props.userLogged && this.props.userLogged.rol ? ( <Redirect to="/admin/usuarios"/> ) : (this.props.userLogged && !this.props.userLogged.rol ? ( <Redirect to="/laboral"/> ) : ( <Landing />)))} />
				<Route exact path="/login" render={() => (this.props.userLogged && this.props.userLogged.rol ? ( <Redirect to="/admin/usuarios"/> ) : (this.props.userLogged && !this.props.userLogged.rol ? ( <Redirect to="/laboral"/> ) : ( <Login />)))} />
				<Route exact path="/signup" render={() => (this.props.userLogged && this.props.userLogged.rol ? ( <Redirect to="/admin/usuarios"/> ) : (this.props.userLogged && !this.props.userLogged.rol ? ( <Redirect to="/laboral"/> ) : ( <SignUp />)))} />
			</div>
		)
	}

	render () {
		console.log(this.props.userLogged)
		return (
				<div>
				  <BrowserRouter>
						{this.renderRouter()}
					</BrowserRouter>
				</div>
		);
	}
};

function mapStateToProps({ user }) {
   const { userLogged } = user;
   return { userLogged };
}

export default connect(mapStateToProps, actions)(App);
