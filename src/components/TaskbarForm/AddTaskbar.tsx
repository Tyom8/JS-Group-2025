import React from "react";
import { useAddTaskbar } from "../../hooks/AddTaskbar-hook";
import styles from "../../styles/AddTaskbarForm.module.css";
import AddTaskbarForm from "./AddTaskbarForm";

const AddTaskbar: React.FC = () => {
  const {
    addedTaskbars,
    isTaskbarFormShown,
    setIsTaskbarFormShown,
    handleAddTaskbar,
  } = useAddTaskbar();

  return (
    <div className={styles.addTaskbarBtn}>
      <button onClick={() => setIsTaskbarFormShown(true)}>New Taskbar</button>
      {isTaskbarFormShown && (
        <AddTaskbarForm
          sendData={() => handleAddTaskbar}
          setIsClosed={() => setIsTaskbarFormShown((prev) => !prev)}
        />
      )}
    </div>
    // taskbars will be added here
  );
};

export default AddTaskbar;
