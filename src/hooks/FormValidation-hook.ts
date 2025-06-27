import { FieldValues, useForm } from "react-hook-form";

// a hook that will validate the forms depends on form field values
// which will be through types that we provided for each form
// for validation we used useForm hook
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
