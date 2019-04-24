import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import LoginFormModal from './login/LoginFormModal';

class ModalLogin extends Component {
  onCloseModal() {
    this.props.closeModal('modal-login')
  }

  onRequestAccess() {
    this.props.requestAccessModal();
  }

  onRememberPass() {
    this.props.rememberPass();
  }

  render() {
    return (
      <div id="login">
        <div id="modal-login" className="modal container-body">
        <i  onClick={this.onCloseModal.bind(this)} className="material-icons left grey-text text-darken-3 pointer close-icon">clear</i>
        <p className="margin-bottom-0 font-35-custom margin-top-0 center modal-title">{this.props && this.props.fields && this.props.fields.LOG_IN && this.props.fields.LOG_IN.title}</p>

          <div className="modal-content padding-top-0">
              <div className="body-login padding-top-0">
                <LoginFormModal />
                <div className="center margin-top-20">
                  <a className="teal-text pointer" onClick={this.onRememberPass.bind(this)}>{this.props && this.props.fields && this.props.fields.LOG_IN && this.props.fields.LOG_IN.remember}</a>
                </div>
                <div className="center request-access margin-top-5">
                  <span>{this.props && this.props.fields && this.props.fields.LOG_IN && this.props.fields.LOG_IN.hasAccount} <a className="teal-text pointer bold" onClick={this.onRequestAccess.bind(this)}>{this.props && this.props.fields && this.props.fields.SIGN_UP && this.props.fields.SIGN_UP.title}</a></span>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps({ general }) {
    const { fields } = general;
    return { fields };
}

export default connect(mapStateToProps, actions)(ModalLogin);
