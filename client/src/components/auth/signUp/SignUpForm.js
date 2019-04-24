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

class SignUpFormRequest extends Component {
  constructor(props) {
    super(props);

    this.state = { termsClicked: false };
  }
  renderFields() {
    let formF = formFields;

    return _.map(formF(this.props.fields), ({ label, name, type, icon }) => {
      return <Field key={name} label={label} type={type} name={name} icon={icon} component={AuthField} />
    });
  }

  onSubmitSignUp(event) {
    event.preventDefault();

    if (($("#termino").is(':checked') || $("#terminos").is(':checked')) && !this.props.invalid) {
      this.setState({ termsClicked: false });
      this.props.submitSignUp(this.props.signUpForm.values, this.props.history, this.props.lang, this.props.fields);
    } else {
      this.setState({ termsClicked: true });
    }
  }

  onShowConditions(event) {
    event.preventDefault();
    this.props.showConditions();
  }

  render() {
    return (
        <div>
          <form onSubmit={this.onSubmitSignUp.bind(this)}>
            <div className="card-content">
              {this.renderFields()}

                <p className="margin-left-7">
                    <label>
                      <input id="terminos" name="terminos" type="checkbox" />
                      <span style={{ cursor: 'default ' }}>{this.props && this.props.fields && this.props.fields.CONDITIONS && this.props.fields.CONDITIONS.pre_title} <a className="pointer" onClick={this.onShowConditions.bind(this)}>{this.props && this.props.fields && this.props.fields.CONDITIONS && this.props.fields.CONDITIONS.title}</a></span>
                    </label>
                  </p>
                {this.state.termsClicked && <p className="red-text">{this.props && this.props.fields && this.props.fields.CONDITIONS && this.props.fields.CONDITIONS.you_must}</p>}

            </div>

            {this.props && this.props.errorSignUp &&
                <p className="red-text margin-left-35">{this.props.errorSignUp}</p>
            }
            <div className="card-action center">
              <button type="submit" className="btn-large waves-effect waves-light white-text no-uppercase" disabled={!this.props.invalid ? false : true}>
              {this.props && this.props.fields && this.props.fields.SIGN_UP && this.props.fields.SIGN_UP.me_title}
              </button>
            </div>
          </form>
        </div>
    );
  }
}

const validate = ( values, props )  => {
  const errors = {};

  errors.emailSignUp = validateEmail(values.emailSignUp || '', props.fields);
  errors.passwordSignUp = passwordStrong(values.passwordSignUp || '', props.fields);
  errors.passwordSignUpRepeat = passwordsCompare(values.passwordSignUp, values.passwordSignUpRepeat || '', props.fields);

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
  const lang = state.general.lang;
  const fields = state.general.fields;

  return { signUpForm, errorSignUp, lang, fields };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    validate,
    form: 'signUpForm',
    destroyOnUnmount: false
  })
)(withRouter(SignUpFormRequest));
