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
  date: Date;
  title: string;
  image?: string;
  description: string;
  category: string;
  member: string;
}