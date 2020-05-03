// Although there is only one function here so far, let us import the whole file 
// since we will be adding more later
import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';


// This pattern should be familiar to you from the full stack project
// Build Constants
export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';

// Regular Action Creators
export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

// Thunk Action Creator
export const logout = () => dispatch => {
  // Remove the token from local storage
  localStorage.removeItem('jwtToken')
  // Remove the token from the common axios header
  APIUtil.setAuthToken(false)
  // Dispatch a logout action
  dispatch(logoutUser())
};

