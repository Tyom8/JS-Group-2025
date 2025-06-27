import { useCallback, useState } from "react";
import { IAddTaskbarForm } from "../../types";

export const useAddTaskbar = () => {
  // state to show addedTaskbars
  const [addedTaskbars, setAddedTaskbars] = useState<IAddTaskbarForm[]>([]);
  // state to show taskbar form
  const [isTaskbarFormShown, setIsTaskbarFormShown] = useState<boolean>(false);
  // state to show edit mode
  const [isTaskbarEditMode, setIsTaskbaEditMode] = useState<boolean>(true);
  // state to edit taskbar by id
  const [editById, setEditById] = useState<number | null>(null);
  // state to edit input value
  const [editInputValue, setEditInputValue] = useState<string>("");

  // function that handles taskbar adding
  const handleAddTaskbar = useCallback((taskbar: IAddTaskbarForm) => {
    const newTaskbar = {
      ...taskbar,
      id: Date.now(),
    };
    setAddedTaskbars((prev) => [...prev, newTaskbar]);
    setIsTaskbarFormShown(false);
  }, []);

  // function that handles taskbar editing
  const handleEditTaskbar = useCallback(
    (
      id: number,
      newDate: string,
      newTitle: string,
      newDescription: string,
      newCategory: string,
      newMember: string,
      newImage?: string
    ) => {
      setAddedTaskbars((prev: IAddTaskbarForm[]) =>
        prev.map((item: IAddTaskbarForm) =>
          id === item.id
            ? {
                ...item,
                date: newDate,
                title: newTitle,
                description: newDescription,
                category: newCategory,
                member: newMember,
                image: newImage,
              }
            : item
        )
      );

      setIsTaskbaEditMode(false);
      setEditById(null);
    },
    []
  );

  return {
    addedTaskbars,
    isTaskbarFormShown,
    setIsTaskbarFormShown,
    handleAddTaskbar,
    isTaskbarEditMode,
    setIsTaskbaEditMode,
    editById,
    setEditById,
    editInputValue,
    setEditInputValue,
    handleEditTaskbar,
  };
};
