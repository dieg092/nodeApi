import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class ModalSuccessRemember extends Component {
  closeModal() {
    this.props.closeModal('modal-success-remember');
  }

  render() {
    return (
      <div id="success-remember">
        <div id="modal-success-remember" className="modal container-body">
            <i  onClick={this.closeModal.bind(this)} className="material-icons left grey-text text-darken-3 pointer close-icon">clear</i>
            <p className="margin-bottom-20 font-35-custom margin-top-0 center modal-title">{this.props && this.props.fields && this.props.fields.REGENERATE_MODAL && this.props.fields.REGENERATE_MODAL.title}</p>
            <div className="body-login padding-top-0">
              <div className="card-content margin-top-28 padding-top-0 remember-success">
                <p className="margin-bottom-20 font-20-custom margin-top-0">{this.props && this.props.fields && this.props.fields.REGENERATE_MODAL && this.props.fields.REGENERATE_MODAL.description} <span className="teal-text">{this.props.emailRemember}</span></p>
                <p className="margin-bottom-20 font-20-custom margin-top-28">{this.props && this.props.fields && this.props.fields.REGENERATE_MODAL && this.props.fields.REGENERATE_MODAL.advise}</p>
              </div>
            </div>
          </div>
      </div>
    );
  };
};

function mapStateToProps({ user, general }) {
  const { emailRemember } = user;
  const { fields } = general;

  return { emailRemember, fields };
}

export default connect(mapStateToProps, actions)(ModalSuccessRemember);
