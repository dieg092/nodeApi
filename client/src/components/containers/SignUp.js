import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import * as actions from '../../actions';
import { Card } from '../containers/common';
import CONSTANTS from '../../utils/constants';
import SignUpForm from '../auth/signUp/SignUpForm';

class SignUp extends Component {
  render() {
    return (
      <div className="row">
        <div className="col s12 m8 l6 xl4 offset-m2 offset-l3 offset-xl4">
          <img className="responsive-img margin-top-50" style={{ maxWidth: '275px' }} alt="logo" src={'/images/logo.png'} />

            <div className="card">
              <div className="card-content">
                <p className="center font-35-custom">Registro</p>
                <div className="body-login">
                  <SignUpForm />
                  <div className="center margin-top-10">
                    <span>Ya tengo cuenta, quiero <a href="/login" className="teal-text pointer">Iniciar Sesión</a></span>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}



export default connect(null, actions)(SignUp);
