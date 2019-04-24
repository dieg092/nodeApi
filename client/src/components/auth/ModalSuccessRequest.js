import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class ModalSuccessRequest extends Component {
  closeModal() {
    this.props.closeModal('modal-success-request');

  }

  render() {
     console.log(this.props)

    return (
      <div id="success-request">
        <div id="modal-success-request" className="modal container-body">
        <i className="material-icons left grey-text text-darken-2 pointer close-icon" onClick={this.closeModal.bind(this)}>clear</i>
        <p className="margin-bottom-0 font-35-custom margin-top-0 center modal-title">{this.props && this.props.fields && this.props.fields.VERIFY_MODAL && this.props.fields.VERIFY_MODAL.title}</p>
          <div className="modal-content padding-top-0">
            <div className="body-login padding-top-0">

              <div className="card-content margin-top-28">
                <p className="margin-bottom-20 font-20-custom margin-top-0">{this.props && this.props.fields && this.props.fields.VERIFY_MODAL && this.props.fields.VERIFY_MODAL.description} <span className="teal-text">{this.props.emailSignUp}</span></p>
                <p className="font-18-custom margin-top-0">{this.props && this.props.fields && this.props.fields.VERIFY_MODAL && this.props.fields.VERIFY_MODAL.advise}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

function mapStateToProps({ user, general }) {
  const { emailSignUp } = user;
  const { fields } = general;

  return { emailSignUp, fields };
}

export default connect(mapStateToProps, actions)(ModalSuccessRequest);
