import {
  ADD_PROJECT,
  DELETE_PROJECT,
  GET_PROJECTS,
  Project,
  ProjectActionTypes,
  UPDATE_PROJECT,
} from "./projectTypes";

export const addProject = (project: Project): ProjectActionTypes => ({
  type: ADD_PROJECT,
  payload: project,
});

export const getProjects = (projects: Project[]): ProjectActionTypes => ({
  type: GET_PROJECTS,
  payload: projects,
});

export const updateProject = (project: Project): ProjectActionTypes => ({
  type: UPDATE_PROJECT,
  payload: project,
});

export const deleteProject = (id: number): ProjectActionTypes => ({
  type: DELETE_PROJECT,
  payload: id,
});
