import {
  FETCH_USERS,
  USER_CLICKED,
  USER_CHANGE_STATE,
  USER_LOGGED,
  USER_SIGN_UP
} from '../actions/types';

const INITIAL_STATE = {
  users: null,
  userSelected: null,
  pages: null,
  page: 1,
  errorLogin: '',
  errorSignUp: ''
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
    return { ...state, userLogged: action.payload, errorLogin: '' };
    case USER_SIGN_UP:
      return { ...state, emailRemember: action.payload, errorSignUp: action.error };
    default:
      return state;
  }
}
