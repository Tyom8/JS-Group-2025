import React from "react";
import { useTranslation } from "react-i18next";
import defaultImage from "../../assets/default-image.jpg";
import deleteIcon from "../../assets/icons/delete.svg";
import styles from "../../styles/DashboardUsers.module.css";
import { useAddDashboardUsers } from "./AddDashboardUsers-hook";
import AddUserForm from "./AddUserForm";

const DashBoardUsers: React.FC = () => {
  // all needed fields and functions from useAddDashboardUsers hook
  const {
    addedUsers,
    isAddUserFormShown,
    setIsAddUserFormShown,
    handleAddUsers,
    handleDeleteUsers,
  } = useAddDashboardUsers();

  const { t } = useTranslation();

  return (
    <div className={styles.userDashboard}>
      <div className={styles.usersContainer}>
        <button
          type="submit"
          className={styles.btn}
          onClick={() => {
            setIsAddUserFormShown((prev) => !prev);
          }}
        >
          {t("dashboardPage.dashboardUsers.addUserBtn")}
        </button>
        {isAddUserFormShown && (
          <AddUserForm
            sendData={handleAddUsers}
            setIsClosed={() => setIsAddUserFormShown(false)}
          />
        )}
        <div className={styles.users}>
          {!addedUsers.length ? (
            <p>{t("dashboardPage.dashboardUsers.noUsersText")}</p>
          ) : (
            addedUsers.map((user) => (
              <div className={styles.user} key={user.id}>
                <img src={defaultImage} alt="user image" />
                <div className={styles.info}>
                  <h4 className={styles.username}>{user?.firstName}</h4>
                  <p className={styles.email}>{user?.email}</p>
                </div>
                <div className={styles.deleteBtn}>
                  <button
                    className={styles.delete}
                    onClick={() => handleDeleteUsers(user.id)}
                  >
                    <img src={deleteIcon} alt="delete icon" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoardUsers;
