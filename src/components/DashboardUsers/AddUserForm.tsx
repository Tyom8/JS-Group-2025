import React from "react";
import styles from "../../styles/DashboardUsers.module.css";
import { useAddUserForm } from "../../hooks/AddUserForm-hook";

interface IUserFormProps {
  setIsClosed: (value: boolean) => void;
}

const AddUserForm: React.FC<IUserFormProps> = ({ setIsClosed }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit
  } = useAddUserForm();


  return (
    <div className={styles.addUserContainer}>
      <div className={styles.content}>
        <p onClick={() => setIsClosed(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="black"
            style={{
              position: "absolute",
              top: "6px",
              right: "8px",
              cursor: "pointer",
            }}
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </p>
        <h2>Add User</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.addUserForm}>
          <input
            type="text"
            placeholder="Enter your first name"
            {...register("firstName", {
              required: {
                value: true,
                message: "first name is required",
              },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Invalid firstName format",
              },
            })}
          />
          {errors?.firstName?.message && (
            <p className={styles.error}>{errors.firstName.message}</p>
          )}
          <input
            type="text"
            placeholder="Enter your last name"
            {...register("lastName", {
              required: {
                value: true,
                message: "last name is required",
              },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Invalid lastName format",
              },
            })}
          />
          {errors?.lastName?.message && (
            <p className={styles.error}>{errors.lastName.message}</p>
          )}
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: {
                value: true,
                message: "email is required",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors?.email?.message && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: {
                value: true,
                message: "password is required",
              },
              pattern: {
                value: /^(?=.*[a-zA-Z0-9!@#$%^&*])(?=.*[!@#$%^&*])[0-9]{8}$/,
                message: "Password should contain only 8 characters",
              },
            })}
          />
          {errors?.password?.message && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
          <input
            type="tel"
            placeholder="Enter your phone number"
            {...register("phoneNumber", {
              required: {
                value: true,
                message: "phone number is required",
              },
              pattern: {
                value: /^\+374 [0-9]{2} [0-9]{3}-[0-9]{3}$/,
                message: "Invalid phone number"
              }
            })}
          />
          {errors?.phoneNumber?.message && (
            <p className={styles.error}>{errors.phoneNumber.message}</p>
          )}
          <div className={styles.checkboxContainer}>
            <label htmlFor="male">
              <span>Male</span>
              <input
                type="radio"
                value="male"
                {...register("gender", {
                  required: {
                    value: true,
                    message: "Gender is required",
                  },
                })}
              />
            </label>
            <label htmlFor="female">
              <span>Female</span>
              <input
                type="radio"
                value="female"
                {...register("gender", {
                  required: {
                    value: true,
                    message: "Gender is required",
                  },
                })}
              />
            </label>
            {errors?.gender?.message && (
              <p className={styles.genderError}>{errors.gender.message}</p>
            )}
          </div>
          <div>
            <input type="file" {...register("userImg")} />
          </div>
          <button type="submit" className={styles.addUserBtn}>
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
