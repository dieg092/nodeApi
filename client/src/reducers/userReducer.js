import {
  FETCH_USERS,
  USER_CLICKED,
  USER_CHANGE_STATE,
  USER_LOGGED,
  USER_SIGN_UP,
  SUBMIT_REQUEST_SUCCESS,
  SUBMIT_REQUEST_ERROR,
  USER_REMEMBER_SUCCESS,
  USER_REMEMBER_FAIL,
  USER_CHANGE_PASS_SUCCESS,
  USER_CHANGE_PASS_FAIL
} from '../actions/types';
import CONSTANTS from '../utils/constants';

const INITIAL_STATE = {
  users: null,
  userSelected: null,
  userLogged: null,
  pages: null,
  page: 1,
  errorLogin: '',
  errorSignUp: '',
  locale: CONSTANTS.DEFAULT_LANG,
  emailSignUp: '',
  emailRemember: '',
  error: '',
  errorRemember: '',
  errorChangePass: ''
};

export default function(state = INITIAL_STATE, action) {

  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload.docs, pages: action.payload.pages, page: action.payload.page  };
    case USER_CLICKED:
      return { ...state, userSelected: action.payload };
    case USER_CHANGE_STATE:
      return { ...state, userSelected: null };
    case USER_LOGGED:
    return { ...state, userLogged: action.payload, locale: action.locale, errorLogin: action.errorLogin ? action.errorLogin : '' };
    case USER_SIGN_UP:
      return { ...state, emailSignUp: action.payload, errorSignUp: action.error };
    case SUBMIT_REQUEST_SUCCESS:
      return { ...state, emailSignUp: action.payload, error: '' };
    case SUBMIT_REQUEST_ERROR:
      return { ...state, emailSignUp: action.payload, error: action.payload };
    case USER_REMEMBER_SUCCESS:
      return { ...state, emailRemember: action.payload, errorRemember: '' };
    case USER_REMEMBER_FAIL:
      return { ...state, emailRemember: action.payload, errorRemember: action.error };
    case USER_CHANGE_PASS_SUCCESS:
      return { ...state, errorChangePass: '' };
    case USER_CHANGE_PASS_FAIL:
      return { ...state, errorChangePass: action.payload };
    default:
      return state;
  }
}
