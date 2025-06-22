import { useCallback, useState } from "react";
import { IAddTaskbarForm } from "../../types";

export const useAddTaskbar = () => {
  // state to show addedTaskbars
  const [addedTaskbars, setAddedTaskbars] = useState<IAddTaskbarForm[]>([]);
  // state to show taskbar form
  const [isTaskbarFormShown, setIsTaskbarFormShown] = useState<boolean>(false);

  // function that handles taskbar adding
  const handleAddTaskbar = useCallback((taskbar: IAddTaskbarForm) => {
    const newTaskbar = {
      ...taskbar,
      id: Date.now()
    };
    setAddedTaskbars((prev) => [...prev, newTaskbar]);
    setIsTaskbarFormShown(false);
  }, []);

  return {
    addedTaskbars,
    isTaskbarFormShown,
    setIsTaskbarFormShown,
    handleAddTaskbar,
  };
};
