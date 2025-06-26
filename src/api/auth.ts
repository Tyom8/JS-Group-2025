import {
  IAddNewProject,
  IAddTaskbarForm,
  IAddUser,
  ILoginForm,
} from "../types";
import { api } from "./api";

export async function login(
  email: string,
  password: string
): Promise<ILoginForm> {
  try {
    const response = await api.post<ILoginForm>("authorized-users", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred while trying to login");
    throw error;
  }
}

export async function updatePassword(password: string): Promise<ILoginForm> {
  try {
    const response = await api.put<ILoginForm>("authorized-users", {
      password,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred while updating password");
    throw error;
  }
}

export async function addDashboardUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phoneNumber: string,
  gender: "male" | "female",
  userImg?: string
): Promise<IAddUser> {
  try {
    const response = await api.post<IAddUser>("users", {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      gender,
      userImg,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred while adding the user");
    throw error;
  }
}

export async function addProject(
  name: string,
  description: string,
  startDate: string,
  endDate: string
): Promise<IAddNewProject> {
  try {
    const response = await api.post<IAddNewProject>("projects", {
      name,
      description,
      startDate,
      endDate,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred while adding project");
    throw error;
  }
}

export async function getProjects(): Promise<IAddNewProject[]> {
  try {
    const response = await api.get<IAddNewProject[]>("projects");
    return response.data;
  } catch (error) {
    console.error("An error occurred while getting projects");
    throw error;
  }
}

export async function updateProject(
  name: string,
  description: string,
  startDate: string,
  endDate: string
): Promise<IAddNewProject> {
  try {
    const response = await api.put<IAddNewProject>("projects", {
      name,
      description,
      startDate,
      endDate,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred while updating the project");
    throw error;
  }
}

export async function addTaskbar(
  date: string,
  title: string,
  description: string,
  category: string,
  member: string,
  status?: string,
  image?: string
): Promise<IAddTaskbarForm> {
  try {
    const response = await api.post<IAddTaskbarForm>("taskbars", {
      date,
      title,
      description,
      category,
      member,
      status,
      image,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred while adding taskbar");
    throw error;
  }
}

export async function getTaskbars(): Promise<IAddTaskbarForm[]> {
  try {
    const response = await api.get<IAddTaskbarForm[]>("taskbars");
    return response.data;
  } catch (error) {
    console.error("An error occurred while getting taskbars");
    throw error;
  }
}

export async function updateTaskbar(
  date: string,
  title: string,
  description: string,
  category: string,
  member: string,
  status?: string,
  image?: string
): Promise<IAddTaskbarForm> {
  try {
    const response = await api.put<IAddTaskbarForm>("taskbars", {
      date,
      title,
      description,
      category,
      member,
      status,
      image,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred while updating taskbar");
    throw error;
  }
}
