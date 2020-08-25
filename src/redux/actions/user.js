import axios from "axios";
import { setAlert } from "./alert";
import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  SELECT_USER_REQUEST,
  SELECT_USER_SUCCESS,
  SELECT_USER_FAIL,
  EDIT_COINS_REQUEST,
  EDIT_COINS_SUCCESS,
  EDIT_COINS_FAIL,
  BLOCK_USER_REQUEST,
  BLOCK_USER_SUCCESS,
  BLOCK_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../const";

export const loadUsers = () => async (dispatch) => {
  dispatch({
    type: FETCH_USER_REQUEST,
  });

  try {
    const res = await axios.get(`https://libidoonbackend.herokuapp.com/api/user`);
    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: res.data.users,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};

export const blockUser = (userData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  dispatch({
    type: BLOCK_USER_REQUEST,
  });

  const { _id } = userData;
  const body = JSON.stringify(userData);

  try {
    const res = await axios.put(
      `https://libidoonbackend.herokuapp.com/api/user/block/${_id}`,
      body,
      config
    );
    dispatch({
      type: BLOCK_USER_SUCCESS,
      payload: res.data.success,
    });
  } catch (error) {
    dispatch({
      type: BLOCK_USER_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};

export const deleteUser = (userData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  dispatch({
    type: DELETE_USER_REQUEST,
  });

  const { _id } = userData;

  try {
    const res = await axios.delete(
      `https://libidoonbackend.herokuapp.com/api/user/delete/${_id}`,
      config
    );
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: res.data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};

export const selectUser = (userData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  dispatch({
    type: SELECT_USER_REQUEST,
  });

  const body = JSON.stringify(userData);

  try {
    const res = await axios.post(
      `https://libidoonbackend.herokuapp.com/api/user/select`,
      body,
      config
    );
    dispatch({
      type: SELECT_USER_SUCCESS,
      payload: res.data.user,
    });
  } catch (error) {
    dispatch({
      type: SELECT_USER_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};

export const editCoinsUser = (userData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  dispatch({
    type: EDIT_COINS_REQUEST,
  });

  const { params } = userData;
  const body = JSON.stringify(userData);

  try {
    const res = await axios.put(
      `https://libidoonbackend.herokuapp.com/api/user/coins/${params}`,
      body,
      config
    );
    dispatch({
      type: EDIT_COINS_SUCCESS,
      payload: res.data.user,
    });
  } catch (error) {
    dispatch({
      type: EDIT_COINS_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};

export const addUser = (userData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  dispatch({
    type: ADD_USER_REQUEST,
  });

  try {
    const res = await axios.post(
      `https://libidoonbackend.herokuapp.com/api/user`,
      userData,
      config
    );
    dispatch({
      type: ADD_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_USER_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};
