import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
//import M from "materialize-css/dist/js/materialize.min.js";
//import $ from 'jquery';
import * as actions from '../../actions';
//import { Card } from '../containers/common';
//import CONSTANTS from '../../utils/constants';
import LoginForm from '../auth/login/LoginForm';
import Footer from './Footer';


const url = '/images/sprite.svg';

class Login extends Component {
  onRememberPass() {
    this.props.rememberPass();
  }

  render() {
    return (
        <div className="row margin-bottom-0">
          <div className="col s12 m8 l8 xl8 offset-l2 offset-m2 offset-xl2">
            <h4 className="white-text center-align valign-wrapper" id="no-responsive">
              <svg className="icon-login">
                <use xlinkHref={`${url}#032-learner`}></use>
              </svg> <span className="margin-top-5vh">{this.props && this.props.fields && this.props.fields.LOG_IN && this.props.fields.LOG_IN.desciption}</span>
            </h4>
            <div  className="margin-top-9vh">
              <div className="card col s12 m8 l6 xl6 offset-xl3 offset-l3 offset-m2">
                <div className="card-content">
                  <p id="responsive" className="center font-35-custom">{this.props && this.props.fields && this.props.fields.LOG_IN && this.props.fields.LOG_IN.title}</p>
                  <div className="body-login">
                  <LoginForm />
                  <div className="center margin-top-10">
                    <a className="teal-text pointer" onClick={this.onRememberPass.bind(this)}>{this.props && this.props.fields && this.props.fields.LOG_IN && this.props.fields.LOG_IN.remember}</a>
                  </div>
                  <div className="center request-access margin-top-10">
                    <span>{this.props && this.props.fields && this.props.fields.LOG_IN && this.props.fields.LOG_IN.hasAccount}<Link to={"/" + this.props.lang + "/signup"} className="teal-text pointer bold"> ¡{this.props && this.props.fields && this.props.fields.LOG_IN && this.props.fields.LOG_IN.title}!</Link></span>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>

    );
  }
}

function mapStateToProps({ user, general }) {
   const { userLogged } = user;
   const { fields, lang } = general;
   return { userLogged, fields, lang };
}

export default connect(mapStateToProps, actions)(withRouter(Login));
