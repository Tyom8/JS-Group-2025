import React from "react";
import closeIcon from "../../assets/icons/close.svg";
import { useFormValidation } from "../../hooks/FormValidation-hook";
import styles from "../../styles/AddTaskbarForm.module.css";
import { IAddTaskbarForm } from "../../types";

// Props for AddTaskbarForm component
interface IAddTaskbarFormProps {
  sendData: (user: IAddTaskbarForm) => void; // this will send the form data (that is add the taskbar)
  setIsClosed: (value: boolean) => void; // this will close the add taskbar form
}

const AddTaskbarForm: React.FC<IAddTaskbarFormProps> = ({
  sendData,
  setIsClosed,
}) => {
  // all needed fields and functions from useFormValidation hook
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useFormValidation<IAddTaskbarForm>();

  // function handles form submit
  // which sends the data and resets all the inputs
  const onSubmit = (data: IAddTaskbarForm) => {
    sendData(data);
    reset();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.addTaskbarFormContainer}>
        <div className={styles.close} onClick={() => setIsClosed(false)}>
          <img src={closeIcon} alt="close icon" />
        </div>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
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
              <p className={`${styles.error} ${styles.dateError}`}>
                {errors.date.message}
              </p>
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
            <div className={styles.image}></div>
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
                <p className={`${styles.error} ${styles.descriptionError}`}>
                  {errors.description.message}
                </p>
              )}
              <select
                {...register("category", {
                  // required: {
                  //   value: true,
                  //   message: "Please select project category",
                  // },
                })}
              >
                <option value="">Select Category</option>
              </select>
              {/* {errors?.category?.message && (
                <p className={`${styles.error} ${styles.categoryError}`}>
                  {errors.category.message}
                </p>
              )} */}
            </div>
          </div>
          <div className={styles.addMembersContainer}>
            <select
              {...register("member", {
                // required: {
                //   value: true,
                //   message: "Please select project member(s)",
                // },
              })}
            >
              <option value="">Add Members</option>
            </select>
            {/* {errors?.member?.message && (
              <p className={styles.error}>{errors.member.message}</p>
            )} */}
          </div>
          <button type="submit" className={styles.submitButton}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskbarForm;
