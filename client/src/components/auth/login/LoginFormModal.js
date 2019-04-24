//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { compose } from "redux"
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import AuthField from './AuthField';
import * as actions from '../../../actions';
import validateEmail from '../../../utils/validateEmail';
import formFieldsClientAccess from './formFieldsClientAccess';

class LoginFormModal extends Component {
  renderFields() {
    let formF = formFieldsClientAccess(this.props.fields);

    return _.map(formF, ({ label, name, type, icon }) => {
      return <Field key={name} label={label} type={type} name={name} icon={icon} component={AuthField} />
    });
  }

  onSubmitLogin(event) {
    event.preventDefault();
    this.props.submitLogin(this.props.loginForm.values, this.props.history, this.props.fields);
  }

  render() {
    return (
        <div>
          <form onSubmit={this.onSubmitLogin.bind(this)}>
            <div className="card-content">
              {this.renderFields()}
            </div>
            {this.props && this.props.errorLogin &&
                <p className="red-text">{this.props.errorLogin}</p>
            }
            <div className="card-action center">
              <button type="submit" className="btn-large waves-effect waves-light white-text no-uppercase" disabled={!this.props.invalid ? false : true}>
                {this.props && this.props.fields && this.props.fields.LOG_IN && this.props.fields.LOG_IN.title}
              </button>
            </div>
          </form>
        </div>
    );
  }
}

const validate = (values, props) => {
  const errors = {};

  errors.emailAccess = validateEmail(values.emailAccess || '', props.fields);

  _.each(formFieldsClientAccess, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

function mapStateToProps(state) {
  const loginForm = state.form.loginFormModal;
  const fields = state.general.fields;
  const errorLogin = state.user.errorLogin;

  return { loginForm, errorLogin, fields };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    validate,
    form: 'loginFormModal',
    destroyOnUnmount: false
  })
)(withRouter(LoginFormModal));
// <p className="margin-left-7">
//   <label>
//     <input type="checkbox" />
//     <span>Recordar correo</span>
//   </label>
// </p>
