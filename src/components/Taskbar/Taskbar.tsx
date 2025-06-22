import React from "react";
import closeIcon from "../../assets/icons/close.svg";
import styles from "../../styles/Taskbar.module.css";
import { IAddTaskbarForm } from "../../types";
import { useAddTaskbar } from "./Taskbar-hook";

// Props to access IAddTaskbarForm interface properties
interface ITaskbarProps {
  taskbar: IAddTaskbarForm;
}

const Taskbar: React.FC<ITaskbarProps> = ({ taskbar }) => {
  // all needed fields and functions from useAddTaskbar hook
  const { inputRef, isEditMode, setIsEditMode, status, setStatus } = useAddTaskbar(taskbar);

  return (
    <div className={styles.taskbarContainer}>
      <div className={styles.inputContainer}>
        {isEditMode ? (
          <input
            ref={inputRef}
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        ) : (
          <p className={styles.status}>{status}</p>
        )}
        <span onClick={() => setIsEditMode((prev) => !prev)}>+</span>
      </div>
      <div className={styles.project}>
        <div className={styles.content}>
          <div className={styles.closeIcon}>
            <img src={closeIcon} alt="close icon" />
          </div>
          <div className={styles.info}>
            <p className={styles.title}>{taskbar.title}</p>
            <button className={styles.editBtn}>Edit</button>
          </div>
          <div className={styles.projectImg}>
            <div className={styles.img}></div>
          </div>
          <div className={styles.projectDescription}>
            <p className={styles.description}>{taskbar.description}</p>
          </div>
          <div className={styles.usersAndDate}>
            <div className={styles.users}></div>
            <div className={styles.date}>
              <p>{taskbar.date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
