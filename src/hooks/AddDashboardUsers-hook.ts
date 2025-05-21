import { useState } from "react";
import { IAddUser } from "../types";

export const useAddDashboardUsers = () => {
  const [isAddUserFormShown, setIsAddUserFormShown] = useState<boolean>(false);
  const [addedUsers, setAddedUsers] = useState<IAddUser[]>([]);

  const handleAddUsers = () => {
    setIsAddUserFormShown(false);
  };

  const handleDeleteUsers = (id: number) => {
    const foundUser = addedUsers.filter((user) => user.id !== id);
    setAddedUsers(foundUser);
  };

  return {
    addedUsers,
    isAddUserFormShown,
    setIsAddUserFormShown,
    handleAddUsers,
    handleDeleteUsers,
  };
};
