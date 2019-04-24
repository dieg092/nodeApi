import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
//import M from "materialize-css/dist/js/materialize.min.js";
//import $ from 'jquery';
import * as actions from '../../actions';
//import { Card } from '../containers/common';
//import CONSTANTS from '../../utils/constants';

const url = '/images/sprite.svg';

class Footer extends Component {
  render() {
    return (
      <div class="row col s12 center container-footer">
        <div class="row margin-top-20">
          <div class="col m4 s12 padding-top-15">
            <h3 className="font-weight-600 font-h3-small-rem">DriveDemy</h3>
            <a><h5 className="link">Busca tu autoescuela</h5></a>
            <a><h5 className="link">Test Online</h5></a>
            <a><h5 className="link">Prensa</h5></a>
            <a><h5 className="link">Ayuda</h5></a>
          </div>
          <div class="col m4 s12 padding-top-15">
            <h3 className="font-weight-600 font-h3-small-rem">Autoescuelas</h3>
            <a><h5 className="link">Registra tu autoescuela</h5></a>
            <a><h5 className="link">Área privada</h5></a>
            <a><h5 className="link">condiciones</h5></a>
            <a><h5 className="link">F.A.Q</h5></a>
          </div>
          <div class="col m4 s12 padding-top-15 margin-top-90">
            <a><h5 className="link">Términos y condiciones</h5></a>
            <a><h5 className="link">Política de privacidad</h5></a>
            <a><h5 className="link">Sitemap</h5></a>
          </div>
        </div>
        <div class="col s12">
          <h5 className="copyright padding-top-20 margin-bottom-20">@ 2019 DriveDemy, All Rights Reserved</h5>
        </div>
      </div>

    );
  }
}

function mapStateToProps({ user, general }) {
   const { userLogged, locale } = user;
   const { fields, lang } = general;
   return { userLogged, fields, locale, lang };
}

export default connect(mapStateToProps, actions)(withRouter(Footer));
