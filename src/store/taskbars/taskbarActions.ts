import {
  ADD_TASKBAR,
  DELETE_TASKBAR,
  GET_TASKBARS,
  Taskbar,
  TaskbarActionTypes,
  UPDATE_TASKBAR,
} from "./taskbarTypes";

export const addTaskbar = (taskbar: Taskbar): TaskbarActionTypes => ({
  type: ADD_TASKBAR,
  payload: taskbar,
});

export const getTaskbars = (taskbars: Taskbar[]): TaskbarActionTypes => ({
  type: GET_TASKBARS,
  payload: taskbars,
});

export const updateTaskbar = (taskbar: Taskbar): TaskbarActionTypes => ({
  type: UPDATE_TASKBAR,
  payload: taskbar,
});

export const deleteTaskbar = (id: number): TaskbarActionTypes => ({
  type: DELETE_TASKBAR,
  payload: id,
});
