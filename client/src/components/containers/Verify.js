import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Footer from './Footer';
//import M from "materialize-css/dist/js/materialize.min.js";
//import $ from 'jquery';
import * as actions from '../../actions';
//import { Card } from '../containers/common';
//import CONSTANTS from '../../utils/constants';

const url = '/images/sprite.svg';


class Verify extends Component {
  render() {
    return (
      <div className="row margin-bottom-0">
        <div className="col s12 m6 l6 xl6 offset-l3 offset-m3 offset-xl3 margin-top-7vh">
          <div id="no-responsive" className="center-align">
              <svg className="icon">
                <use xlinkHref={`${url}#027-success`}></use>
              </svg>
              <h4 className="white-text padding-top-3vh">{this.props && this.props.fields && this.props.fields.VERIFY && this.props.fields.VERIFY.title}</h4>
          </div>
            <div className="card col s12 m12 l12 xl12  margin-top-7vh">
              <div className="card-content">
                <p id="responsive" className="center font-35-custom">{this.props && this.props.fields && this.props.fields.VERIFY && this.props.fields.VERIFY.title}</p>
                <div className="body-login">

                  <div className="center margin-top-10">
                    <h5>{this.props && this.props.fields && this.props.fields.VERIFY && this.props.fields.VERIFY.description}</h5>
                    <div className="center margin-top-35">
                    <Link to={"/" + this.props.lang + "/login"} >
                      <button type="submit" className="btn-large waves-effect waves-light white-text no-uppercase margin-top-20">
                        {this.props && this.props.fields && this.props.fields.LOG_IN && this.props.fields.LOG_IN.title}
                      </button>
                      </Link>
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
   const { userLogged, locale } = user;
   const { fields, lang } = general;
   return { userLogged, fields, locale, lang };
}

export default connect(mapStateToProps, actions)(withRouter(Verify));
