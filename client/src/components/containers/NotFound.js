import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Footer from './Footer';

//import M from "materialize-css/dist/js/materialize.min.js";
//import $ from 'jquery';
import * as actions from '../../actions';
//import { Card } from '../containers/common';
//import CONSTANTS from '../../utils/constants';


class NotFound extends Component {
  render() {
    return (
      <div className="row margin-bottom-0">
        <div className="col s12 m8 l6 xl4 offset-m2 offset-l3 offset-xl4">
          <h1>404</h1>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ user, general }) {
   const { userLogged, locale } = user;
   const { fields } = general;
   return { userLogged, fields, locale };
}

export default connect(mapStateToProps, actions)(withRouter(NotFound));
