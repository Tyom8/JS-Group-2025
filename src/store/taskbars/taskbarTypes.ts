export interface Taskbar {
  id: number;
  date: string;
  title: string;
  image?: string;
  description: string;
  category: string;
  member: string;
  status?: string;
}

export interface TaskbarState {
  taskbars: Taskbar[];
}

export const ADD_TASKBAR = "ADD_TASKBAR";
export const GET_TASKBARS = "GET_TASKBARS";
export const UPDATE_TASKBAR = "UPDATE_TASKBAR";
export const DELETE_TASKBAR = "DELETE_TASKBAR";

interface AddTaskbarAction {
  type: typeof ADD_TASKBAR;
  payload: Taskbar;
}

interface GetTaskbarsAction {
  type: typeof GET_TASKBARS;
  payload: Taskbar[];
}

interface UpdateTaskbarAction {
  type: typeof UPDATE_TASKBAR;
  payload: Taskbar;
}

interface DeleteTaskbarAction {
  type: typeof DELETE_TASKBAR;
  payload: number; // delete taskbar by id
}

export type TaskbarActionTypes =
  | AddTaskbarAction
  | GetTaskbarsAction
  | UpdateTaskbarAction
  | DeleteTaskbarAction;
