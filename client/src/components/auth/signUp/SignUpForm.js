//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { compose } from "redux"
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import AuthField from './AuthField';
import * as actions from '../../../actions';
import formFields from './formFields';
import validateEmail from '../../../utils/validateEmail';
import passwordStrong from '../../../utils/passwordStrong';
import passwordsCompare from '../../../utils/passwordsCompare';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { termsClicked: false };
  }
  renderFields() {
    let formF = formFields;

    return _.map(formF, ({ label, name, type, icon }) => {
      return <Field key={name} label={label} type={type} name={name} icon={icon} component={AuthField} />
    });
  }

  onSubmitSignUp(event) {
    event.preventDefault();

    if ($("#termino").is(':checked') || $("#terminos").is(':checked') && !this.props.invalid) {
      this.setState({ termsClicked: false });
      this.props.submitSignUp(this.props.signUpForm.values, this.props.history);
    } else {
      this.setState({ termsClicked: true });
    }

  }

  onShowConditions(event) {
    event.preventDefault();
    //this.props.showConditions();
  }

  render() {
    console.log(this.props.invalid)
    return (
        <div>
          <form onSubmit={this.onSubmitSignUp.bind(this)}>
            <div className="card-content">
              {this.renderFields()}

                <p className="margin-left-7">
                    <label>
                      <input id={this.props.clientAccess ? 'terminos' : 'termino'} name="terminos" type="checkbox" />
                      <span style={{ cursor: 'default ' }}>Acepto los <a className="pointer" onClick={this.onShowConditions.bind(this)}>Términos y condicioes</a></span>

                    </label>
                  </p>
                {this.state.termsClicked && <p className="red-text">Tienes que aceptar los términos y condiciones</p>}

            </div>

            {this.props && this.props.errorSignUp &&
                <p className="red-text margin-left-35">{this.props.errorSignUp}</p>
            }
            <div className="card-action center">
              <button type="submit" className="btn-large teal btn-flat white-text no-uppercase" disabled={!this.props.invalid ? false : true}>
                Registrarme
              </button>
            </div>
          </form>
        </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.emailSignUp = validateEmail(values.emailSignUp || '');
  errors.passwordSignUp = passwordStrong(values.passwordSignUp || '');
  errors.passwordSignUpRepeat = passwordsCompare(values.passwordSignUp, values.passwordSignUpRepeat || '', '');

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

function mapStateToProps(state) {
  const signUpForm = state.form.signUpForm;
  const errorSignUp = state.user.errorSignUp;

  return { signUpForm, errorSignUp };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    validate,
    form: 'signUpForm',
    destroyOnUnmount: false
  })
)(withRouter(SignUpForm));
