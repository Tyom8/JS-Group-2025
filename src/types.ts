export interface IAddUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: "male" | "female"
  userImg?: string;
}
