import { api } from "./api";

export async function login(email: string, password: string) {
  try {
    const response = await api.post("/authorized-users", { email, password });
    return response.data;
  } catch (error) {
    console.error("An error occurred while trying to login");
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
) {
  try {
    const response = await api.post("/users", {
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
  }
}

export async function addProject(
  name: string,
  description: string,
  startDate: string,
  endDate: string
) {
  try {
    const response = await api.post("/projects", {
      name,
      description,
      startDate,
      endDate,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred while adding project");
  }
}

export async function getProjects() {
  try {
    const response = await api.get("/projects");
    return response.data;
  } catch (error) {
    console.error("An error occurred while getting projects");
  }
}

export async function updateProject(
  name: string,
  description: string,
  startDate: string,
  endDate: string
) {
  try {
    const response = await api.put("/projects", {
      name,
      description,
      startDate,
      endDate,
    });
    return response.data;
  } catch (error) {
    console.error("An error occurred while updating the project");
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
) {
  try {
    const response = await api.post("/taskbars", {
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
  }
}

export async function getTaskbars() {
  try {
    const response = await api.get("/taskbars");
    return response.data;
  } catch (error) {
    console.error("An error occurred while getting taskbars");
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
) {
  try {
    const response = await api.put("/taskbars", {
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
  }
}
