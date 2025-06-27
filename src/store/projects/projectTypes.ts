export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface ProjectState {
  projects: Project[];
}

export const ADD_PROJECT = "ADD_PROJECT";
export const GET_PROJECTS = "GET_PROJECTS";
export const UPDATE_PROJECT = "UPDATE_PROJECT";
export const DELETE_PROJECT = "DELETE_PROJECT";

interface AddProjectAction {
  type: typeof ADD_PROJECT;
  payload: Project;
}

interface GetProjectsAction {
  type: typeof GET_PROJECTS;
  payload: Project[];
}

interface UpdateProjectAction {
  type: typeof UPDATE_PROJECT;
  payload: Project;
}

interface DeleteProjectAction {
  type: typeof DELETE_PROJECT;
  payload: number; // which is the project's id
}

export type ProjectActionTypes =
  | AddProjectAction
  | GetProjectsAction
  | UpdateProjectAction
  | DeleteProjectAction;
