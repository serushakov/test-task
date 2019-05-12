import { ThunkAction } from "redux-thunk";

import {
  LOAD_PACKAGES_REQUEST,
  LOAD_PACKAGES_SUCCESS,
  LoadPackagesRequestInit,
  PackageListActionTypes,
  LOAD_PACKAGES_FAILURE
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
      payload: e
    });
  }
};
