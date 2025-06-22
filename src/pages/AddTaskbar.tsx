import React from "react";
import Taskbar from "../components/Taskbar/Taskbar";
import { useAddTaskbar } from "../components/TaskbarForm/AddTaskbar-hook";
import AddTaskbarForm from "../components/TaskbarForm/AddTaskbarForm";
import styles from "../styles/AddTaskbarForm.module.css";
import { useTranslation } from "react-i18next";

const AddTaskbar: React.FC = () => {
  // all needed fields and functions from useAddTaskbar hook
  const {
    addedTaskbars,
    isTaskbarFormShown,
    setIsTaskbarFormShown,
    handleAddTaskbar,
  } = useAddTaskbar();

  const { t } = useTranslation();

  return (
    <>
      <div className={styles.addTaskbarBtn}>
        <button onClick={() => setIsTaskbarFormShown(true)}>{t("taskbarPage.newTaskbarBtn")}</button>
        {isTaskbarFormShown && (
          <AddTaskbarForm
            sendData={handleAddTaskbar}
            setIsClosed={() => setIsTaskbarFormShown((prev) => !prev)}
          />
        )}
      </div>
      <div className={styles.taskbars}>
        {addedTaskbars.length === 0 ? (
          <p className={styles.text}>{t("taskbarPage.noTaskbarsText")}</p>
        ) : (
          addedTaskbars.map((taskbar) => (
            <Taskbar key={taskbar.id} taskbar={taskbar} />
          ))
        )}
      </div>
    </>
  );
};

export default AddTaskbar;
