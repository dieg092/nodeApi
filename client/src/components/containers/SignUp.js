import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Footer from './Footer';
//import M from "materialize-css/dist/js/materialize.min.js";
//import $ from 'jquery';
import * as actions from '../../actions';
//import { Card } from '../containers/common';
//import CONSTANTS from '../../utils/constants';
import SignUpForm from '../auth/signUp/SignUpForm';

const url = '/images/sprite.svg';

class SignUp extends Component {
  render() {
    return (
      <div className="row margin-bottom-0">
          <div id="no-responsive" className="row margin-top-5vh">
            <div className="center-align">
                <svg className="icon right-align">
                  <use xlinkHref={`${url}#028-driving-school`}></use>
                </svg>
                <h4 className="white-text">{this.props && this.props.fields && this.props.fields.SIGN_UP && this.props.fields.SIGN_UP.description}</h4>
            </div>

          </div>

          <div  className="row">
            <div className="card col s12 m10 l10 xl6 offset-l1 offset-m1 offset-xl3">
              <div className="card-content">
                <p id="responsive" className="center font-35-custom">{this.props && this.props.fields && this.props.fields.SIGN_UP && this.props.fields.SIGN_UP.title}</p>
                <div className="body-login">
                  <SignUpForm />
                  <div className="center margin-top-10">
                    <span>Ya tengo cuenta, quiero <Link to={"/" + this.props.lang + "/login"} className="teal-text pointer bold">{this.props && this.props.fields && this.props.fields.LOG_IN && this.props.fields.LOG_IN.title}</Link></span>
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

export default connect(mapStateToProps, actions)(withRouter(SignUp));
// <h5 className="white-text center-align margin-top-35 col xl12">Entra en la comunidad de Drevedemy y disfruta de las siguientes ventajas: </h5>
// <div className="row margin-top-35">
//   <div className="col xl4 margin-top-35">
//     <svg className="icon">
//       <use xlinkHref={`${url}#027-success`}></use>
//     </svg>
//     <h5 className="white-text">Verifica tu autoescuela y consigue más alumnos.</h5>
//   </div>
//   <div className="col xl4 margin-top-35">
//     <svg className="icon">
//       <use xlinkHref={`${url}#015-payment`}></use>
//     </svg>
//     <h5 className="white-text">Publica tus precios y promociones.</h5>
//   </div>
//   <div className="col xl4 margin-top-35">
//     <svg className="icon">
//       <use xlinkHref={`${url}#039-driving-school-2`}></use>
//     </svg>
//     <h5 className="white-text">Muestra tus vehículos y mejora tu visibilidad en Google</h5>
//   </div>
// </div>
