import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import RememberForm from './rememberPass/RememberForm';

class ModalRememberPass extends Component {
  closeModal() {
    this.props.closeModal('modal-remember')
  }

  render() {
    return (
      <div id="remember">
        <div id="modal-remember" className="modal container-body">
          <i  onClick={this.closeModal.bind(this)} className="material-icons left grey-text text-darken-3 pointer close-icon">clear</i>
          <p className="margin-bottom-20 font-35-custom margin-top-0 center modal-title">{this.props && this.props.fields && this.props.fields.LOG_IN && this.props.fields.LOG_IN.forgotten}</p>

          <div className="modal-content padding-top-0">
            <div className="body-login padding-top-0">
              <RememberForm />
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
)(ModalRememberPass);
