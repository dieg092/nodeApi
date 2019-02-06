import axios from 'axios';
import { FETCH_USERS, USER_CLICKED, USER_CHANGE_STATE, USER_SAVED, USER_LOGGED, USER_SIGN_UP } from './types';
import M from "materialize-css/dist/js/materialize.min.js";

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/user/current_user');

  dispatch({ type: USER_LOGGED, payload: res.data });
};

export const submitSignUp = (values, history) => async dispatch => {
  const res = await axios.post('/api/user/signup', values);

  if (res.data === 'OK') {
     window.M.toast({html: '¡Usuario Creado!', classes: 'rounded'});
     dispatch({ type: USER_SIGN_UP, payload: values.emailRemember, error: '' });
  } else if (res.data === 'Mail exists') {
     dispatch({ type: USER_SIGN_UP, payload: '', error: 'Correo en uso' });
  } else {
     dispatch({ type: USER_SIGN_UP, payload: '', error: 'Error del Servidor, inténtelo de nuevo.' });
  }
};

export const submitLogin = (values, history) => async dispatch => {
  let val = {
    email: values.email ? values.email : values.emailAccess,
    password: values.password ? values.password : values.passwordAccess
  }
  console.log(val)
  const res = await axios.post('/api/uaser/login', val);

  if (res.data === 'OK') {
     dispatch({ type: USER_LOGGED, payload: res.data });
  } else {
     dispatch({ type: USER_LOGGED, payload: res.data });
  }
};
