import axios from "axios";
import {
  LOGIN_FAIL,
  LOGIN_PROCESS,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_PROCESS,
  REGISTER_SUCCESS,
  CLEAR_ERROR,
  LOAD_USER_PROCESS,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER,
  LOGOUT_USER_FAIL,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_PROCESS,
  UPDATE_PROFILE_SUCCESS,
  CHANGE_PASSWORD_PROCESS,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  SEND_EMAIL_PROCESS,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAIL,
  FORGOT_PASSWORD_PROCESS,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  GET_ALL_USERS_PROCESS,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_SUCCESS,
  GET_SINGLE_USER_PROCESS,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_FAIL,
  UPDATE_USER_STATUS_PROCESS,
  UPDATE_USER_STATUS_SUCCESS,
  UPDATE_USER_STATUS_FAIL,
  DELETE_USER_PROCESS,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../Constants/userConstants";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_PROCESS });
    const res = await axios.post("/api/v1/login", {
      email,
      password,
    });

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const registerUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_PROCESS });
    const res = await axios.post("/api/v1/register", formData);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_PROCESS });
    const res = await axios.get("/api/v1/me");
    console.log(res);
    dispatch({ type: LOAD_USER_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error)
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data?.message });
  }
};
export const logOutUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/logout");
    dispatch({ type: LOGOUT_USER, payload: res.data.user });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: error.response.data.message });
  }
};

export const updateProfile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_PROCESS });
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const res = await axios.put("/api/v1/me/update", formData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const changePassword = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_PASSWORD_PROCESS });

    const res = await axios.put("/api/v1/update", formData);

    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const sendEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: SEND_EMAIL_PROCESS });

    const res = await axios.post("/api/v1/password/forgot", { email });

    dispatch({ type: SEND_EMAIL_SUCCESS, payload: res.data.message });
  } catch (error) {
    dispatch({
      type: SEND_EMAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const forgotPasswordAction =
  (password, confirmPassword, token) => async (dispatch) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_PROCESS });

      const res = await axios.put(`/api/v1/password/reset/${token}`, {
        password,
        confirmPassword,
      });

      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getAllUsersAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USERS_PROCESS });

    const res = await axios.get("/api/v1/admin/allUser");
    console.log(res);
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSingleUserAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_USER_PROCESS });

    const res = await axios.get(`/api/v1/admin/user/${id}`);
    console.log(res);
    dispatch({ type: GET_SINGLE_USER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updateUserStatusAction = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_STATUS_PROCESS });

    const res = await axios.put(`/api/v1/admin/user/${id}`, data);
    console.log(res);
    dispatch({ type: UPDATE_USER_STATUS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_STATUS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteUserAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_PROCESS });

    const res = await axios.delete(`/api/v1/admin/user/${id}`);
    console.log(res);
    dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
