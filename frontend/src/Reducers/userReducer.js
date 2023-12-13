import {
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_PROCESS,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_SUCCESS,
} from "../Constants/productConstants";
import {
  LOGIN_FAIL,
  LOGIN_PROCESS,
  LOGIN_SUCCESS,
  CLEAR_ERROR,
  REGISTER_FAIL,
  REGISTER_PROCESS,
  REGISTER_SUCCESS,
  LOAD_USER_PROCESS,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER,
  LOGOUT_USER_FAIL,
  UPDATE_PROFILE_PROCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  CHANGE_PASSWORD_PROCESS,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_RESET,
  SEND_EMAIL_PROCESS,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAIL,
  FORGOT_PASSWORD_PROCESS,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  GET_ALL_USERS_PROCESS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_SINGLE_USER_PROCESS,
  GET_SINGLE_USER_SUCCESS,
  GET_SINGLE_USER_FAIL,
  UPDATE_USER_STATUS_PROCESS,
  UPDATE_USER_STATUS_SUCCESS,
  UPDATE_USER_STATUS_FAIL,
  UPDATE_USER_STATUS_RESET,
  DELETE_USER_PROCESS,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
} from "../Constants/userConstants";

export const userLoginRegister = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_PROCESS:
    case REGISTER_PROCESS:
    case LOAD_USER_PROCESS:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT_USER:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_PROCESS:
    case CHANGE_PASSWORD_PROCESS:
      return {
        loading: true,
        isUpdated: false,
      };
    case UPDATE_PROFILE_SUCCESS:
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_PROFILE_FAIL:
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PROFILE_RESET:
    case CHANGE_PASSWORD_RESET:
      return {
        loading: false,
        isUpdated: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_EMAIL_PROCESS:
      return {
        loading: true,
        message: null,
      };
    case SEND_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case FORGOT_PASSWORD_PROCESS:
      return {
        loading: true,
        success: false,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        loading: true,
        success: true,
      };
    case SEND_EMAIL_FAIL:
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS_PROCESS:
      return {
        loading: true,
        ...state,
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
      };

    case GET_ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getSingleUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case GET_SINGLE_USER_PROCESS:
      return {
        loading: true,
        ...state,
      };
    case GET_SINGLE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };

    case GET_SINGLE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const updateUserStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_STATUS_PROCESS:
      return {
        loading: true,
        success: false,
        ...state,
      };
    case UPDATE_USER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case UPDATE_USER_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER_STATUS_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_PROCESS:
      return {
        loading: true,
        success: false,
        ...state,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_USER_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const deleteReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_PROCESS:
      return {
        loading: true,
        success: false,
        ...state,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };

    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_REVIEW_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
