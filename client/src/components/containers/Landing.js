import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import * as actions from '../../actions';
import { Card } from '../containers/common';
import CONSTANTS from '../../utils/constants';
import LoginForm from '../auth/login/LoginForm';

class Langing extends Component {
  render() {
    return (
      <div className="row">
      
      </div>
    );
  }
}



export default connect(null, actions)(Langing);
