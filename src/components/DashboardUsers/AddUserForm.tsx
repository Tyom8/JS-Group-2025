import React from "react";
import { useTranslation } from "react-i18next";
import closeIcon from "../../assets/icons/close.svg";
import { useFormValidation } from "../../hooks/FormValidation-hook";
import styles from "../../styles/DashboardUsers.module.css";
import { IAddUser } from "../../types";

// Props for AddUserForm component
interface IUserFormProps {
  sendData: (user: IAddUser) => void; // this will send the form data (that is add the user)
  setIsClosed: (value: boolean) => void; // this will close the add user form
}

const AddUserForm: React.FC<IUserFormProps> = ({ sendData, setIsClosed }) => {
  // all needed fields and functions from useFormValidation hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormValidation<IAddUser>();

  const { t } = useTranslation();

  // function handles form submit
  // which sends the data and resets all the inputs
  const onSubmit = (data: IAddUser) => {
    try {
      sendData(data);
      reset();
      setIsClosed(false);
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.addUserContainer}>
        <div className={styles.content}>
          <img
            src={closeIcon}
            alt="close icon"
            onClick={() => setIsClosed(false)}
            className={styles.closeIconImg}
          />
          <h2>{t("dashboardPage.dashboardUsers.formContent.title")}</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.addUserForm}
          >
            <input
              type="text"
              placeholder={t(
                "dashboardPage.dashboardUsers.formContent.firstNamePlaceholder"
              )}
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
              placeholder={t(
                "dashboardPage.dashboardUsers.formContent.lastNamePlaceholder"
              )}
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
              placeholder={t(
                "dashboardPage.dashboardUsers.formContent.emailPlaceholder"
              )}
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
              placeholder={t(
                "dashboardPage.dashboardUsers.formContent.passwordPlaceholder"
              )}
              {...register("password", {
                required: {
                  value: true,
                  message: "password is required",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8}$/,
                  message:
                    "Password should contain only 8 characters, At least one uppercase letter + at least one lowercase letter + at least one digit + at least one special character  (8 valid characters)",
                },
              })}
            />
            {errors?.password?.message && (
              <p className={styles.error}>{errors.password.message}</p>
            )}
            <input
              type="tel"
              placeholder={t(
                "dashboardPage.dashboardUsers.formContent.phoneNumberPlaceholder"
              )}
              {...register("phoneNumber", {
                required: {
                  value: true,
                  message: "phone number is required",
                },
                pattern: {
                  value: /^\+374 [0-9]{2} [0-9]{3}-[0-9]{3}$/,
                  message: "Invalid phone number",
                },
              })}
            />
            {errors?.phoneNumber?.message && (
              <p className={styles.error}>{errors.phoneNumber.message}</p>
            )}
            <div className={styles.checkboxContainer}>
              <label htmlFor="male">
                <span>
                  {t("dashboardPage.dashboardUsers.formContent.gender.male")}
                </span>
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
                <span>
                  {t("dashboardPage.dashboardUsers.formContent.gender.female")}
                </span>
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
              {t("dashboardPage.dashboardUsers.formContent.button")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
