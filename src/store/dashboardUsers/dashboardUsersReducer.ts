import {
  ADD_USER,
  DashboardUsers,
  DashboardUsersActionTypes,
  DELETE_USER,
  GET_USERS,
} from "./dashboardUsersType";

const initialState: DashboardUsers[] = [];

export const dashboardUsersReducer = (
  state = initialState,
  action: DashboardUsersActionTypes
): DashboardUsers[] => {
  switch (action.type) {
    case ADD_USER:
      return state
    case GET_USERS:
      return action.payload;
    case DELETE_USER:
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
};
