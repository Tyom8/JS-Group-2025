import { LOGIN, LOGOUT, User, UserActionTypes } from "./userLoginTypes";

export const login = (user: User): UserActionTypes => ({
  type: LOGIN,
  payload: user,
});

export const logout = (): UserActionTypes => ({
  type: LOGOUT,
});
