import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import * as actions from '../actions';
import validateLocale from '../utils/validateLocale';
import Header from './containers/Header';
import Landing from './containers/Landing';
import HeaderAdmin from './admin/HeaderAdmin';
import LandingAdmin from './admin/LandingAdmin';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import NotFound from './containers/NotFound';
import Verify from './containers/Verify';
import Resend from './containers/Resend';
import ChangePass from './auth/rememberPass/changePass/ChangePassForm'
import CONSTANTS from '../utils/constants';

class Router extends Component {
	render () {
		let pathname = this.props.location.pathname.split('/');
		let locale = validateLocale(pathname[1] || ' ', this.props.locale || ' ');
		this.props.setLanguage(locale);

		return (
			<div>
			{this.props && this.props.userLogged ?
				<div>
					<HeaderAdmin />
					<Switch>
						<Route exact path="/" render={() => <Redirect from="/" to={"/" + locale} /> }/>
						<Route exact path={"/:lang(" + CONSTANTS.LANGS + ")"} render={() => ( <LandingAdmin />)} />
						<Route exact path={"/:lang(" + CONSTANTS.LANGS + ")/login"} render={() => (<Redirect to={"/" + pathname[1]} />)} />
						<Route exact component={NotFound} />
					</Switch>
				</div>
			:
				<div>
					<Header isHeaderAbsolute={pathname[1] && !pathname[2] ? true : false}  isHeaderAbsoluteOpacity={pathname[1] && pathname[2] === 'asdfasdf' ? true : false}/>
					<Switch>
						<Route exact path="/" render={() => <Redirect from="/" to={"/" + locale} /> }/>
						<Route exact path={"/:lang(" + CONSTANTS.LANGS + ")"} render={(props) => ( <Landing  {...props} isHeaderAbsolute={true} />)} />
						<Route exact path={"/:lang(" + CONSTANTS.LANGS + ")/login"} render={(props) => ( <Login {...props}  />)} />
						<Route exact path={"/:lang(" + CONSTANTS.LANGS + ")/signup"} render={(props) => ( <SignUp {...props}  />)} />
						<Route exact path={"/:lang(" + CONSTANTS.LANGS + ")/signup/verify"} render={(props) => ( <Verify  {...props}  />)} />
						<Route exact path={"/:lang(" + CONSTANTS.LANGS + ")/signup/resend"} render={(props) => ( <Resend  {...props}  />)} />
						<Route exact path={"/:lang(" + CONSTANTS.LANGS + ")/remember/:token"} render={(props) => ( <ChangePass  {...props}  />)} />
						<Route exact component={NotFound} />
					</Switch>
				</div>
			}
			</div>
		);
	}
};

function mapStateToProps({ user }) {
   const { userLogged, locale } = user;
   return { userLogged, locale };
}

export default withRouter(connect(mapStateToProps, actions)(Router));
