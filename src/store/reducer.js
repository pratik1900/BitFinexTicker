import * as actionTypes from "./actionTypes";

const initialState = {
  data: null,
  loader: true,
  errors: null,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.value,
        errors: null,
        loader: false,
      };
    case actionTypes.FETCH_DATA_FAILED:
      return {
        ...state,
        data: null,
        errors: "Something Went Wrong! Please try again.",
        loader: false,
      };
    case actionTypes.FETCH_DATA_CLEAR:
      return {
        ...state,
        data: null,
        errors: null,
        loader: false,
      };
    default:
      return state;
  }
}
