import * as actionTypes from "./actionTypes";

export const fetchDataSuccess = value => {
  return {
    type: actionTypes.FETCH_DATA_SUCCESS,
    value,
  };
};
export const fetchDataFailed = () => {
  return {
    type: actionTypes.FETCH_DATA_FAILED,
  };
};
export const fetchDataClear = () => {
  return {
    type: actionTypes.FETCH_DATA_CLEAR,
  };
};
