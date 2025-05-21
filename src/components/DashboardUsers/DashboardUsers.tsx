import React from "react";
import defaultImage from "../../assets/default-image.jpg";
import { useAddDashboardUsers } from "../../hooks/AddDashboardUsers-hook";
import styles from "../../styles/DashboardUsers.module.css";
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
        <AddUserForm setIsClosed={() => setIsAddUserFormShown(false)} />
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="white"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardUsers;
