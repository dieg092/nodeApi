import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../../actions';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';
import ModalRequest from '../auth/ModalRequest';
import ModalRememberPass from '../auth/ModalRememberPass';
import ModalLogin from '../auth/ModalLogin';
import ModalSuccessRequest from '../auth/ModalSuccessRequest';
import ModalSuccessRemember from '../auth/ModalSuccessRemember';
import ModalConditions from '../auth/ModalConditions';

window.jQuery = $;

class Header extends Component {
  componentDidMount() {
    const elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem,
      {
        edge: "left",
        inDuration: 250
      }
    );

    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
  }

  render() {
    const width = $( document ).width();
    if (width >= 993) {
      const elem = document.getElementsByClassName("sidenav");
      if (elem && elem[0]) {
          M.Sidenav.getInstance(elem[0]).close();
      }
    }

    return (
      <div id="head" className={this.props.isHeaderAbsolute  || this.props.isHeaderAbsoluteOpacity ? "header-absolute white-text" : "header white-text" }>
        <nav className={this.props.isHeaderAbsoluteOpacity ? 'no-shadows transp-0' : 'no-shadows transp-6'}>
          <div className={this.props.isHeaderAbsolute || this.props.isHeaderAbsoluteOpacity ? "nav-wrapper" : "nav-wrapper nav-color"}>
            <a href="/"><img alt="iasegestion" className="brand-logo logo-header" src={'/images/udemy.png'} /></a>
            <a data-target="menu" className="sidenav-trigger pointer"><i className="material-icons margin-top-10 black-text">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><Link to={"/" + this.props.lang + "/signup"} data-target="modal-request" className="modal-trigger black-text">{this.props && this.props.fields && this.props.fields.SIGN_UP && this.props.fields.SIGN_UP.title}</Link></li>
              <li><Link to={"/" + this.props.lang + "/login"} data-target="modal-login" className="modal-trigger black-text">{this.props && this.props.fields && this.props.fields.LOG_IN && this.props.fields.LOG_IN.title}</Link></li>

            </ul>
          </div>
        </nav>

        <ul className="sidenav pointer" id="menu">
          <li><Link to={"/" + this.props.lang + "/signup"} data-target="modal-request" className="modal-trigger black-text">{this.props && this.props.fields && this.props.fields.SIGN_UP && this.props.fields.SIGN_UP.title}</Link></li>
          <li><Link to={"/" + this.props.lang + "/login"} data-target="modal-login" className="modal-trigger black-text">{this.props && this.props.fields && this.props.fields.LOG_IN && this.props.fields.LOG_IN.title}</Link></li>
        </ul>
        <ModalRequest />
        <ModalRememberPass />
        <ModalLogin />
        <ModalSuccessRequest />
        <ModalSuccessRemember />
        <ModalConditions />
      </div>
    );
  }
}

function mapStateToProps({ user, general }) {
   const { userLogged } = user;
   const { fields, lang } = general;
   return { userLogged, fields, lang };
}

export default withRouter(connect(mapStateToProps, actions)(Header));
