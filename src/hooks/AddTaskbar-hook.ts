import { useState } from "react";
import { IAddTaskbarForm } from "../types";

export const useAddTaskbar = () => {
  const [addedTaskbars, setAddedTaskbars] = useState<IAddTaskbarForm[]>([]);
  const [isTaskbarFormShown, setIsTaskbarFormShown] = useState<boolean>(false);

  const handleAddTaskbar = (newTaskbar: IAddTaskbarForm) => {
    setAddedTaskbars((prev) => [...prev, newTaskbar]);
  };

  return {
    addedTaskbars,
    isTaskbarFormShown,
    setIsTaskbarFormShown,
    handleAddTaskbar,
  };
};
