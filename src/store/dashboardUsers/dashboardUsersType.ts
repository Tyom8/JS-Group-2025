export interface DashboardUsers {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: "male" | "female";
  userImg?: string;
}

export interface DashboardUsersState {
  users: DashboardUsers[];
}

export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";

interface AddUserAction {
  type: typeof ADD_USER;
  payload: DashboardUsers;
}

interface DeleteUserAction {
  type: typeof DELETE_USER;
  payload: number; // delete user by id
}

export type DashboardUsersActionTypes = AddUserAction | DeleteUserAction;
