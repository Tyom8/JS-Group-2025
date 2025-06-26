import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import closeIcon from "../../assets/icons/close.svg";
import { useFormValidation } from "../../hooks/FormValidation-hook";
import styles from "../../styles/AddTaskbarForm.module.css";
import { IAddTaskbarForm } from "../../types";

// Props for AddTaskbarForm component
interface IAddTaskbarFormProps {
  sendData: (user: IAddTaskbarForm) => void; // this will send the form data (that is add the taskbar)
  setIsClosed: (value: boolean) => void; // this will close the add taskbar form
  handleEditTaskbar?: (
    id: number,
    date: string,
    title: string,
    description: string,
    category: string,
    member: string,
    image?: string
  ) => void;
  editById?: number | null;
  isTaskbarEditMode?: boolean;
  taskbars?: IAddTaskbarForm[];
}

const AddTaskbarForm: React.FC<IAddTaskbarFormProps> = ({
  sendData,
  setIsClosed,
  handleEditTaskbar,
  editById,
  isTaskbarEditMode = false,
  taskbars = [],
}) => {
  // all needed fields and functions from useFormValidation hook
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useFormValidation<IAddTaskbarForm>();

  const { t } = useTranslation();

  useEffect(() => {
    if (isTaskbarEditMode && editById !== null) {
      const taskbarToEdit = taskbars.find((taskbar) => taskbar.id === editById);
      if (taskbarToEdit) {
        reset({
          date: taskbarToEdit.date,
          title: taskbarToEdit.title,
          description: taskbarToEdit.description,
          category: taskbarToEdit.category,
          member: taskbarToEdit.member,
          image: taskbarToEdit.image,
        });
      }
    }
  }, [isTaskbarEditMode, editById, taskbars, reset]);

  // function handles form submit
  // which sends the data and resets all the inputs
  const onSubmit = (data: IAddTaskbarForm) => {
    if (isTaskbarEditMode && handleEditTaskbar && editById !== null) {
      handleEditTaskbar(
        editById!,
        data.date,
        data.title,
        data.description,
        data.category,
        data.member,
        data.image
      );
    } else {
      sendData(data);
    }

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
              placeholder={t("taskbarPage.formContent.titlePlaceholder")}
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
                placeholder={t(
                  "taskbarPage.formContent.descriptionPlaceholder"
                )}
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
                <option value="">
                  {t("taskbarPage.formContent.selectCategoryPlaceholder")}
                </option>
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
              <option value="">
                {t("taskbarPage.formContent.selectMembersPlaceholder")}
              </option>
            </select>
            {/* {errors?.member?.message && (
              <p className={styles.error}>{errors.member.message}</p>
            )} */}
          </div>
          <button type="submit" className={styles.submitButton}>
            {t("taskbarPage.formContent.addBtn")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskbarForm;
