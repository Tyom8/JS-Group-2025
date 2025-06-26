import { LOGIN, LOGOUT, UserActionTypes, UserState } from "./userLoginTypes";

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
};

export const userLoginReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case LOGIN:
      return { currentUser: action.payload, isAuthenticated: true };
    case LOGOUT:
      return { currentUser: null, isAuthenticated: false };
    default:
      return state;
  }
};
