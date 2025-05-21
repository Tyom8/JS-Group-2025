import { useForm } from "react-hook-form";
import { IAddUser } from "../types";

export const useAddUserForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddUser>();
  
  const onSubmit = async (data: IAddUser) => {
    console.log(data);
    reset();
  };

  return {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit
  };
};
