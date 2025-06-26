import {
  ADD_PROJECT,
  DELETE_PROJECT,
  GET_PROJECTS,
  ProjectActionTypes,
  ProjectState,
  UPDATE_PROJECT,
} from "./projectTypes";

const initialState: ProjectState = {
  projects: [],
};

export const projectReducer = (
  state = initialState,
  action: ProjectActionTypes
): ProjectState => {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        projects: [...state.projects, action.payload],
      };
    case GET_PROJECTS:
      return { projects: action.payload };
    case UPDATE_PROJECT:
      return {
        projects: state.projects.map((project) =>
          project.id === action.payload.id ? action.payload : project
        ),
      };
    case DELETE_PROJECT:
      return {
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
