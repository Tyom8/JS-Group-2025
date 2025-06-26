import {
  ADD_USER,
  DashboardUsers,
  DashboardUsersActionTypes,
  DELETE_USER,
} from "./dashboardUsersType";

export const addUser = (user: DashboardUsers): DashboardUsersActionTypes => ({
  type: ADD_USER,
  payload: user,
});

export const deleteUser = (id: number): DashboardUsersActionTypes => ({
  type: DELETE_USER,
  payload: id,
});
