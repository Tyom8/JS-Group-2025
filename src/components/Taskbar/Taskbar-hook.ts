import { useEffect, useRef, useState } from "react";

// custom hook to add taskbars
export const useAddStatus = (taskbar: any) => {
  // ref to be able to access input element
  const inputRef = useRef<HTMLInputElement>(null);
  // state to add statuses
  const [status, setStatus] = useState(taskbar.status || "");
  // state to edit statuses
  const [isInputEditMode, setIsInputEditMode] = useState<boolean>(true);

  // useEffect hook to make input in focus mode right after adding taskbar
  useEffect(() => {
    if (isInputEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputEditMode]);

  return {
    inputRef,
    status,
    setStatus,
    isInputEditMode,
    setIsInputEditMode,
  };
};
