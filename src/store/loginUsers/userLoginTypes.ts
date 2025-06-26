export interface User {
  id: number;
  email: string;
  password: string;
}

export interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

interface LoginAction {
  type: typeof LOGIN;
  payload: User;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type UserActionTypes = LoginAction | LogoutAction;
