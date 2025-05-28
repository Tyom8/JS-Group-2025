import { FieldValues, useForm } from "react-hook-form";

export const useFormValidation = <T extends FieldValues>() => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<T>();

  return {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  };
};
