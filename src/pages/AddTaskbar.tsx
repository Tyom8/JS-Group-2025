import React from "react";
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
  } = useAddTaskbar();

  return (
    <>
      <div className={styles.addTaskbarBtn}>
        <button onClick={() => setIsTaskbarFormShown(true)}>New Taskbar</button>
        {isTaskbarFormShown && (
          <AddTaskbarForm
            sendData={handleAddTaskbar}
            setIsClosed={() => setIsTaskbarFormShown((prev) => !prev)}
          />
        )}
      </div>
      <div className={styles.taskbars}>
        {addedTaskbars.length === 0 ? (
          <p className={styles.text}>No taskbars added</p>
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
