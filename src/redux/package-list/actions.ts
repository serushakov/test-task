import { ThunkAction } from "redux-thunk";

import {
  LOAD_PACKAGES_REQUEST,
  LOAD_PACKAGES_SUCCESS,
  LoadPackagesRequestInit,
  PackageListActionTypes,
  LOAD_PACKAGES_FAILURE,
  SET_PAGE,
  SET_AMOUNT_PER_PAGE
} from "./types";
import { RootState } from "../types";
import { fetchPackages } from "../../api";

type PackageListThunkAction = ThunkAction<
  void,
  RootState,
  null,
  PackageListActionTypes
>;

export const loadPackagesRequest = (
  init: LoadPackagesRequestInit
): PackageListThunkAction => async dispatch => {
  dispatch({
    type: LOAD_PACKAGES_REQUEST,
    payload: init
  });

  try {
    const data = await fetchPackages(init.offset, init.amount);
    dispatch({
      type: LOAD_PACKAGES_SUCCESS,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: LOAD_PACKAGES_FAILURE,
      payload:
        typeof e === "string"
          ? e
          : e instanceof Error
          ? e.message
          : "Unknown error"
    });
  }
};

export const setPage = (page: number): PackageListActionTypes => ({
  type: SET_PAGE,
  payload: page
});

export const setAmountPerPage = (amount: number): PackageListActionTypes => ({
  type: SET_AMOUNT_PER_PAGE,
  payload: amount
});
