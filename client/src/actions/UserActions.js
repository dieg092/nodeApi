import axios from 'axios';
import {
//  FETCH_USERS,
//  USER_CLICKED,
//  USER_CHANGE_STATE,
//  USER_SAVED,
  USER_LOGGED,
  USER_SIGN_UP,
  USER_REMEMBER_SUCCESS,
  USER_REMEMBER_FAIL,
  USER_CHANGE_PASS_SUCCESS,
  USER_CHANGE_PASS_FAIL
} from './types';
import $ from 'jquery';
import M from "materialize-css/dist/js/materialize.min.js";


window.jQuery = $;
//import M from "materialize-css/dist/js/materialize.min.js";

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/user/current_user');

  if(!res.data.user) {
    dispatch({ type: USER_LOGGED, payload: 0, locale: res.data.locale });
  } else {
    dispatch({ type: USER_LOGGED, payload: res.data.user, locale: res.data.locale });
  }
};

export const submitSignUp = (values, history, lang, fields) => async dispatch => {
  console.log(fields)
  const email = values && values.emailSignUp ? values.emailSignUp : (values && values.emailSignUpRequest ? values.emailSignUpRequest : null);
  const pass = values && values.passwordSignUp ? values.passwordSignUp : (values && values.passwordSignUpRequest ? values.passwordSignUpRequest : null);
  const passRepeat = values && values.passwordSignUpRepeat ? values.passwordSignUpRepeat : (values && values.passwordSignUpRepeatRequest ? values.passwordSignUpRepeatRequest : null);

  let val = null;
  if (email && pass) {
    val = {
      email: email,
      password: pass,
      passRepeat: passRepeat,
      lang: lang
    }
  }

  const res = await axios.post('/api/user/signup' , val);

  if (res.data === 'OK') {
     //window.M.toast({html: '¡Usuario Creado!', classes: 'rounded'});

     const request = document.getElementById('modal-request');
     const login = document.getElementById('modal-login');
     const succesRequest = document.getElementById('modal-success-request');

     M.Modal.getInstance(request).close();
     M.Modal.getInstance(login).close();
     M.Modal.getInstance(succesRequest).open();
     console.log(val)
     dispatch({ type: USER_SIGN_UP, payload: val.email, error: '' });
  } else if (res.data === 'Mail exists') {
     dispatch({ type: USER_SIGN_UP, payload: '', error: fields.ERROR && fields.ERROR.email_used });
  } else {
     dispatch({ type: USER_SIGN_UP, payload: '', error: fields.ERROR && fields.ERROR.server_error });
  }
};

export const submitLogin = (values, history, fields) => async dispatch => {
  const email = values && values.email ? values.email : (values && values.emailAccess ? values.emailAccess : null);
  const pass = values && values.password ? values.password : (values && values.passwordAccess ? values.passwordAccess : null);

  let val = null;
  if (email && pass) {
    val = {
      email: email,
      password: pass
    }
  }

  if (val) {
    const res = await axios.post('/api/user/login', val);

    if (res.data && !res.data.user) {
      window.M.toast({html: fields.ERROR && fields.ERROR.bad_credentials, classes: 'rounded'});

      dispatch({ type: USER_LOGGED, payload: 0 });
    } else {
      dispatch({ type: USER_LOGGED, payload: res.data.user });
      history.push('/' + res.data.locale)
    }
  } else {
    dispatch({ type: USER_LOGGED, payload: 0, errorLogin: fields.ERROR && fields.ERROR.fill_fields });
  }

};


export const submitRemember = (values, history, lang, fields) => async dispatch => {
  values.lang = lang;
  const res = await axios.post('/api/user/remember/' + lang, values);

  const remember = document.getElementById('modal-remember');
  const succesRemember = document.getElementById('modal-success-remember');

  if (res.data === 'OK') {
     M.Modal.getInstance(remember).close();
     M.Modal.getInstance(succesRemember).open();
     dispatch({ type: USER_REMEMBER_SUCCESS, payload: values.emailRemember });
  } else {
     dispatch({ type: USER_REMEMBER_FAIL, payload: '', error: fields.ERROR && fields.ERROR.no_email });
  }
};

export const existToken = (lang, history) => async dispatch => {
    const token = history.location.pathname.split('/')[3];
    const res = await axios.get('/api/user/' + lang + '/' + token);

    if (res.data === "OK") {
       dispatch({ type: USER_CHANGE_PASS_SUCCESS, payload: '' });
    } else {
      history.push('/' + lang)
       dispatch({ type: USER_CHANGE_PASS_FAIL, payload: '' });
    }
}

export const submitChangePass = (values, history, lang, fields) => async dispatch => {
  if (values.contrasenaRemember === values.repetirContrasenaRemember) {
    const token = history.location.pathname.split('/')[3];
    const res = await axios.post('/api/user/remember/' + lang + '/'+ token, values);

    if (res.data === "OK") {
       window.M.toast({html: fields.ERROR && fields.ERROR.pass_changed, classes: 'rounded'});
       history.push('/');
       dispatch({ type: USER_CHANGE_PASS_SUCCESS, payload: '' });
    } else {
       dispatch({ type: USER_CHANGE_PASS_FAIL, payload: fields.ERROR && fields.ERROR.saving_pass });
    }
  } else {
    dispatch({ type: USER_CHANGE_PASS_FAIL, payload: fields.ERROR && fields.ERROR.no_match_emails });
  }
};
