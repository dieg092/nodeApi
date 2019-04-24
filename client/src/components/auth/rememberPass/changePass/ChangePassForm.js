//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { compose } from "redux"
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import AuthField from '../../login/AuthField';
import formFields from './formFields';
import * as actions from '../../../../actions';
//import Footer from '../../../containers/Footer';
const url = '/images/sprite.svg';
const height = $( window ).height() * 0.3;

class ChangePassForm extends Component {
  componentDidMount() {
      this.props.existToken(this.props.lang, this.props.history)
  }

  onSubmitRequest() {
    this.props.submitChangePass(this.props.changePassForm.values, this.props.history, this.props.lang, this.props.fields);
  }

  renderFields() {
    return _.map(formFields(this.props.fields), ({ label, name, type, icon }) => {
      return <Field key={name} label={label} type={type} name={name} icon={icon} component={AuthField} />
    });
  }

  render() {
    return (
      <div className="row margin-bottom-0">
        <div className="col s12 m8 l8 xl8 in-the-middle">
        <div id="no-responsive" className="center-align">

          <svg className="icon">
            <use xlinkHref={`${url}#002-car-key`}></use>
          </svg>

          <h4 className="white-text padding-top-3vh">  {this.props && this.props.fields && this.props.fields.LOG_IN && this.props.fields.LOG_IN.new_password}</h4>

        </div>
            <div className="card col s12 m12 l6 xl6 offset-xl3 offset-l2 margin-top-7vh">
              <div className="card-content">
                <p id="responsive" className="center font-35-custom">  {this.props && this.props.fields && this.props.fields.LOG_IN && this.props.fields.LOG_IN.new_password}</p>
                <div className="body-login">
                    <form onSubmit={this.props.handleSubmit(this.onSubmitRequest.bind(this))}>
                      {this.renderFields()}

                      {this.props && this.props.errores &&
                        <p className="red-text">{this.props.errores}</p>
                      }
                      <div className="card-action center">
                        <button type="submit" className="btn-large waves-effect waves-light white-text no-uppercase" disabled={!this.props.invalid ? false : true}>
                          {this.props && this.props.fields && this.props.fields.SAVE}
                        </button>
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

function mapStateToProps(state) {
  const changePassForm = state.form.changePassForm;
  const errores = state.user.errorChangePass;
  const lang = state.general.lang;
  const fields = state.general.fields;

  return { changePassForm, errores, lang, fields };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    validate,
    form: 'changePassForm',
    destroyOnUnmount: false
  })
)(withRouter(ChangePassForm));
