// All the types of user form input fields
export interface IAddUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: "male" | "female";
  userImg?: string;
}

// All the types of taskbar form input fields
export interface IAddTaskbarForm {
  id: number;
  date: string;
  title: string;
  image?: string;
  description: string;
  category: string;
  member: string;
  status: string;
}

// All the types of project adding input fields
export interface IAddNewProject {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

// All the types of login form input fields
export interface ILoginForm {
  email: string;
  password: string;
  resetEmail: string;
}
