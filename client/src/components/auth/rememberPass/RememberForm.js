//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { compose } from "redux"
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import AuthField from '../login/AuthField';
import validateEmail from '../../../utils/validateEmail';
import formFields from './formFields';
import * as actions from '../../../actions';

class RememberForm extends Component {
  onSubmitRequest() {
    this.props.submitRemember(this.props.rememberForm.values, this.props.history, this.props.lang, this.props.fields);
  }

  renderFields() {
    return _.map(formFields(this.props.fields), ({ label, name, type, icon }) => {
      return <Field key={name} label={label} type={type} name={name} icon={icon} component={AuthField} />
    });
  }

  render() {
    return (
        <div>
          <form onSubmit={this.props.handleSubmit(this.onSubmitRequest.bind(this))}>
            <div className="card-content margin-top-28">
              {this.renderFields()}
            </div>
            {this.props && this.props.errores &&
              <p className="red-text">{this.props.errores}</p>
            }
            <div className="card-action center col s12">
              <div className="card-action center">
                <button type="submit" className="btn-large waves-effect waves-light white-text no-uppercase" disabled={!this.props.invalid ? false : true}>
                  {this.props && this.props.fields && this.props.fields.LOG_IN && this.props.fields.LOG_IN.send_request}
                </button>
              </div>
            </div>
          </form>
        </div>
    );
  }
}

const validate = (values, props) => {
  const errors = {};

  errors.emailRemember = validateEmail(values.emailRemember || '', props.fields);

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

function mapStateToProps(state) {
  const errores  = state.user.errorRemember;
  const rememberForm = state.form.rememberForm;
  const lang = state.general.lang;
  const fields = state.general.fields;

  return { rememberForm, errores, lang, fields };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    validate,
    form: 'rememberForm',
    destroyOnUnmount: false
  })
)(withRouter(RememberForm));
