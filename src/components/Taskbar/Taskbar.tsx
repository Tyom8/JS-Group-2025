import React from "react";
import closeIcon from "../../assets/icons/close.svg";
import styles from "../../styles/Taskbar.module.css";

const Taskbar: React.FC = () => {
  return (
    <div className={styles.taskbarContainer}>
      <div className={styles.inputContainer}>
        <input type="text" />
        <span>+</span>
      </div>
      <div className={styles.project}>
        <div className={styles.content}>
          <div className={styles.closeIcon}>
            <img src={closeIcon} alt="close icon" />
          </div>
          <div className={styles.info}>
            <p className={styles.title}>Title</p>
            <button className={styles.editBtn}>Edit</button>
          </div>
          <div className={styles.projectImg}>
            <div className={styles.img}></div>
          </div>
          <div className={styles.projectDescription}>
            <p className={styles.description}></p>
          </div>
          <div className={styles.usersAndDate}>
            <div className={styles.users}></div>
            <div className={styles.date}>
              <input type="date" name="" id="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
