import axios from "axios";
import { setAlert } from "./alert";
import {
  FETCH_STORE_REQUEST,
  FETCH_STORE_SUCCESS,
  FETCH_STORE_FAIL,
  ADD_STORE_REQUEST,
  ADD_STORE_SUCCESS,
  ADD_STORE_FAIL,
  EDIT_STORE_REQUEST,
  EDIT_STORE_SUCCESS,
  EDIT_STORE_FAIL,
  DELETE_STORE_REQUEST,
  DELETE_STORE_SUCCESS,
  DELETE_STORE_FAIL,
  SELECT_STORE_REQUEST,
  SELECT_STORE_SUCCESS,
  SELECT_STORE_FAIL,
} from "../const";

export const addStore = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch({
    type: ADD_STORE_REQUEST,
  });

  try {
    const res = await axios.post(
      `http://localhost:5000/api/store`,
      body,
      config
    );
    dispatch({
      type: ADD_STORE_SUCCESS,
      payload: res.data.success,
    });
  } catch (error) {
    dispatch({
      type: ADD_STORE_FAIL,
    });
  }
};

export const editStore = (data) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch({
    type: EDIT_STORE_REQUEST,
  });

  try {
    const res = await axios.put(
      `http://localhost:5000/api/store/`,
      body,
      config
    );
    dispatch({
      type: EDIT_STORE_SUCCESS,
      payload: res.data.success
    });
  } catch (error) {
    dispatch({
      type: EDIT_STORE_FAIL,
    });
  }
};

export const deleteStore = (data) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch({
    type: DELETE_STORE_REQUEST,
  });

  try {
    const { _id } = data;
    const res = await axios.put(
      `http://localhost:5000/api/store/delete/${_id}`,
      config
    );
    dispatch({
      type: DELETE_STORE_SUCCESS,
      payload: res.data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_STORE_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};

export const loadStore = () => async (dispatch) => {
  dispatch({
    type: FETCH_STORE_REQUEST,
  });

  try {
    const res = await axios.get(`http://localhost:5000/api/store`);
    dispatch({
      type: FETCH_STORE_SUCCESS,
      payload: res.data.cards,
    });

    dispatch(setAlert(`Exito`, "primary"));
  } catch (error) {
    dispatch({
      type: FETCH_STORE_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};

export const selectStore = (data) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  dispatch({
    type: SELECT_STORE_REQUEST,
  });

  try {
    const res = await axios.post(
      `http://localhost:5000/api/store/select`,
      body,
      config
    );
    dispatch({
      type: SELECT_STORE_SUCCESS,
      payload: res.data.card,
    });
  } catch (error) {
    dispatch({
      type: SELECT_STORE_FAIL,
    });
    dispatch(setAlert(`Error ${error}`, "danger"));
  }
};


