import {
  ADD_TASKBAR,
  DELETE_TASKBAR,
  GET_TASKBARS,
  TaskbarActionTypes,
  TaskbarState,
  UPDATE_TASKBAR,
} from "./taskbarTypes";

const initialState: TaskbarState = {
  taskbars: [],
};

export const taskbarReducer = (
  state = initialState,
  action: TaskbarActionTypes
): TaskbarState => {
  switch (action.type) {
    case ADD_TASKBAR:
      return {
        taskbars: [...state.taskbars, action.payload],
      };
    case GET_TASKBARS:
      return {
        taskbars: action.payload,
      };
    case UPDATE_TASKBAR:
      return {
        taskbars: state.taskbars.map((taskbar) =>
          taskbar.id === action.payload.id ? action.payload : taskbar
        ),
      };
    case DELETE_TASKBAR:
      return {
        taskbars: state.taskbars.filter(
          (taskbar) => taskbar.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
