import {
  PackageListState,
  PackageListActionTypes,
  LOAD_PACKAGES_REQUEST
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
        isLoading: true
      };
    default:
      return state;
  }
};

export default reducer;
