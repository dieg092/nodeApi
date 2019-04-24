import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import M from "materialize-css/dist/js/materialize.min.js";
import $ from 'jquery';


window.jQuery = $;

class HeaderAdmin extends Component {
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
      <div className={this.props.isHeaderAbsolute ? "header-absolute" : "header" }>
        <nav className="no-shadows transp">
          <div className={this.props.isHeaderAbsolute ? "nav-wrapper" : "nav-wrapper nav-color"}>
            <a href="/"><img alt="iasegestion" className="brand-logo logo-header" src={'/images/udemy.png'} /></a>
            <a data-target="menu" className="sidenav-trigger pointer"><i className="material-icons margin-top-10 black-text">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><a href="/api/user/logout" data-target="modal-client-access" className="modal-trigger black-text">{this.props && this.props.fields && this.props.fields.LOG_OUT}</a></li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav pointer" id="menu">
          <li><a href="/api/user/logout" data-target="modal-login" className="modal-trigger black-text">{this.props && this.props.fields && this.props.fields.LOG_OUT}</a></li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ user, general }) {
   const { userLogged } = user;
   const { fields } = general;
   return { userLogged, fields };
}

export default connect(mapStateToProps, actions)(withRouter(HeaderAdmin));
