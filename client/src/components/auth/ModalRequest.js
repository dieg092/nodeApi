import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import SignUpFormRequest from './signUp/SignUpFormRequest';

class ModalRequest extends Component {
  closeModal() {
    this.props.closeModal('modal-request')
  }

  onLoginAccess() {
    this.props.loginAccessModal();
  }

  render() {
    return (
      <div id="request">
        <div id="modal-request" className="modal container-body">
        <i  onClick={this.closeModal.bind(this)} className="material-icons left grey-text text-darken-3 pointer close-icon">clear</i>
        <p className="margin-bottom-20 font-35-custom margin-top-0 center modal-title">{this.props && this.props.fields && this.props.fields.SIGN_UP && this.props.fields.SIGN_UP.title}</p>

          <div className="modal-content padding-top-0">

            <div className="body-login padding-top-0">
              <SignUpFormRequest />
              <div className="center request-access margin-top-5">
                <span>{this.props && this.props.fields && this.props.fields.SIGN_UP && this.props.fields.SIGN_UP.hasAccount}
                  <a className="teal-text pointer bold" onClick={this.onLoginAccess.bind(this)}> {this.props && this.props.fields && this.props.fields.LOG_IN && this.props.fields.LOG_IN.title}</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

function mapStateToProps({ general }) {
    const { fields } = general;
    return { fields };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
   form: 'requestForm'
  })
)(ModalRequest);
