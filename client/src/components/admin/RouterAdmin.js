import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class RouterAdmin extends Component {
	render () {
		return (
				<div>

				</div>
		);
	}
};

function mapStateToProps({ user }) {
   const { userLogged } = user;
   return { userLogged };
}

export default connect(mapStateToProps, actions)(RouterAdmin);
