import React from "react";
import defaultImage from "../../assets/default-image.jpg";
import deleteIcon from "../../assets/icons/delete.svg";
import styles from "../../styles/DashboardUsers.module.css";
import { useAddDashboardUsers } from "./AddDashboardUsers-hook";
import AddUserForm from "./AddUserForm";

const DashBoardUsers: React.FC = () => {
  const {
    addedUsers,
    isAddUserFormShown,
    setIsAddUserFormShown,
    handleAddUsers,
    handleDeleteUsers,
  } = useAddDashboardUsers();

  return (
    <div className={styles.usersContainer}>
      <button
        type="submit"
        className={styles.btn}
        onClick={() => {
          setIsAddUserFormShown((prev) => !prev);
        }}
      >
        Add new user
      </button>
      {isAddUserFormShown && (
        <AddUserForm
          sendData={handleAddUsers}
          setIsClosed={() => setIsAddUserFormShown(false)}
        />
      )}
      <div className={styles.users}>
        <div className={styles.user}>
          <img src={defaultImage} alt="user image" />
          <div className={styles.info}>
            <h4 className={styles.username}>firstName</h4>
            <p className={styles.email}>email</p>
          </div>
          <div className={styles.deleteBtn}>
            <button className={styles.delete}>
              <img src={deleteIcon} alt="delete icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardUsers;
