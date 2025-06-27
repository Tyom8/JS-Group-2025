import { useCallback, useState } from "react";

export const useUserProfileContent = () => {
  // state to show user profile content
  const [isProfileShown, setIsProfileShown] = useState<boolean>(false);

  // function that toggles the showing process
  const toggle = useCallback(() => {
    setIsProfileShown((prev) => !prev);
  }, []);
  
  return {
    isProfileShown,
    toggle,
  };
};
