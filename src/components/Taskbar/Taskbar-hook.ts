import { useEffect, useRef, useState } from "react";

// custom hook to add taskbars
export const useAddTaskbar = (taskbar: any) => {
  // ref to be able to access input element
  const inputRef = useRef<HTMLInputElement>(null);
  // state to add statuses
  const [status, setStatus] = useState(taskbar.status || "");
  // state to edit statuses
  const [isEditMode, setIsEditMode] = useState<boolean>(true);

  // useEffect hook to make input in focus mode right after adding taskbar
  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  return {
    inputRef,
    status,
    setStatus,
    isEditMode,
    setIsEditMode,
  };
};
