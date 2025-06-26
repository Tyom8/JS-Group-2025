import {
  ADD_USER,
  DashboardUsersActionTypes,
  DashboardUsersState,
  DELETE_USER,
} from "./dashboardUsersType";

const initialState: DashboardUsersState = {
  users: [],
};

export const dashboardUsersReducer = (
  state = initialState,
  action: DashboardUsersActionTypes
): DashboardUsersState => {
  switch (action.type) {
    case ADD_USER:
      return {
        users: [...state.users, action.payload],
      };
    case DELETE_USER:
      return {
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};
