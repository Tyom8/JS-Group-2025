import React from "react";
import { useTranslation } from "react-i18next";
import Taskbar from "../components/Taskbar/Taskbar";
import { useAddTaskbar } from "../components/TaskbarForm/AddTaskbar-hook";
import AddTaskbarForm from "../components/TaskbarForm/AddTaskbarForm";
import styles from "../styles/AddTaskbarForm.module.css";

const AddTaskbar: React.FC = () => {
  // all needed fields and functions from useAddTaskbar hook
  const {
    addedTaskbars,
    isTaskbarFormShown,
    setIsTaskbarFormShown,
    handleAddTaskbar,
    setIsTaskbaEditMode,
    handleEditTaskbar,
    editById,
    isTaskbarEditMode,
    setEditById,
  } = useAddTaskbar();

  const { t } = useTranslation();

  return (
    <>
      <div className={styles.addTaskbarBtn}>
        <button onClick={() => setIsTaskbarFormShown(true)}>
          {t("taskbarPage.newTaskbarBtn")}
        </button>
        {isTaskbarFormShown && (
          <AddTaskbarForm
            sendData={handleAddTaskbar}
            setIsClosed={() => setIsTaskbarFormShown((prev) => !prev)}
            handleEditTaskbar={handleEditTaskbar}
            isTaskbarEditMode={isTaskbarEditMode}
            editById={editById}
            taskbars={addedTaskbars}
          />
        )}
      </div>
      <div className={styles.taskbars}>
        {addedTaskbars.length === 0 ? (
          <p className={styles.text}>{t("taskbarPage.noTaskbarsText")}</p>
        ) : (
          addedTaskbars.map((taskbar) => (
            <Taskbar
              key={taskbar.id}
              taskbar={taskbar}
              setEditById={setEditById}
              setIsTaskbarEditMode={setIsTaskbaEditMode}
              setIsTaskbarFormShown={setIsTaskbarFormShown}
            />
          ))
        )}
      </div>
    </>
  );
};

export default AddTaskbar;
