import { LOGIN, LOGOUT, User, UserActionTypes } from "./userLoginTypes";

export const login = (user: User): UserActionTypes => ({
  type: LOGIN,
  payload: user,
});

export const logout = (): UserActionTypes => {
  localStorage.removeItem("loggedInUsers");
  return {
    type: LOGOUT,
  };
};
