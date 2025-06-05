import { useState } from "react";
import { IAddUser } from "../../types";

export const useAddDashboardUsers = () => {
  // state to show user form
  const [isAddUserFormShown, setIsAddUserFormShown] = useState<boolean>(false);
  // state to show added users
  const [addedUsers, setAddedUsers] = useState<IAddUser[]>([]);

  // function that handles user adding
  const handleAddUsers = (data: IAddUser) => {
    const newUser = {
      ...data,
      id: Date.now(),
    };
    setAddedUsers((prev) => [...prev, newUser]);
    setIsAddUserFormShown(false);
  };

  // function that handles user deleting
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
