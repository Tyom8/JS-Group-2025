import {
  ADD_USER,
  DashboardUsers,
  DashboardUsersActionTypes,
  DELETE_USER,
  GET_USERS,
} from "./dashboardUsersType";

export const addUser = (user: DashboardUsers): DashboardUsersActionTypes => ({
  type: ADD_USER,
  payload: user,
});

export const deleteUser = (id: number): DashboardUsersActionTypes => {
  localStorage.removeItem("dashboardUsers");
  return {
    type: DELETE_USER,
    payload: id,
  };
};

export const getUsers = (
  users: DashboardUsers[]
): DashboardUsersActionTypes => ({
  type: GET_USERS,
  payload: users,
});
