import React from "react";
import { useFormValidation } from "../../hooks/FormValidation-hook";
import styles from "../../styles/AddTaskbarForm.module.css";
import { IAddTaskbarForm } from "../../types";

interface IAddTaskbarFormProps {
  sendData: (user: IAddTaskbarForm) => void;
  setIsClosed: (value: boolean) => void;
}

const AddTaskbarForm: React.FC<IAddTaskbarFormProps> = ({
  sendData,
  setIsClosed,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useFormValidation<IAddTaskbarForm>();

  const onSubmit = (data: IAddTaskbarForm) => {
    sendData(data);
    reset();
  };

  return (
    <div className={styles.addTaskbarFormContainer}>
      <div className={styles.close} onClick={() => setIsClosed(false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="black"
          style={{ cursor: "pointer" }}
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.deadline}>
          <input
            type="date"
            {...register("date", {
              required: {
                value: true,
                message: "Date is required",
              },
            })}
          />
          <input
            type="date"
            {...register("date", {
              required: {
                value: true,
                message: "Date is required",
              },
            })}
          />
          {errors?.date?.message && (
            <p className={` ${styles.error} ${styles.dateError}`}>{errors.date.message}</p>
          )}
        </div>
        <div className={styles.title}>
          <input
            type="text"
            placeholder="Add Title"
            {...register("title", {
              required: {
                value: true,
                message: "Title is required",
              },
            })}
          />
          {errors?.title?.message && (
            <p className={styles.error}>{errors.title.message}</p>
          )}
        </div>
        <div className={styles.imageDescriptionCategoryContainer}>
          <div className={styles.image}>
            <button
              className={styles.addImgBtn}
              onClick={(e) => e.preventDefault()}
            >
              +
            </button>
          </div>
          <div className={styles.descriptionAndCategory}>
            <textarea
              placeholder="Type Description"
              {...register("description", {
                required: {
                  value: true,
                  message: "Description is required",
                },
              })}
            ></textarea>
            {errors?.description?.message && (
              <p className={`${styles.error} ${styles.descriptionError}`}>{errors.description.message}</p>
            )}
            <select
              {...register("category", {
                required: {
                  value: true,
                  message: "Please select project category",
                },
              })}
            >
              <option value="">Select Category</option>
            </select>
            {errors?.category?.message && (
              <p className={`${styles.error} ${styles.categoryError}`}>{errors.category.message}</p>
            )}
          </div>
        </div>
        <div className={styles.addMembersContainer}>
          <select
            {...register("member", {
              required: {
                value: true,
                message: "Please select project member(s)",
              },
            })}
          >
            <option value="">Add Members</option>
          </select>
          {errors?.member?.message && (
            <p className={styles.error}>{errors.member.message}</p>
          )}
        </div>
        <button type="submit" className={styles.submitBtn}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTaskbarForm;
