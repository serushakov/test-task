import { GetPackagesResponse } from "../../../common/types";

export const LOAD_PACKAGES_REQUEST = "LOAD_PACKAGES_REQUEST";
export const LOAD_PACKAGES_SUCCESS = "LOAD_PACKAGES_SUCCESS";
export const LOAD_PACKAGES_FAILURE = "LOAD_PACKAGES_FAILURE";

export interface LoadPackagesRequestInit {
  offset: number;
  amount: number;
}

interface LoadPackagesRequestAction {
  type: typeof LOAD_PACKAGES_REQUEST;
  payload: LoadPackagesRequestInit;
}

interface LoadPackagesSuccessAction {
  type: typeof LOAD_PACKAGES_SUCCESS;
  payload: GetPackagesResponse;
}

interface LoadPackagesFailureAction {
  type: typeof LOAD_PACKAGES_FAILURE;
  payload: string;
}

export type PackageListActionTypes =
  | LoadPackagesRequestAction
  | LoadPackagesSuccessAction
  | LoadPackagesFailureAction;

export interface PackageListState {
  packages: Array<string> | null;
  isLoading: boolean;
  error: string | null;
  totalPackages: number | null;
  page: number;
}
