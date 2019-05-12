import {
  PackageListState,
  PackageListActionTypes,
  LOAD_PACKAGES_REQUEST,
  LOAD_PACKAGES_SUCCESS,
  LOAD_PACKAGES_FAILURE,
  SET_PAGE
} from "./types";

const initialState: PackageListState = {
  packages: null,
  error: null,
  isLoading: false,
  page: 1,
  totalPackages: null
};

const reducer = (
  state = initialState,
  action: PackageListActionTypes
): PackageListState => {
  switch (action.type) {
    case LOAD_PACKAGES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case LOAD_PACKAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        packages: action.payload.packages,
        totalPackages: action.payload.total
      };
    case LOAD_PACKAGES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
