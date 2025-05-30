import { useState } from "react";

export const useUserProfileContent = () => {
  const [isProfileShown, setIsProfileShown] = useState<boolean>(false);

  const toggle = () => {
    setIsProfileShown((prev) => !prev);
  };
  return {
    isProfileShown,
    toggle,
  };
};
