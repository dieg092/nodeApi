import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import userReducer from './userReducer';
import generalReducer from './generalReducer';

export default combineReducers({
  form: reduxForm,
  user: userReducer,
  general: generalReducer
});
