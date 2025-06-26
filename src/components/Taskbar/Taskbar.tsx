import React from "react";
import closeIcon from "../../assets/icons/close.svg";
import styles from "../../styles/Taskbar.module.css";
import { IAddTaskbarForm } from "../../types";
import { useAddStatus } from "./Taskbar-hook";

// Props to access IAddTaskbarForm interface properties
interface ITaskbarProps {
  taskbar: IAddTaskbarForm;
  setIsTaskbarFormShown: (value: boolean) => void;
  setIsTaskbarEditMode: (value: boolean) => void;
  setEditById: (id: number) => void;
}

const Taskbar: React.FC<ITaskbarProps> = ({
  taskbar,
  setIsTaskbarFormShown,
  setIsTaskbarEditMode,
  setEditById,
}) => {
  // all needed fields and functions from useAddTaskbar hook
  const { inputRef, isInputEditMode, setIsInputEditMode, status, setStatus } =
    useAddStatus(taskbar);

  return (
    <div className={styles.taskbarContainer}>
      <div className={styles.inputContainer}>
        {isInputEditMode ? (
          <input
            ref={inputRef}
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        ) : (
          <p className={styles.status}>{status}</p>
        )}
        <span onClick={() => setIsInputEditMode((prev) => !prev)}>+</span>
      </div>
      <div className={styles.project}>
        <div className={styles.content}>
          <div className={styles.closeIcon}>
            <img src={closeIcon} alt="close icon" />
          </div>
          <div className={styles.info}>
            <p className={styles.title}>{taskbar.title}</p>
            <button
              className={styles.editBtn}
              onClick={() => {
                setIsTaskbarEditMode(true);
                setEditById(taskbar.id);
                setIsTaskbarFormShown(true);
              }}
            >
              Edit
            </button>
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
