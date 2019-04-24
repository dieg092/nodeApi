//import axios from 'axios';
import {
  CLOSE_MODAL,
  //CONTACT_MESSAGE,
  SET_LANGUAGE,
  REQUEST_ACCESS_MODAL
} from './types';
import M from "materialize-css/dist/js/materialize.min.js";
//import $ from 'jquery';
//import CONSTANTS from '../utils/constants';
import * as LANGS from '../langs';

export const setLanguage = (lang) => async dispatch => {
  dispatch({ type: SET_LANGUAGE, payload: LANGS[lang], lang: lang });
};

export const closeModal = (modal) => {
  let elem = document.getElementById(modal);

  const instance = M.Modal.getInstance(elem);
  instance.close();

  return {
    type: CLOSE_MODAL
  };
};

export const rememberPass = () => {
  let login = document.getElementById('modal-login');
  let remember = document.getElementById('modal-remember');

  M.Modal.getInstance(login).close();
  M.Modal.getInstance(remember).open();

  return {
    type: REQUEST_ACCESS_MODAL
  };
};

export const requestAccessModal = () => {
  let login = document.getElementById('modal-login');
  let request = document.getElementById('modal-request');

  M.Modal.getInstance(login).close();
  M.Modal.getInstance(request).open();

  return {
    type: REQUEST_ACCESS_MODAL
  };
}

export const loginAccessModal = () => {
  let login = document.getElementById('modal-login');
  let request = document.getElementById('modal-request');

  M.Modal.getInstance(login).open();
  M.Modal.getInstance(request).close();

  return {
    type: REQUEST_ACCESS_MODAL
  };
}

export const showConditions = () => {
  let conditions = document.getElementById('modal-conditions');
  M.Modal.getInstance(conditions).open();

  return {
    type: CLOSE_MODAL
  };
}
