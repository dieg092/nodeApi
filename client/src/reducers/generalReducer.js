import {
  SET_LANGUAGE,
} from '../actions/types';
import CONSTANTS from '../utils/constants'

const INITIAL_STATE = {
  fields: null,
  lang: CONSTANTS.DEFAULT_LANG
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_LANGUAGE:
      return { ...state, fields: action.payload, lang: action.lang };
    default:
      return state;
  }
}
