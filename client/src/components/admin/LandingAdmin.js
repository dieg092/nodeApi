import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//import M from "materialize-css/dist/js/materialize.min.js";
//import $ from 'jquery';
import * as actions from '../../actions';
//import { Card } from '../containers/common';
//import CONSTANTS from '../../utils/constants';

class LandingAdmin extends Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 m8 l6 xl4 offset-m2 offset-l3 offset-xl4">
          <h1>{this.props &&  this.props.fields && this.props.fields.LANDING_ADMIN}</h1>
        </div>
      </div>
    );
  }
  }

function mapStateToProps({ user, general }) {
  const { userLogged } = user;
  const { fields } = general;
  return { userLogged, fields };
}


export default connect(mapStateToProps, actions)(withRouter(LandingAdmin));
