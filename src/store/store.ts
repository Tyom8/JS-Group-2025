import { combineReducers, createStore } from "redux";
import { dashboardUsersReducer } from "./dashboardUsers/dashboardUsersReducer";
import { userLoginReducer } from "./loginUsers/userLoginReducer";
import { projectReducer } from "./projects/projectReducer";
import { taskbarReducer } from "./taskbars/taskbarReducer";

const rootReducer = combineReducers({
  user: userLoginReducer,
  dashboardUser: dashboardUsersReducer,
  project: projectReducer,
  taskbar: taskbarReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
